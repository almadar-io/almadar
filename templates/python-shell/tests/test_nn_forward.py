"""
Neural Network Forward Pass Tests

Tests for nn/forward.py - Neural network inference.
"""

import pytest
import torch
import torch.nn as nn
from orbital_app.nn.forward import forward
from orbital_app.nn.builder import build_network


class TestForward:
    """Tests for forward pass function."""

    @pytest.fixture
    def simple_network(self):
        """Create a simple test network."""
        return build_network([
            "nn/sequential",
            ["nn/linear", 4, 8],
            ["nn/relu"],
            ["nn/linear", 8, 2],
        ])

    def test_forward_pass(self, simple_network):
        """Test basic inference through network."""
        input_tensor = torch.randn(4)
        output = forward(simple_network, input_tensor)

        assert isinstance(output, torch.Tensor)
        assert output.shape == (2,)

    def test_forward_with_tensor_input(self, simple_network):
        """Test forward pass with torch.Tensor input."""
        input_tensor = torch.tensor([1.0, 2.0, 3.0, 4.0])
        output = forward(simple_network, input_tensor)

        assert isinstance(output, torch.Tensor)
        assert output.shape == (2,)

    def test_forward_with_list_input(self, simple_network):
        """Test forward pass with Python list input."""
        input_list = [1.0, 2.0, 3.0, 4.0]
        output = forward(simple_network, input_list)

        assert isinstance(output, torch.Tensor)
        assert output.shape == (2,)

    def test_forward_eval_mode(self, simple_network):
        """Test that network is in eval mode during forward."""
        # Add dropout to test eval mode
        network_with_dropout = build_network([
            "nn/sequential",
            ["nn/linear", 4, 8],
            ["nn/dropout", 0.5],
            ["nn/linear", 8, 2],
        ])

        input_tensor = torch.randn(4)

        # In eval mode, dropout should be disabled
        # Running twice should give identical results
        output1 = forward(network_with_dropout, input_tensor)
        output2 = forward(network_with_dropout, input_tensor)

        assert torch.allclose(output1, output2)

    def test_forward_no_grad(self, simple_network):
        """Test that no gradients are tracked during inference."""
        input_tensor = torch.randn(4, requires_grad=True)
        output = forward(simple_network, input_tensor)

        # Output should not require grad
        assert not output.requires_grad

    def test_forward_deterministic(self, simple_network):
        """Test that forward pass is deterministic."""
        input_tensor = torch.tensor([1.0, 2.0, 3.0, 4.0])

        output1 = forward(simple_network, input_tensor)
        output2 = forward(simple_network, input_tensor)

        assert torch.allclose(output1, output2)

    def test_forward_batched_input(self):
        """Test forward pass with batched input."""
        network = build_network([
            "nn/sequential",
            ["nn/linear", 4, 2],
        ])

        # Batch of 3 samples
        batch_input = torch.randn(3, 4)
        output = forward(network, batch_input)

        assert output.shape == (3, 2)
