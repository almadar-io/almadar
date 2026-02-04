"""
Forward Pass - Execute neural network inference.

Used by server-side effects when a trait needs to run nn/forward.
"""
import torch
import torch.nn as nn
from typing import Union, List


def forward(
    module: nn.Module, input_data: Union[torch.Tensor, List[float]]
) -> torch.Tensor:
    """
    Execute forward pass (inference mode).

    Args:
        module: PyTorch neural network module
        input_data: Input tensor or list of floats

    Returns:
        Output tensor from the network
    """
    module.eval()

    # Convert to tensor if needed
    if not isinstance(input_data, torch.Tensor):
        input_tensor = torch.tensor(input_data, dtype=torch.float32)
    else:
        input_tensor = input_data

    # Run inference without gradient tracking
    with torch.no_grad():
        return module(input_tensor)
