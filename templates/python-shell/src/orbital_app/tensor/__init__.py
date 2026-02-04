"""
Tensor Operations - PyTorch implementations for tensor/* operators.

All 28 tensor operators from orbital-shared/std/modules/tensor.ts.
"""
from .ops import *
from .contracts import InputContract, OutputContract

__all__ = [
    # Creation
    "tensor_from",
    "tensor_zeros",
    "tensor_ones",
    "tensor_rand",
    "tensor_randn",
    # Shape/Indexing
    "tensor_shape",
    "tensor_get",
    "tensor_slice",
    "tensor_reshape",
    "tensor_flatten",
    # Math
    "tensor_add",
    "tensor_sub",
    "tensor_mul",
    "tensor_div",
    "tensor_matmul",
    "tensor_dot",
    # Reductions
    "tensor_sum",
    "tensor_mean",
    "tensor_max",
    "tensor_min",
    "tensor_argmax",
    "tensor_norm",
    # Range Validation
    "tensor_all_in_range",
    "tensor_clamp",
    "tensor_clamp_per_dim",
    "tensor_out_of_range_dims",
    # Conversion
    "tensor_to_list",
    # Contracts
    "InputContract",
    "OutputContract",
]
