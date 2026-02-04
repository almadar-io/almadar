"""
Tensor Operations Tests

Tests for tensor/ops.py - All 28 tensor operators.
"""

import pytest
import torch
from orbital_app.tensor.ops import (
    # Creation
    tensor_from,
    tensor_zeros,
    tensor_ones,
    tensor_rand,
    tensor_randn,
    # Shape/Indexing
    tensor_shape,
    tensor_get,
    tensor_slice,
    tensor_reshape,
    tensor_flatten,
    # Math
    tensor_add,
    tensor_sub,
    tensor_mul,
    tensor_div,
    tensor_matmul,
    tensor_dot,
    # Reductions
    tensor_sum,
    tensor_mean,
    tensor_max,
    tensor_min,
    tensor_argmax,
    tensor_norm,
    # Range
    tensor_all_in_range,
    tensor_clamp,
    tensor_clamp_per_dim,
    tensor_out_of_range_dims,
    # Conversion
    tensor_to_list,
)


class TestTensorCreation:
    """Tests for tensor creation operations."""

    def test_tensor_from(self):
        """Test creating tensor from list."""
        t = tensor_from([1.0, 2.0, 3.0])
        assert t.shape == (3,)
        assert t.dtype == torch.float32
        assert torch.allclose(t, torch.tensor([1.0, 2.0, 3.0]))

    def test_tensor_zeros(self):
        """Test creating tensor of zeros."""
        t = tensor_zeros([3, 4])
        assert t.shape == (3, 4)
        assert t.sum().item() == 0.0

    def test_tensor_ones(self):
        """Test creating tensor of ones."""
        t = tensor_ones([2, 3])
        assert t.shape == (2, 3)
        assert t.sum().item() == 6.0

    def test_tensor_rand(self):
        """Test creating random tensor [0, 1)."""
        t = tensor_rand([10])
        assert t.shape == (10,)
        assert t.min().item() >= 0.0
        assert t.max().item() < 1.0

    def test_tensor_randn(self):
        """Test creating random normal tensor."""
        t = tensor_randn([100])
        assert t.shape == (100,)
        # Mean should be approximately 0 for normal distribution
        assert abs(t.mean().item()) < 0.5


class TestTensorShapeIndexing:
    """Tests for shape and indexing operations."""

    def test_tensor_shape(self):
        """Test getting tensor shape."""
        t = tensor_zeros([2, 3, 4])
        shape = tensor_shape(t)
        assert shape == [2, 3, 4]

    def test_tensor_get(self):
        """Test getting element at index."""
        t = tensor_from([1.0, 2.0, 3.0])
        assert tensor_get(t, 0) == 1.0
        assert tensor_get(t, 1) == 2.0
        assert tensor_get(t, 2) == 3.0

    def test_tensor_slice(self):
        """Test slicing tensor."""
        t = tensor_from([1.0, 2.0, 3.0, 4.0, 5.0])
        sliced = tensor_slice(t, 1, 4)
        assert sliced.shape == (3,)
        assert torch.allclose(sliced, torch.tensor([2.0, 3.0, 4.0]))

    def test_tensor_reshape(self):
        """Test reshaping tensor."""
        t = tensor_zeros([6])
        reshaped = tensor_reshape(t, [2, 3])
        assert reshaped.shape == (2, 3)

    def test_tensor_flatten(self):
        """Test flattening tensor."""
        t = tensor_zeros([2, 3, 4])
        flat = tensor_flatten(t)
        assert flat.shape == (24,)


class TestTensorMath:
    """Tests for math operations."""

    def test_tensor_add(self):
        """Test element-wise addition."""
        a = tensor_from([1.0, 2.0, 3.0])
        b = tensor_from([4.0, 5.0, 6.0])
        result = tensor_add(a, b)
        assert torch.allclose(result, torch.tensor([5.0, 7.0, 9.0]))

    def test_tensor_sub(self):
        """Test element-wise subtraction."""
        a = tensor_from([5.0, 5.0, 5.0])
        b = tensor_from([1.0, 2.0, 3.0])
        result = tensor_sub(a, b)
        assert torch.allclose(result, torch.tensor([4.0, 3.0, 2.0]))

    def test_tensor_mul(self):
        """Test element-wise multiplication."""
        a = tensor_from([2.0, 3.0, 4.0])
        b = tensor_from([2.0, 2.0, 2.0])
        result = tensor_mul(a, b)
        assert torch.allclose(result, torch.tensor([4.0, 6.0, 8.0]))

    def test_tensor_div(self):
        """Test element-wise division."""
        a = tensor_from([4.0, 6.0, 8.0])
        b = tensor_from([2.0, 2.0, 2.0])
        result = tensor_div(a, b)
        assert torch.allclose(result, torch.tensor([2.0, 3.0, 4.0]))

    def test_tensor_matmul(self):
        """Test matrix multiplication."""
        a = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
        b = torch.tensor([[5.0, 6.0], [7.0, 8.0]])
        result = tensor_matmul(a, b)
        expected = torch.tensor([[19.0, 22.0], [43.0, 50.0]])
        assert torch.allclose(result, expected)

    def test_tensor_dot(self):
        """Test dot product."""
        a = tensor_from([1.0, 2.0, 3.0])
        b = tensor_from([4.0, 5.0, 6.0])
        result = tensor_dot(a, b)
        assert result == 32.0  # 1*4 + 2*5 + 3*6


class TestTensorReductions:
    """Tests for reduction operations."""

    def test_tensor_sum(self):
        """Test sum of all elements."""
        t = tensor_from([1.0, 2.0, 3.0, 4.0])
        assert tensor_sum(t) == 10.0

    def test_tensor_mean(self):
        """Test mean of all elements."""
        t = tensor_from([1.0, 2.0, 3.0, 4.0])
        assert tensor_mean(t) == 2.5

    def test_tensor_max(self):
        """Test max element."""
        t = tensor_from([1.0, 5.0, 3.0, 2.0])
        assert tensor_max(t) == 5.0

    def test_tensor_min(self):
        """Test min element."""
        t = tensor_from([1.0, 5.0, 3.0, 2.0])
        assert tensor_min(t) == 1.0

    def test_tensor_argmax(self):
        """Test index of max element."""
        t = tensor_from([1.0, 5.0, 3.0, 2.0])
        assert tensor_argmax(t) == 1

    def test_tensor_norm(self):
        """Test L2 norm."""
        t = tensor_from([3.0, 4.0])
        assert tensor_norm(t) == 5.0  # sqrt(9 + 16)


class TestTensorRangeValidation:
    """Tests for range validation operations."""

    def test_tensor_all_in_range_true(self):
        """Test all elements in range."""
        t = tensor_from([0.5, 0.6, 0.7])
        assert tensor_all_in_range(t, [0.0, 1.0]) is True

    def test_tensor_all_in_range_false(self):
        """Test not all elements in range."""
        t = tensor_from([0.5, 1.5, 0.7])
        assert tensor_all_in_range(t, [0.0, 1.0]) is False

    def test_tensor_clamp(self):
        """Test clamping all elements."""
        t = tensor_from([-1.0, 0.5, 2.0])
        result = tensor_clamp(t, 0.0, 1.0)
        assert torch.allclose(result, torch.tensor([0.0, 0.5, 1.0]))

    def test_tensor_clamp_per_dim(self):
        """Test per-dimension clamping."""
        t = tensor_from([2.0, -1.0, 0.5])
        ranges = {
            "0": {"min": 0.0, "max": 1.0},
            "1": {"min": 0.0, "max": 1.0},
        }
        result = tensor_clamp_per_dim(t, ranges)
        assert result[0].item() == 1.0  # clamped from 2.0
        assert result[1].item() == 0.0  # clamped from -1.0
        assert result[2].item() == 0.5  # unchanged

    def test_tensor_out_of_range_dims(self):
        """Test detecting out of range dimensions."""
        t = tensor_from([2.0, 0.5, -1.0])
        ranges = {
            "0": {"min": 0.0, "max": 1.0},
            "1": {"min": 0.0, "max": 1.0},
            "2": {"min": 0.0, "max": 1.0},
        }
        violations = tensor_out_of_range_dims(t, ranges)
        assert len(violations) == 2
        assert violations[0]["dim"] == 0
        assert violations[0]["value"] == 2.0
        assert violations[1]["dim"] == 2
        assert violations[1]["value"] == -1.0


class TestTensorConversion:
    """Tests for conversion operations."""

    def test_tensor_to_list(self):
        """Test converting tensor to Python list."""
        t = tensor_from([1.0, 2.0, 3.0])
        result = tensor_to_list(t)
        assert result == [1.0, 2.0, 3.0]

    def test_tensor_to_list_2d(self):
        """Test converting 2D tensor to nested list."""
        t = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
        result = tensor_to_list(t)
        assert result == [[1.0, 2.0], [3.0, 4.0]]
