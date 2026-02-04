"""
Tensor Contracts - Validate inputs and outputs against specifications.

Per Orbital_Trait_Machines.md, contracts ensure:
- Input shape and range validation
- Output clamping to safe ranges
- Violation reporting for debugging
"""
import torch
from typing import Dict, Any, List, Optional
from dataclasses import dataclass


@dataclass
class InputContract:
    """
    Input contract specification.

    Validates that input tensors match expected shape and range.
    """

    shape: List[int]
    range: List[float]  # [min, max]
    meaning: List[str]  # Human-readable meaning for each dimension

    def validate(self, tensor: torch.Tensor) -> Optional[Dict[str, Any]]:
        """
        Validate input against contract.

        Args:
            tensor: Input tensor to validate

        Returns:
            Violation dict if invalid, None if valid
        """
        # Check shape
        if list(tensor.shape) != self.shape:
            return {
                "type": "shape_mismatch",
                "expected": self.shape,
                "received": list(tensor.shape),
            }

        # Check range
        min_val, max_val = self.range
        if not ((tensor >= min_val).all() and (tensor <= max_val).all()):
            out_of_range = [
                i
                for i, val in enumerate(tensor.tolist())
                if val < min_val or val > max_val
            ]
            return {
                "type": "out_of_range",
                "allowed_range": self.range,
                "out_of_range_indices": out_of_range,
            }

        return None


@dataclass
class OutputContract:
    """
    Output contract specification.

    Clamps outputs to safe ranges and reports violations.
    """

    shape: List[int]
    ranges: Dict[str, Dict[str, Any]]  # Per-dimension ranges with meaning

    def clamp(self, tensor: torch.Tensor) -> torch.Tensor:
        """
        Clamp output to contract ranges.

        Args:
            tensor: Output tensor to clamp

        Returns:
            Clamped tensor
        """
        result = tensor.clone()
        for dim_str, bounds in self.ranges.items():
            dim = int(dim_str)
            result[dim] = result[dim].clamp(bounds["min"], bounds["max"])
        return result

    def get_violations(self, tensor: torch.Tensor) -> List[Dict[str, Any]]:
        """
        Get dimensions that violate contract.

        Args:
            tensor: Output tensor to check

        Returns:
            List of violations with dim, value, bounds, and meaning
        """
        violations = []
        for dim_str, bounds in self.ranges.items():
            dim = int(dim_str)
            value = tensor[dim].item()
            if value < bounds["min"] or value > bounds["max"]:
                violations.append(
                    {
                        "dim": dim,
                        "value": value,
                        "min": bounds["min"],
                        "max": bounds["max"],
                        "meaning": bounds.get("meaning", f"dim_{dim}"),
                    }
                )
        return violations
