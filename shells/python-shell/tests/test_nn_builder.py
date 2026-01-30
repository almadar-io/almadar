"""
Neural Network Builder Tests

Tests for nn/builder.py - S-expr to PyTorch conversion.
"""

import pytest
import torch.nn as nn
from orbital_app.nn.builder import build_network, build_layer


class TestBuildNetwork:
    """Tests for build_network function."""

    def test_build_sequential_network(self):
        """Test building nn.Sequential from S-expr."""
        arch = ["nn/sequential", ["nn/linear", 16, 64], ["nn/relu"], ["nn/linear", 64, 4]]
        network = build_network(arch)

        assert isinstance(network, nn.Sequential)
        assert len(network) == 3

    def test_build_complex_network(self):
        """Test building a more complex network."""
        arch = [
            "nn/sequential",
            ["nn/linear", 8, 32],
            ["nn/relu"],
            ["nn/dropout", 0.5],
            ["nn/linear", 32, 16],
            ["nn/tanh"],
            ["nn/linear", 16, 4],
        ]
        network = build_network(arch)

        assert isinstance(network, nn.Sequential)
        assert len(network) == 6

    def test_empty_architecture_raises(self):
        """Test that empty architecture raises ValueError."""
        with pytest.raises(ValueError, match="Empty architecture"):
            build_network([])

    def test_unknown_architecture_raises(self):
        """Test that unknown architecture type raises ValueError."""
        with pytest.raises(ValueError, match="Unknown architecture type"):
            build_network(["nn/unknown", ["nn/linear", 4, 4]])


class TestBuildLayer:
    """Tests for build_layer function."""

    def test_build_linear_layer(self):
        """Test building nn.Linear with correct dimensions."""
        layer = build_layer(["nn/linear", 16, 64])

        assert isinstance(layer, nn.Linear)
        assert layer.in_features == 16
        assert layer.out_features == 64

    def test_build_relu(self):
        """Test building ReLU activation."""
        layer = build_layer(["nn/relu"])
        assert isinstance(layer, nn.ReLU)

    def test_build_tanh(self):
        """Test building Tanh activation."""
        layer = build_layer(["nn/tanh"])
        assert isinstance(layer, nn.Tanh)

    def test_build_sigmoid(self):
        """Test building Sigmoid activation."""
        layer = build_layer(["nn/sigmoid"])
        assert isinstance(layer, nn.Sigmoid)

    def test_build_softmax(self):
        """Test building Softmax activation."""
        layer = build_layer(["nn/softmax"])
        assert isinstance(layer, nn.Softmax)

    def test_build_softmax_with_dim(self):
        """Test building Softmax with custom dimension."""
        layer = build_layer(["nn/softmax", 0])
        assert isinstance(layer, nn.Softmax)
        assert layer.dim == 0

    def test_build_dropout(self):
        """Test building Dropout with default rate."""
        layer = build_layer(["nn/dropout"])
        assert isinstance(layer, nn.Dropout)
        assert layer.p == 0.5

    def test_build_dropout_with_rate(self):
        """Test building Dropout with custom rate."""
        layer = build_layer(["nn/dropout", 0.3])
        assert isinstance(layer, nn.Dropout)
        assert layer.p == 0.3

    def test_build_batchnorm(self):
        """Test building BatchNorm1d."""
        layer = build_layer(["nn/batchnorm", 64])
        assert isinstance(layer, nn.BatchNorm1d)
        assert layer.num_features == 64

    def test_build_layernorm(self):
        """Test building LayerNorm."""
        layer = build_layer(["nn/layernorm", 64])
        assert isinstance(layer, nn.LayerNorm)

    def test_unknown_layer_raises(self):
        """Test that unknown layer type raises ValueError."""
        with pytest.raises(ValueError, match="Unknown layer type"):
            build_layer(["nn/unknown"])
