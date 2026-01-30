"""
Neural Network Training Tests

Tests for nn/training.py - Training loop with constraints.
"""

import pytest
import torch
import torch.nn as nn
from orbital_app.nn.training import train_loop
from orbital_app.nn.builder import build_network


class TestTrainLoop:
    """Tests for training loop function."""

    @pytest.fixture
    def simple_network(self):
        """Create a simple test network."""
        return build_network([
            "nn/sequential",
            ["nn/linear", 4, 8],
            ["nn/relu"],
            ["nn/linear", 8, 2],
        ])

    @pytest.fixture
    def training_data(self):
        """Create simple training data."""
        return [
            {"observation": [1.0, 0.0, 0.0, 0.0], "target": [1.0, 0.0]},
            {"observation": [0.0, 1.0, 0.0, 0.0], "target": [0.0, 1.0]},
            {"observation": [0.0, 0.0, 1.0, 0.0], "target": [1.0, 0.0]},
            {"observation": [0.0, 0.0, 0.0, 1.0], "target": [0.0, 1.0]},
        ]

    def test_train_loop_basic(self, simple_network, training_data):
        """Test basic training with MSE loss."""
        config = {"epochs": 10, "learningRate": 0.01}

        trained_model, history = train_loop(simple_network, training_data, config)

        assert isinstance(trained_model, nn.Module)
        assert "losses" in history
        assert len(history["losses"]) == 10

    def test_train_loop_loss_decreases(self, simple_network, training_data):
        """Test that loss generally decreases during training."""
        config = {"epochs": 50, "learningRate": 0.01}

        _, history = train_loop(simple_network, training_data, config)

        # First loss should be higher than last loss (training should improve)
        assert history["losses"][0] > history["losses"][-1]

    def test_train_loop_with_gradient_clipping(self, simple_network, training_data):
        """Test training with maxGradientNorm enforcement."""
        config = {
            "epochs": 10,
            "learningRate": 0.01,
            "maxGradientNorm": 1.0,
        }

        trained_model, history = train_loop(simple_network, training_data, config)

        assert isinstance(trained_model, nn.Module)
        assert len(history["losses"]) == 10

    def test_train_loop_with_weight_clipping(self, simple_network, training_data):
        """Test training with maxWeightMagnitude enforcement."""
        config = {
            "epochs": 10,
            "learningRate": 0.01,
            "maxWeightMagnitude": 0.5,
        }

        trained_model, history = train_loop(simple_network, training_data, config)

        # Check all weights are within bounds
        for param in trained_model.parameters():
            assert param.abs().max().item() <= 0.5 + 1e-6  # Small tolerance

    def test_train_loop_with_forbidden_regions(self, simple_network, training_data):
        """Test training with constraint loss applied."""
        config = {
            "epochs": 10,
            "learningRate": 0.01,
            "forbiddenOutputRegions": [
                {"dim": 0, "min": -0.1, "max": 0.1, "reason": "dead zone"},
            ],
        }

        trained_model, history = train_loop(simple_network, training_data, config)

        assert "constraint_violations" in history
        assert len(history["constraint_violations"]) == 10

    def test_train_history(self, simple_network, training_data):
        """Test that history tracking works correctly."""
        config = {"epochs": 5, "learningRate": 0.01}

        _, history = train_loop(simple_network, training_data, config)

        assert "losses" in history
        assert "constraint_violations" in history
        assert len(history["losses"]) == 5
        assert len(history["constraint_violations"]) == 5

        # All losses should be positive
        assert all(loss >= 0 for loss in history["losses"])

    def test_train_loop_default_config(self, simple_network, training_data):
        """Test training with default configuration."""
        config = {}

        trained_model, history = train_loop(simple_network, training_data, config)

        # Should use default epochs=100
        assert len(history["losses"]) == 100

    def test_train_loop_empty_data(self, simple_network):
        """Test training with empty data."""
        config = {"epochs": 5}

        trained_model, history = train_loop(simple_network, [], config)

        # Should complete without error
        assert len(history["losses"]) == 5
        # All losses should be 0 (no data to compute loss)
        assert all(loss == 0 for loss in history["losses"])
