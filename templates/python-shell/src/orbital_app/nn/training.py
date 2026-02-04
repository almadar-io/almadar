"""
Training Loop - Execute train/loop S-expression.

Supports:
- Configurable epochs, learning rate, optimizer
- Gradient clipping (maxGradientNorm)
- Weight clipping (maxWeightMagnitude)
- Forbidden output regions (constraint loss)
"""
import torch
import torch.nn as nn
import torch.optim as optim
from typing import List, Dict, Any, Tuple
from .constraints import (
    apply_gradient_clipping,
    apply_weight_clipping,
    compute_constraint_loss,
)


def train_loop(
    module: nn.Module,
    data: List[Dict[str, Any]],
    config: Dict[str, Any],
) -> Tuple[nn.Module, Dict[str, Any]]:
    """
    Training loop with explicit constraints.

    Args:
        module: PyTorch neural network to train
        data: Training data as list of dicts with 'observation' and 'target'
        config: Training configuration

    Config fields:
        - epochs: int (default 100)
        - learningRate: float (default 0.001)
        - maxGradientNorm: float (optional) - clip gradients to this norm
        - maxWeightMagnitude: float (optional) - clip weights to [-max, max]
        - forbiddenOutputRegions: List[Dict] (optional) - constraint regions

    Returns:
        Tuple of (trained module, training history)
    """
    epochs = config.get("epochs", 100)
    lr = config.get("learningRate", 0.001)
    max_grad_norm = config.get("maxGradientNorm")
    max_weight_mag = config.get("maxWeightMagnitude")
    forbidden = config.get("forbiddenOutputRegions", [])

    optimizer = optim.Adam(module.parameters(), lr=lr)
    criterion = nn.MSELoss()

    history = {"losses": [], "constraint_violations": []}

    module.train()

    for epoch in range(epochs):
        total_loss = 0.0
        violations = 0

        for sample in data:
            optimizer.zero_grad()

            # Prepare tensors
            input_tensor = torch.tensor(sample["observation"], dtype=torch.float32)
            target = torch.tensor(sample["target"], dtype=torch.float32)

            # Forward pass
            output = module(input_tensor)

            # Base loss
            loss = criterion(output, target)

            # Add constraint loss if forbidden regions defined
            if forbidden:
                constraint_loss = compute_constraint_loss(output, forbidden)
                loss = loss + constraint_loss
                if constraint_loss > 0:
                    violations += 1

            # Backward pass
            loss.backward()

            # Gradient clipping
            if max_grad_norm:
                apply_gradient_clipping(module, max_grad_norm)

            # Update weights
            optimizer.step()

            # Weight clipping
            if max_weight_mag:
                apply_weight_clipping(module, max_weight_mag)

            total_loss += loss.item()

        avg_loss = total_loss / len(data) if data else 0
        history["losses"].append(avg_loss)
        history["constraint_violations"].append(violations)

    return module, history
