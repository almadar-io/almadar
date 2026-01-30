"""
Constraint Enforcement - Explicit safety guarantees.

Implements constraint checking and enforcement for neural networks:
- Gradient clipping: Prevent exploding gradients
- Weight clipping: Keep weights bounded
- Forbidden regions: Penalize outputs in dangerous ranges
"""
import torch
import torch.nn as nn
from typing import Dict, Any, List


def apply_gradient_clipping(module: nn.Module, max_norm: float) -> None:
    """
    Clip gradients to max norm.

    Args:
        module: PyTorch module with gradients
        max_norm: Maximum gradient norm
    """
    torch.nn.utils.clip_grad_norm_(module.parameters(), max_norm)


def apply_weight_clipping(module: nn.Module, max_magnitude: float) -> None:
    """
    Clamp weights to [-max, max].

    Args:
        module: PyTorch module
        max_magnitude: Maximum absolute weight value
    """
    with torch.no_grad():
        for param in module.parameters():
            param.clamp_(-max_magnitude, max_magnitude)


def check_forbidden_regions(
    output: torch.Tensor,
    forbidden: List[Dict[str, Any]],
) -> List[Dict[str, Any]]:
    """
    Check if output violates forbidden regions.

    Args:
        output: Network output tensor
        forbidden: List of forbidden region specs with 'dim', 'min', 'max'

    Returns:
        List of violations with dim, value, and reason
    """
    violations = []
    for region in forbidden:
        dim = region["dim"]
        min_val = region["min"]
        max_val = region["max"]
        value = output[dim].item()

        if min_val <= value <= max_val:
            violations.append(
                {
                    "dim": dim,
                    "value": value,
                    "min": min_val,
                    "max": max_val,
                    "reason": region.get("reason", "forbidden region"),
                }
            )

    return violations


def compute_constraint_loss(
    output: torch.Tensor,
    forbidden: List[Dict[str, Any]],
    penalty: float = 10.0,
) -> torch.Tensor:
    """
    Compute penalty loss for forbidden regions.

    Args:
        output: Network output tensor
        forbidden: List of forbidden region specs
        penalty: Penalty multiplier

    Returns:
        Scalar loss tensor
    """
    loss = torch.tensor(0.0)

    for region in forbidden:
        dim = region["dim"]
        min_val = region["min"]
        max_val = region["max"]
        value = output[dim]

        # Penalty for being in forbidden region
        if min_val <= value.item() <= max_val:
            # Distance to nearest boundary
            dist_to_min = (value - min_val).abs()
            dist_to_max = (max_val - value).abs()
            loss = loss + penalty * torch.min(dist_to_min, dist_to_max)

    return loss
