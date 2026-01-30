"""
Neural Network Runtime - PyTorch implementations for nn/* operators.

- builder: S-expr architecture → PyTorch Module
- forward: nn/forward inference
- training: train/loop training
- constraints: Weight/gradient constraints
"""
from .builder import build_network, build_layer
from .forward import forward
from .training import train_loop
from .constraints import (
    apply_gradient_clipping,
    apply_weight_clipping,
    check_forbidden_regions,
    compute_constraint_loss,
)

__all__ = [
    "build_network",
    "build_layer",
    "forward",
    "train_loop",
    "apply_gradient_clipping",
    "apply_weight_clipping",
    "check_forbidden_regions",
    "compute_constraint_loss",
]
