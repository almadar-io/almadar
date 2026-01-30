"""
Tensor Operations - tensor/* S-expression implementations.

All 28 tensor operators from orbital-shared/std/modules/tensor.ts.
"""
import torch
from typing import List, Dict, Any


# =============================================================================
# Creation
# =============================================================================


def tensor_from(data: List[float]) -> torch.Tensor:
    """Create tensor from array."""
    return torch.tensor(data, dtype=torch.float32)


def tensor_zeros(shape: List[int]) -> torch.Tensor:
    """Create tensor of zeros."""
    return torch.zeros(shape, dtype=torch.float32)


def tensor_ones(shape: List[int]) -> torch.Tensor:
    """Create tensor of ones."""
    return torch.ones(shape, dtype=torch.float32)


def tensor_rand(shape: List[int]) -> torch.Tensor:
    """Create tensor with random values [0, 1)."""
    return torch.rand(shape)


def tensor_randn(shape: List[int]) -> torch.Tensor:
    """Create tensor with random normal values."""
    return torch.randn(shape)


# =============================================================================
# Shape/Indexing
# =============================================================================


def tensor_shape(tensor: torch.Tensor) -> List[int]:
    """Get tensor shape."""
    return list(tensor.shape)


def tensor_get(tensor: torch.Tensor, index: int) -> float:
    """Get element at index."""
    return tensor[index].item()


def tensor_slice(tensor: torch.Tensor, start: int, end: int) -> torch.Tensor:
    """Get slice of tensor."""
    return tensor[start:end]


def tensor_reshape(tensor: torch.Tensor, shape: List[int]) -> torch.Tensor:
    """Reshape tensor."""
    return tensor.reshape(shape)


def tensor_flatten(tensor: torch.Tensor) -> torch.Tensor:
    """Flatten tensor to 1D."""
    return tensor.flatten()


# =============================================================================
# Math
# =============================================================================


def tensor_add(a: torch.Tensor, b: torch.Tensor) -> torch.Tensor:
    """Element-wise addition."""
    return a + b


def tensor_sub(a: torch.Tensor, b: torch.Tensor) -> torch.Tensor:
    """Element-wise subtraction."""
    return a - b


def tensor_mul(a: torch.Tensor, b: torch.Tensor) -> torch.Tensor:
    """Element-wise multiplication."""
    return a * b


def tensor_div(a: torch.Tensor, b: torch.Tensor) -> torch.Tensor:
    """Element-wise division."""
    return a / b


def tensor_matmul(a: torch.Tensor, b: torch.Tensor) -> torch.Tensor:
    """Matrix multiplication."""
    return torch.matmul(a, b)


def tensor_dot(a: torch.Tensor, b: torch.Tensor) -> float:
    """Dot product."""
    return torch.dot(a.flatten(), b.flatten()).item()


# =============================================================================
# Reductions
# =============================================================================


def tensor_sum(tensor: torch.Tensor) -> float:
    """Sum all elements."""
    return tensor.sum().item()


def tensor_mean(tensor: torch.Tensor) -> float:
    """Mean of all elements."""
    return tensor.mean().item()


def tensor_max(tensor: torch.Tensor) -> float:
    """Max element."""
    return tensor.max().item()


def tensor_min(tensor: torch.Tensor) -> float:
    """Min element."""
    return tensor.min().item()


def tensor_argmax(tensor: torch.Tensor) -> int:
    """Index of max element."""
    return tensor.argmax().item()


def tensor_norm(tensor: torch.Tensor) -> float:
    """L2 norm."""
    return tensor.norm().item()


# =============================================================================
# Range Validation
# =============================================================================


def tensor_all_in_range(tensor: torch.Tensor, range_: List[float]) -> bool:
    """Check all elements in range [min, max]."""
    min_val, max_val = range_
    return bool((tensor >= min_val).all() and (tensor <= max_val).all())


def tensor_clamp(tensor: torch.Tensor, min_val: float, max_val: float) -> torch.Tensor:
    """Clamp all elements to [min, max]."""
    return tensor.clamp(min_val, max_val)


def tensor_clamp_per_dim(
    tensor: torch.Tensor,
    ranges: Dict[str, Dict[str, float]],
) -> torch.Tensor:
    """Clamp each dimension to its specified range."""
    result = tensor.clone()
    for dim_str, bounds in ranges.items():
        dim = int(dim_str)
        result[dim] = result[dim].clamp(bounds["min"], bounds["max"])
    return result


def tensor_out_of_range_dims(
    tensor: torch.Tensor,
    ranges: Dict[str, Dict[str, float]],
) -> List[Dict[str, Any]]:
    """Get dimensions that exceed ranges."""
    violations = []
    for dim_str, bounds in ranges.items():
        dim = int(dim_str)
        value = tensor[dim].item()
        if value < bounds["min"] or value > bounds["max"]:
            violations.append(
                {
                    "dim": dim,
                    "value": value,
                    "min": bounds["min"],
                    "max": bounds["max"],
                }
            )
    return violations


# =============================================================================
# Conversion
# =============================================================================


def tensor_to_list(tensor: torch.Tensor) -> List[float]:
    """Convert tensor to Python list."""
    return tensor.tolist()
