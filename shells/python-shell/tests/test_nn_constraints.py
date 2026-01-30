"""
Neural Network Constraints Tests

Tests for nn/constraints.py - Safety constraint enforcement.
"""

import pytest
import torch
import torch.nn as nn
from orbital_app.nn.constraints import (
    apply_gradient_clipping,
    apply_weight_clipping,
    check_forbidden_regions,
    compute_constraint_loss,
)
from orbital_app.nn.builder import build_network


class TestGradientClipping:
    """Tests for gradient clipping."""

    def test_gradient_clipping(self):
        """Test that gradients are clipped to max norm."""
        network = build_network([
            "nn/sequential",
            ["nn/linear", 4, 4],
        ])

        # Create some gradients
        input_tensor = torch.randn(4)
        output = network(input_tensor)
        loss = output.sum()
        loss.backward()

        # Apply gradient clipping
        apply_gradient_clipping(network, max_norm=1.0)

        # Check gradient norm
        total_norm = 0.0
        for param in network.parameters():
            if param.grad is not None:
                total_norm += param.grad.norm().item() ** 2
        total_norm = total_norm ** 0.5

        assert total_norm <= 1.0 + 1e-6

    def test_gradient_clipping_preserves_direction(self):
        """Test that gradient clipping preserves gradient direction."""
        network = nn.Linear(4, 4)

        input_tensor = torch.randn(4)
        output = network(input_tensor)
        loss = output.sum()
        loss.backward()

        # Save original gradient direction
        original_grad = network.weight.grad.clone()
        original_direction = original_grad / original_grad.norm()

        # Apply gradient clipping
        apply_gradient_clipping(network, max_norm=0.1)

        # Check direction is preserved
        clipped_direction = network.weight.grad / network.weight.grad.norm()
        assert torch.allclose(original_direction, clipped_direction, atol=1e-5)


class TestWeightClipping:
    """Tests for weight clipping."""

    def test_weight_clipping(self):
        """Test that weights are clamped to range."""
        network = build_network([
            "nn/sequential",
            ["nn/linear", 4, 4],
        ])

        # Set some weights outside range
        with torch.no_grad():
            for param in network.parameters():
                param.fill_(2.0)

        # Apply weight clipping
        apply_weight_clipping(network, max_magnitude=0.5)

        # Check all weights are within bounds
        for param in network.parameters():
            assert param.abs().max().item() <= 0.5 + 1e-6

    def test_weight_clipping_symmetric(self):
        """Test that weight clipping is symmetric around zero."""
        network = nn.Linear(4, 4)

        with torch.no_grad():
            network.weight.fill_(-2.0)

        apply_weight_clipping(network, max_magnitude=0.5)

        assert network.weight.min().item() >= -0.5 - 1e-6
        assert network.weight.max().item() <= 0.5 + 1e-6


class TestForbiddenRegions:
    """Tests for forbidden region checking."""

    def test_check_forbidden_regions_violation(self):
        """Test detection of forbidden region violation."""
        output = torch.tensor([0.5, 0.05, 0.8])  # dim 1 is in forbidden region
        forbidden = [
            {"dim": 1, "min": 0.0, "max": 0.1, "reason": "dead zone"},
        ]

        violations = check_forbidden_regions(output, forbidden)

        assert len(violations) == 1
        assert violations[0]["dim"] == 1
        assert abs(violations[0]["value"] - 0.05) < 1e-5
        assert violations[0]["reason"] == "dead zone"

    def test_check_forbidden_regions_no_violation(self):
        """Test no violation when output is outside forbidden regions."""
        output = torch.tensor([0.5, 0.5, 0.8])
        forbidden = [
            {"dim": 1, "min": 0.0, "max": 0.1, "reason": "dead zone"},
        ]

        violations = check_forbidden_regions(output, forbidden)

        assert len(violations) == 0

    def test_check_forbidden_regions_multiple(self):
        """Test checking multiple forbidden regions."""
        output = torch.tensor([0.05, 0.05, 0.95])
        forbidden = [
            {"dim": 0, "min": 0.0, "max": 0.1, "reason": "zone 1"},
            {"dim": 1, "min": 0.0, "max": 0.1, "reason": "zone 2"},
            {"dim": 2, "min": 0.9, "max": 1.0, "reason": "zone 3"},
        ]

        violations = check_forbidden_regions(output, forbidden)

        assert len(violations) == 3


class TestConstraintLoss:
    """Tests for constraint loss computation."""

    def test_compute_constraint_loss_violation(self):
        """Test penalty loss for forbidden region violation."""
        output = torch.tensor([0.5, 0.05, 0.8])
        forbidden = [
            {"dim": 1, "min": 0.0, "max": 0.1},
        ]

        loss = compute_constraint_loss(output, forbidden)

        assert loss.item() > 0

    def test_compute_constraint_loss_no_violation(self):
        """Test zero loss when no violation."""
        output = torch.tensor([0.5, 0.5, 0.8])
        forbidden = [
            {"dim": 1, "min": 0.0, "max": 0.1},
        ]

        loss = compute_constraint_loss(output, forbidden)

        assert loss.item() == 0.0

    def test_compute_constraint_loss_penalty_scaling(self):
        """Test that penalty scales the loss."""
        output = torch.tensor([0.05])
        forbidden = [{"dim": 0, "min": 0.0, "max": 0.1}]

        loss_default = compute_constraint_loss(output, forbidden, penalty=10.0)
        loss_scaled = compute_constraint_loss(output, forbidden, penalty=20.0)

        # Scaled loss should be approximately 2x
        assert abs(loss_scaled.item() / loss_default.item() - 2.0) < 0.1

    def test_compute_constraint_loss_empty_forbidden(self):
        """Test zero loss when no forbidden regions defined."""
        output = torch.tensor([0.5, 0.5])

        loss = compute_constraint_loss(output, [])

        assert loss.item() == 0.0
