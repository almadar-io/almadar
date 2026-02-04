"""
Tensor Contracts Tests

Tests for tensor/contracts.py - Input/output validation.
"""

import pytest
import torch
from orbital_app.tensor.contracts import InputContract, OutputContract


class TestInputContract:
    """Tests for InputContract validation."""

    def test_input_contract_valid(self):
        """Test valid input passes validation."""
        contract = InputContract(
            shape=[4],
            range=[0.0, 1.0],
            meaning=["x", "y", "z", "w"],
        )

        tensor = torch.tensor([0.5, 0.3, 0.7, 0.1])
        violation = contract.validate(tensor)

        assert violation is None

    def test_input_contract_shape_mismatch(self):
        """Test shape mismatch detection."""
        contract = InputContract(
            shape=[4],
            range=[0.0, 1.0],
            meaning=["x", "y", "z", "w"],
        )

        tensor = torch.tensor([0.5, 0.3, 0.7])  # Wrong shape
        violation = contract.validate(tensor)

        assert violation is not None
        assert violation["type"] == "shape_mismatch"
        assert violation["expected"] == [4]
        assert violation["received"] == [3]

    def test_input_contract_out_of_range(self):
        """Test range violation detection."""
        contract = InputContract(
            shape=[4],
            range=[0.0, 1.0],
            meaning=["x", "y", "z", "w"],
        )

        tensor = torch.tensor([0.5, 1.5, 0.7, -0.5])  # Values out of range
        violation = contract.validate(tensor)

        assert violation is not None
        assert violation["type"] == "out_of_range"
        assert violation["allowed_range"] == [0.0, 1.0]
        assert 1 in violation["out_of_range_indices"]
        assert 3 in violation["out_of_range_indices"]

    def test_input_contract_boundary_values(self):
        """Test boundary values are valid."""
        contract = InputContract(
            shape=[2],
            range=[0.0, 1.0],
            meaning=["a", "b"],
        )

        # Exact boundary values should be valid
        tensor = torch.tensor([0.0, 1.0])
        violation = contract.validate(tensor)

        assert violation is None

    def test_input_contract_2d_shape(self):
        """Test 2D shape validation."""
        contract = InputContract(
            shape=[2, 3],
            range=[-1.0, 1.0],
            meaning=["row1", "row2"],
        )

        tensor = torch.zeros(2, 3)
        violation = contract.validate(tensor)

        assert violation is None


class TestOutputContract:
    """Tests for OutputContract clamping and violation detection."""

    @pytest.fixture
    def output_contract(self):
        """Create a test output contract."""
        return OutputContract(
            shape=[4],
            ranges={
                "0": {"min": -1.0, "max": 1.0, "meaning": "velocity_x"},
                "1": {"min": -1.0, "max": 1.0, "meaning": "velocity_y"},
                "2": {"min": 0.0, "max": 2.0, "meaning": "speed"},
                "3": {"min": 0.0, "max": 1.0, "meaning": "confidence"},
            },
        )

    def test_output_contract_clamp(self, output_contract):
        """Test output clamping to ranges."""
        tensor = torch.tensor([2.0, -2.0, 5.0, 0.5])
        clamped = output_contract.clamp(tensor)

        assert clamped[0].item() == 1.0  # clamped from 2.0
        assert clamped[1].item() == -1.0  # clamped from -2.0
        assert clamped[2].item() == 2.0  # clamped from 5.0
        assert clamped[3].item() == 0.5  # unchanged

    def test_output_contract_clamp_preserves_valid(self, output_contract):
        """Test clamping doesn't change valid values."""
        tensor = torch.tensor([0.5, -0.5, 1.0, 0.8])
        clamped = output_contract.clamp(tensor)

        assert torch.allclose(tensor, clamped)

    def test_output_contract_violations(self, output_contract):
        """Test violation reporting."""
        tensor = torch.tensor([2.0, 0.5, 5.0, 0.5])
        violations = output_contract.get_violations(tensor)

        assert len(violations) == 2

        # Check first violation
        v0 = next(v for v in violations if v["dim"] == 0)
        assert v0["value"] == 2.0
        assert v0["min"] == -1.0
        assert v0["max"] == 1.0
        assert v0["meaning"] == "velocity_x"

        # Check second violation
        v2 = next(v for v in violations if v["dim"] == 2)
        assert v2["value"] == 5.0
        assert v2["meaning"] == "speed"

    def test_output_contract_no_violations(self, output_contract):
        """Test no violations for valid output."""
        tensor = torch.tensor([0.5, -0.5, 1.0, 0.8])
        violations = output_contract.get_violations(tensor)

        assert len(violations) == 0

    def test_output_contract_boundary_violations(self, output_contract):
        """Test that exact boundary values are not violations."""
        tensor = torch.tensor([1.0, -1.0, 2.0, 1.0])
        violations = output_contract.get_violations(tensor)

        assert len(violations) == 0

    def test_output_contract_missing_meaning(self):
        """Test violation with missing meaning field."""
        contract = OutputContract(
            shape=[2],
            ranges={
                "0": {"min": 0.0, "max": 1.0},  # No meaning field
            },
        )

        tensor = torch.tensor([2.0, 0.5])
        violations = contract.get_violations(tensor)

        assert len(violations) == 1
        assert violations[0]["meaning"] == "dim_0"  # Default meaning
