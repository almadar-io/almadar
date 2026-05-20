"""
Data Preprocessing - Dataset construction, tokenization, normalization.

Provides operators for preparing data for ML training and inference.
"""
import math
import random
import torch
from typing import Any, Dict, List, Optional, Tuple


def data_dataset(entities: List[Dict], contracts: Dict[str, Any]) -> Dict[str, Any]:
    """
    Create a dataset from entity collection and input/output contracts.

    Args:
        entities: List of entity dicts
        contracts: { "input": InputContract, "output": OutputContract }

    Returns:
        Dataset dict with tensors and metadata
    """
    input_contract = contracts.get("input", {})
    output_contract = contracts.get("output", {})
    input_fields = input_contract.get("fields", {})
    output_fields = output_contract.get("fields", {})

    inputs = []
    targets = []

    for entity in entities:
        inp = _extract_features(entity, input_fields)
        tgt = _extract_features(entity, output_fields)
        inputs.append(inp)
        targets.append(tgt)

    return {
        "inputs": torch.tensor(inputs, dtype=torch.float32) if inputs else torch.zeros(0),
        "targets": torch.tensor(targets, dtype=torch.float32) if targets else torch.zeros(0),
        "size": len(entities),
    }


def data_dataloader(dataset: Dict[str, Any], config: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Create batched data from dataset.

    Config:
        batch-size: int (default 32)
        shuffle: bool (default True)
    """
    batch_size = config.get("batch-size", 32)
    shuffle = config.get("shuffle", True)

    inputs = dataset["inputs"]
    targets = dataset["targets"]
    n = dataset["size"]

    indices = list(range(n))
    if shuffle:
        random.shuffle(indices)

    batches = []
    for i in range(0, n, batch_size):
        batch_idx = indices[i:i + batch_size]
        batches.append({
            "inputs": inputs[batch_idx],
            "targets": targets[batch_idx],
            "size": len(batch_idx),
        })
    return batches


def data_split(dataset: Dict[str, Any], ratios: List[float]) -> List[Dict[str, Any]]:
    """
    Split dataset into train/val/test.

    Args:
        dataset: Dataset dict
        ratios: Split ratios e.g. [0.8, 0.1, 0.1]
    """
    n = dataset["size"]
    indices = list(range(n))
    random.shuffle(indices)

    splits = []
    start = 0
    for ratio in ratios:
        end = start + max(1, int(n * ratio))
        end = min(end, n)
        split_idx = indices[start:end]
        splits.append({
            "inputs": dataset["inputs"][split_idx],
            "targets": dataset["targets"][split_idx],
            "size": len(split_idx),
        })
        start = end
    return splits


def data_normalize(tensor: Any, config: Dict[str, Any]) -> Any:
    """
    Normalize features.

    Config:
        method: "standard" (mean/std) or "minmax" (min/max to [0,1])
        per-dim: bool (default True)
    """
    t = torch.tensor(tensor, dtype=torch.float32) if not isinstance(tensor, torch.Tensor) else tensor
    method = config.get("method", "standard")
    per_dim = config.get("per-dim", True)

    if method == "standard":
        if per_dim and t.dim() > 1:
            mean = t.mean(dim=0, keepdim=True)
            std = t.std(dim=0, keepdim=True).clamp(min=1e-8)
        else:
            mean = t.mean()
            std = t.std().clamp(min=1e-8)
        return (t - mean) / std

    if method == "minmax":
        if per_dim and t.dim() > 1:
            tmin = t.min(dim=0, keepdim=True).values
            tmax = t.max(dim=0, keepdim=True).values
        else:
            tmin = t.min()
            tmax = t.max()
        denom = (tmax - tmin).clamp(min=1e-8)
        return (t - tmin) / denom

    raise ValueError(f"Unknown normalization method: {method}")


def data_augment(dataset: Dict[str, Any], config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Apply simple data augmentation (noise injection, scaling).

    Config:
        noise: float - Gaussian noise std (default 0)
        scale: [min, max] - Random scaling range (default [1, 1])
        copies: int - Number of augmented copies per sample (default 1)
    """
    noise_std = config.get("noise", 0)
    scale_range = config.get("scale", [1.0, 1.0])
    copies = config.get("copies", 1)

    inputs = dataset["inputs"]
    targets = dataset["targets"]

    aug_inputs = [inputs]
    aug_targets = [targets]

    for _ in range(copies):
        aug_in = inputs.clone()
        if noise_std > 0:
            aug_in = aug_in + torch.randn_like(aug_in) * noise_std
        if scale_range != [1.0, 1.0]:
            scale = torch.empty(1).uniform_(scale_range[0], scale_range[1]).item()
            aug_in = aug_in * scale
        aug_inputs.append(aug_in)
        aug_targets.append(targets.clone())

    return {
        "inputs": torch.cat(aug_inputs, dim=0),
        "targets": torch.cat(aug_targets, dim=0),
        "size": dataset["size"] * (1 + copies),
    }


def data_tokenize(text: str, config: Dict[str, Any]) -> Any:
    """
    Tokenize text into integer tensor.

    Config:
        method: "whitespace" | "character" | "bpe" (bpe requires tokenizers library)
        vocab-size: int (default 32000)
        max-length: int (default 512)
    """
    method = config.get("method", "whitespace")
    max_length = config.get("max-length", 512)
    vocab_size = config.get("vocab-size", 32000)

    if method == "whitespace":
        tokens = text.split()
        ids = [hash(t) % vocab_size for t in tokens]
    elif method == "character":
        ids = [ord(c) % vocab_size for c in text]
    elif method == "bpe":
        try:
            from tokenizers import Tokenizer, models, trainers, pre_tokenizers
            tok = Tokenizer(models.BPE())
            tok.pre_tokenizer = pre_tokenizers.Whitespace()
            encoding = tok.encode(text)
            ids = [t % vocab_size for t in encoding.ids]
        except ImportError:
            ids = [hash(t) % vocab_size for t in text.split()]
    else:
        ids = [hash(t) % vocab_size for t in text.split()]

    ids = ids[:max_length]
    return torch.tensor(ids, dtype=torch.long)


def data_pad(sequences: List[Any], config: Dict[str, Any]) -> Any:
    """
    Pad sequences to uniform length.

    Config:
        max-length: int
        pad-value: int (default 0)
    """
    max_length = config.get("max-length", 512)
    pad_value = config.get("pad-value", 0)

    padded = []
    for seq in sequences:
        t = torch.tensor(seq, dtype=torch.long) if not isinstance(seq, torch.Tensor) else seq
        if len(t) >= max_length:
            padded.append(t[:max_length])
        else:
            padding = torch.full((max_length - len(t),), pad_value, dtype=torch.long)
            padded.append(torch.cat([t, padding]))
    return torch.stack(padded)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _extract_features(entity: Dict, field_spec: Dict) -> List[float]:
    """Extract feature values from entity based on field spec."""
    values = []
    for dim_key, spec in sorted(field_spec.items()):
        source = spec.get("source", "")
        if source.startswith("@entity."):
            field = source[8:]
        else:
            field = source
        val = entity.get(field, 0)
        if isinstance(val, (list, tuple)):
            values.extend([float(v) for v in val])
        else:
            values.append(float(val))
    return values
