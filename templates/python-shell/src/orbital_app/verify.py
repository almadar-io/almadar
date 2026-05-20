"""
ML Verification Endpoints - Introspection API for ml-verify.

Provides /__verify/* endpoints that expose model state, training status,
and constraint satisfaction for automated verification.

The compiler generates an import of this module when the schema has ML effects.
"""
import json
import torch
import torch.nn as nn
from fastapi import APIRouter
from fastapi.responses import HTMLResponse
from typing import Any, Dict, List, Optional

router = APIRouter(prefix="/__verify", tags=["verification"])


# ---------------------------------------------------------------------------
# Shared State (populated by generated trait code)
# ---------------------------------------------------------------------------

class VerifyState:
    """Mutable state populated by ML effects during execution."""
    model: Optional[nn.Module] = None
    architecture_spec: Optional[Any] = None
    last_output: Optional[torch.Tensor] = None
    training_status: Dict[str, Any] = {
        "initial_loss": None,
        "final_loss": None,
        "grad_norm": None,
        "weights_changed": False,
        "epochs_completed": 0,
    }
    constraint_config: Dict[str, Any] = {}


verify_state = VerifyState()


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.get("/model-info")
async def model_info():
    """Return model metadata: parameter count, architecture spec, device."""
    if verify_state.model is None:
        return {"error": "No model loaded", "param_count": 0}

    model = verify_state.model
    param_count = sum(p.numel() for p in model.parameters())
    device = str(next(model.parameters()).device) if param_count > 0 else "cpu"

    return {
        "param_count": param_count,
        "architecture": verify_state.architecture_spec,
        "device": device,
        "trainable_params": sum(p.numel() for p in model.parameters() if p.requires_grad),
    }


@router.get("/last-output")
async def last_output():
    """Return metadata about the last forward pass output."""
    if verify_state.last_output is None:
        return {"error": "No forward pass executed yet"}

    tensor = verify_state.last_output
    return {
        "shape": list(tensor.shape),
        "dtype": str(tensor.dtype),
        "finite": torch.isfinite(tensor).all().item(),
        "values": tensor.detach().tolist(),
        "min": tensor.min().item(),
        "max": tensor.max().item(),
    }


@router.get("/training-status")
async def training_status():
    """Return training progress: loss, gradients, weight changes."""
    return verify_state.training_status


@router.get("/constraints")
async def constraints():
    """Return constraint satisfaction status."""
    result = {}
    config = verify_state.constraint_config
    model = verify_state.model

    if not model:
        return {"error": "No model loaded"}

    # Gradient norm
    max_grad = config.get("max-gradient-norm")
    if max_grad is not None:
        total_norm = 0.0
        for p in model.parameters():
            if p.grad is not None:
                total_norm += p.grad.data.norm(2).item() ** 2
        total_norm = total_norm ** 0.5
        result["gradient_norm"] = {
            "max_allowed": max_grad,
            "actual": round(total_norm, 6),
            "satisfied": total_norm <= max_grad + 1e-6,
        }

    # Weight magnitude
    max_weight = config.get("max-weight-magnitude")
    if max_weight is not None:
        max_w = max(p.abs().max().item() for p in model.parameters())
        result["weight_magnitude"] = {
            "max_allowed": max_weight,
            "actual": round(max_w, 6),
            "satisfied": max_w <= max_weight + 1e-6,
        }

    # Forbidden regions
    forbidden = config.get("forbidden-regions", [])
    if forbidden and verify_state.last_output is not None:
        output = verify_state.last_output
        violations = []
        for region in forbidden:
            dim = region.get("dim", 0)
            lo = region.get("min", float("-inf"))
            hi = region.get("max", float("inf"))
            if output.dim() > 0 and dim < output.shape[-1]:
                val = output[..., dim].item() if output.dim() == 1 else output[0, dim].item()
                violated = lo <= val <= hi
                violations.append({
                    "dim": dim,
                    "range": [lo, hi],
                    "value": round(val, 6),
                    "violated": violated,
                    "reason": region.get("reason", ""),
                })
        result["forbidden_regions"] = violations

    return result
