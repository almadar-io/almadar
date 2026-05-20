"""
Training Loop - Extended training with multiple optimizers, schedulers, losses.

Supports:
- Optimizers: adam, adamw, sgd, rmsprop, adagrad, adadelta
- Schedulers: step, exponential, cosine-annealing, reduce-on-plateau, one-cycle, linear-warmup
- Loss functions: mse, mae, huber, cross-entropy, binary-cross-entropy, nll, focal
- Gradient clipping (max-gradient-norm)
- Weight clipping (max-weight-magnitude)
- Forbidden output regions (constraint loss)
- Early stopping (patience, min-delta, monitor)
- Validation split
- Checkpoint save/load
- Epoch callbacks (on_epoch)
"""
import math
import os
import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from typing import List, Dict, Any, Tuple, Optional, Callable
from .constraints import (
    apply_gradient_clipping,
    apply_weight_clipping,
    compute_constraint_loss,
)


# ---------------------------------------------------------------------------
# Loss Functions
# ---------------------------------------------------------------------------

def build_loss(loss_name: str) -> nn.Module:
    """Build loss function from name."""
    losses = {
        "mse": nn.MSELoss,
        "mae": nn.L1Loss,
        "huber": nn.HuberLoss,
        "cross-entropy": nn.CrossEntropyLoss,
        "binary-cross-entropy": nn.BCEWithLogitsLoss,
        "nll": nn.NLLLoss,
    }
    cls = losses.get(loss_name)
    if cls:
        return cls()

    if loss_name == "focal":
        return FocalLoss()

    raise ValueError(f"Unknown loss function: {loss_name}. Available: {list(losses.keys()) + ['focal']}")


class FocalLoss(nn.Module):
    """Focal loss for imbalanced classification (Lin et al. 2017)."""
    def __init__(self, alpha: float = 1.0, gamma: float = 2.0):
        super().__init__()
        self.alpha = alpha
        self.gamma = gamma

    def forward(self, inputs, targets):
        ce_loss = F.cross_entropy(inputs, targets, reduction='none')
        pt = torch.exp(-ce_loss)
        return (self.alpha * (1 - pt) ** self.gamma * ce_loss).mean()


# ---------------------------------------------------------------------------
# Optimizers
# ---------------------------------------------------------------------------

def build_optimizer(module: nn.Module, config: Any) -> optim.Optimizer:
    """Build optimizer from config dict or string."""
    if isinstance(config, str):
        config = {"type": "adam", "lr": 0.001}
    if not isinstance(config, dict):
        config = {"type": "adam", "lr": 0.001}

    opt_type = config.get("type", "adam")
    lr = config.get("lr", 0.001)
    weight_decay = config.get("weight-decay", 0)

    if opt_type == "adam":
        betas = tuple(config.get("betas", [0.9, 0.999]))
        return optim.Adam(module.parameters(), lr=lr, betas=betas, weight_decay=weight_decay)
    if opt_type == "adamw":
        betas = tuple(config.get("betas", [0.9, 0.999]))
        return optim.AdamW(module.parameters(), lr=lr, betas=betas, weight_decay=weight_decay)
    if opt_type == "sgd":
        momentum = config.get("momentum", 0)
        return optim.SGD(module.parameters(), lr=lr, momentum=momentum, weight_decay=weight_decay)
    if opt_type == "rmsprop":
        return optim.RMSprop(module.parameters(), lr=lr, weight_decay=weight_decay)
    if opt_type == "adagrad":
        return optim.Adagrad(module.parameters(), lr=lr, weight_decay=weight_decay)
    if opt_type == "adadelta":
        return optim.Adadelta(module.parameters(), lr=lr, weight_decay=weight_decay)

    raise ValueError(f"Unknown optimizer: {opt_type}. Available: adam, adamw, sgd, rmsprop, adagrad, adadelta")


# ---------------------------------------------------------------------------
# Schedulers
# ---------------------------------------------------------------------------

def build_scheduler(optimizer: optim.Optimizer, config: Optional[Dict[str, Any]]) -> Optional[Any]:
    """Build learning rate scheduler from config."""
    if not config:
        return None

    sched_type = config.get("type", "step")

    if sched_type == "step":
        return optim.lr_scheduler.StepLR(optimizer, step_size=config.get("step-size", 30), gamma=config.get("gamma", 0.1))
    if sched_type == "exponential":
        return optim.lr_scheduler.ExponentialLR(optimizer, gamma=config.get("gamma", 0.95))
    if sched_type == "cosine-annealing":
        return optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=config.get("T-max", 100), eta_min=config.get("eta-min", 0))
    if sched_type == "reduce-on-plateau":
        return optim.lr_scheduler.ReduceLROnPlateau(optimizer, patience=config.get("patience", 10), factor=config.get("factor", 0.1))
    if sched_type == "one-cycle":
        return optim.lr_scheduler.OneCycleLR(optimizer, max_lr=config.get("max-lr", 0.01), total_steps=config.get("total-steps", 1000))
    if sched_type == "linear-warmup":
        warmup_steps = config.get("warmup-steps", 100)
        total_steps = config.get("total-steps", 1000)
        def lr_lambda(step):
            if step < warmup_steps:
                return float(step) / float(max(1, warmup_steps))
            return max(0.0, float(total_steps - step) / float(max(1, total_steps - warmup_steps)))
        return optim.lr_scheduler.LambdaLR(optimizer, lr_lambda)

    raise ValueError(f"Unknown scheduler: {sched_type}")


# ---------------------------------------------------------------------------
# Early Stopping
# ---------------------------------------------------------------------------

class EarlyStopping:
    """Stop training when monitored metric stops improving."""
    def __init__(self, patience: int = 10, min_delta: float = 1e-4, monitor: str = "val_loss"):
        self.patience = patience
        self.min_delta = min_delta
        self.monitor = monitor
        self.best = float("inf")
        self.counter = 0
        self.should_stop = False

    def step(self, metrics: Dict[str, float]):
        current = metrics.get(self.monitor, metrics.get("loss", float("inf")))
        if current < self.best - self.min_delta:
            self.best = current
            self.counter = 0
        else:
            self.counter += 1
            if self.counter >= self.patience:
                self.should_stop = True


# ---------------------------------------------------------------------------
# Checkpoint
# ---------------------------------------------------------------------------

def save_checkpoint(module: nn.Module, path: str, metadata: Optional[Dict] = None):
    """Save model weights to file."""
    state = {"model_state_dict": module.state_dict()}
    if metadata:
        state["metadata"] = metadata
    os.makedirs(os.path.dirname(path) if os.path.dirname(path) else ".", exist_ok=True)
    torch.save(state, path)


def load_checkpoint(module: nn.Module, path: str) -> Dict[str, Any]:
    """Load model weights from file."""
    state = torch.load(path, map_location="cpu", weights_only=True)
    module.load_state_dict(state["model_state_dict"])
    return state.get("metadata", {})


# ---------------------------------------------------------------------------
# Data Preparation
# ---------------------------------------------------------------------------

def _prepare_data(data: Any) -> List[Tuple[torch.Tensor, torch.Tensor]]:
    """Convert various data formats to list of (input, target) tensor pairs."""
    if isinstance(data, list) and len(data) > 0:
        first = data[0]
        if isinstance(first, dict):
            pairs = []
            for item in data:
                obs = item.get("observation", item.get("input", []))
                tgt = item.get("target", item.get("label", []))
                inp = torch.tensor(obs, dtype=torch.float32) if not isinstance(obs, torch.Tensor) else obs.float()
                tar = torch.tensor(tgt, dtype=torch.float32) if not isinstance(tgt, torch.Tensor) else tgt.float()
                pairs.append((inp, tar))
            return pairs
        if isinstance(first, (list, tuple)) and len(first) == 2:
            return [(torch.tensor(a, dtype=torch.float32) if not isinstance(a, torch.Tensor) else a.float(),
                     torch.tensor(b, dtype=torch.float32) if not isinstance(b, torch.Tensor) else b.float())
                    for a, b in data]

    if isinstance(data, torch.Tensor):
        return [(data, data)]

    raise ValueError(f"Cannot parse training data format: {type(data)}")


def _split_data(data: list, val_ratio: float) -> Tuple[list, list]:
    """Split data into train and validation sets."""
    split_idx = max(1, int(len(data) * (1 - val_ratio)))
    return data[:split_idx], data[split_idx:]


# ---------------------------------------------------------------------------
# Training Loop
# ---------------------------------------------------------------------------

def train_loop(
    module: nn.Module,
    data: Any,
    config: Dict[str, Any],
    on_epoch: Optional[Callable] = None,
) -> Tuple[nn.Module, Dict[str, Any]]:
    """
    Training loop with full configuration support.

    Config fields:
        - epochs: int (default 100)
        - optimizer: dict with type, lr, weight-decay, etc. (default: adam 0.001)
        - loss: str (default "mse")
        - scheduler: dict with type and params (optional)
        - batch-size: int (optional, trains sample-by-sample if not set)
        - validation-split: float (optional, 0-1)
        - constraints:
            - max-gradient-norm: float (optional)
            - max-weight-magnitude: float (optional)
            - forbidden-regions: list (optional)
        - early-stopping:
            - patience: int
            - min-delta: float
            - monitor: str
        - checkpoint:
            - save-best: bool
            - save-every: int
            - path: str

        Legacy fields (backward compat):
        - learningRate: float
        - maxGradientNorm: float
        - maxWeightMagnitude: float
        - forbiddenOutputRegions: list
        - clipGrad: float
        - clipWeights: float
        - forbiddenOutputs: list

    Returns:
        Tuple of (trained module, result dict with finalLoss, history, etc.)
    """
    epochs = config.get("epochs", 100)

    # Build optimizer
    opt_config = config.get("optimizer", {"type": "adam", "lr": config.get("learningRate", 0.001)})
    if isinstance(opt_config, str):
        opt_config = {"type": opt_config, "lr": config.get("learningRate", 0.001)}
    optimizer = build_optimizer(module, opt_config)

    # Build loss
    loss_name = config.get("loss", "mse")
    criterion = build_loss(loss_name)

    # Build scheduler
    scheduler = build_scheduler(optimizer, config.get("scheduler"))

    # Constraints (new + legacy)
    constraints = config.get("constraints", {})
    max_grad_norm = constraints.get("max-gradient-norm", config.get("maxGradientNorm", config.get("clipGrad")))
    max_weight_mag = constraints.get("max-weight-magnitude", config.get("maxWeightMagnitude", config.get("clipWeights")))
    forbidden = constraints.get("forbidden-regions", config.get("forbiddenOutputRegions", config.get("forbiddenOutputs", [])))

    # Early stopping
    early_stop_config = config.get("early-stopping")
    if early_stop_config:
        early_stopping = EarlyStopping(
            patience=early_stop_config.get("patience", 10),
            min_delta=early_stop_config.get("min-delta", early_stop_config.get("min_delta", 1e-4)),
            monitor=early_stop_config.get("monitor", "val_loss"),
        )
    else:
        early_stopping = None

    # Checkpoint
    ckpt_config = config.get("checkpoint", {})
    ckpt_path = ckpt_config.get("path", "checkpoints/model.pt")
    save_best = ckpt_config.get("save-best", False)
    save_every = ckpt_config.get("save-every", 0)
    best_loss = float("inf")

    # Prepare data
    prepared = _prepare_data(data)
    val_ratio = config.get("validation-split", 0)
    train_data, val_data = _split_data(prepared, val_ratio) if val_ratio > 0 else (prepared, [])

    history = {"losses": [], "val_losses": [], "constraint_violations": [], "lr": []}
    initial_loss = None

    module.train()

    for epoch in range(epochs):
        total_loss = 0.0
        violations = 0

        for input_tensor, target in train_data:
            optimizer.zero_grad()
            output = module(input_tensor)
            loss = criterion(output, target)

            if forbidden:
                constraint_loss = compute_constraint_loss(output, forbidden)
                loss = loss + constraint_loss
                if constraint_loss.item() > 0:
                    violations += 1

            loss.backward()

            if max_grad_norm:
                apply_gradient_clipping(module, max_grad_norm)

            optimizer.step()

            if max_weight_mag:
                apply_weight_clipping(module, max_weight_mag)

            total_loss += loss.item()

        avg_loss = total_loss / max(len(train_data), 1)
        if initial_loss is None:
            initial_loss = avg_loss

        # Validation
        val_loss = 0.0
        if val_data:
            module.eval()
            with torch.no_grad():
                for inp, tgt in val_data:
                    out = module(inp)
                    val_loss += criterion(out, tgt).item()
            val_loss /= max(len(val_data), 1)
            module.train()

        current_lr = optimizer.param_groups[0]["lr"]
        history["losses"].append(avg_loss)
        history["val_losses"].append(val_loss)
        history["constraint_violations"].append(violations)
        history["lr"].append(current_lr)

        # Scheduler step
        if scheduler:
            if isinstance(scheduler, optim.lr_scheduler.ReduceLROnPlateau):
                scheduler.step(val_loss if val_data else avg_loss)
            else:
                scheduler.step()

        # Epoch callback
        epoch_info = {"epoch": epoch + 1, "loss": avg_loss, "val_loss": val_loss, "lr": current_lr, "violations": violations}
        if on_epoch:
            on_epoch(epoch_info)

        # Checkpoint
        if save_best and avg_loss < best_loss:
            best_loss = avg_loss
            save_checkpoint(module, ckpt_path, {"epoch": epoch + 1, "loss": avg_loss})
        if save_every > 0 and (epoch + 1) % save_every == 0:
            save_checkpoint(module, f"{ckpt_path}.epoch{epoch+1}", {"epoch": epoch + 1, "loss": avg_loss})

        # Early stopping
        if early_stopping:
            early_stopping.step({"loss": avg_loss, "val_loss": val_loss})
            if early_stopping.should_stop:
                break

    result = {
        "finalLoss": history["losses"][-1] if history["losses"] else 0,
        "initialLoss": initial_loss,
        "epochsCompleted": len(history["losses"]),
        "history": history,
        "weightsChanged": True,
    }
    return module, result
