"""
Graph Operations - Build and manipulate PyTorch Geometric style graphs.

Works with or without torch_geometric installed.
When PyG is not available, uses a simple dict-based graph representation:
  { "x": Tensor, "edge_index": Tensor, "edge_attr": Tensor|None, "num_nodes": int }
"""
import torch
from typing import Any, Dict, List, Optional


def _has_pyg() -> bool:
    try:
        import torch_geometric
        return True
    except ImportError:
        return False


def graph_from_entities(config: Dict[str, Any]) -> Dict[str, Any]:
    """
    Build a graph from entity collections.

    Config:
        nodes: str - Entity type name for nodes
        edges: list|str - Edge field or edge list
        node-features: list - Entity field names for node features
        edge-features: list - Edge feature field names (optional)
        directed: bool - Whether graph is directed (default True)

    Returns dict-based graph: { x, edge_index, edge_attr, num_nodes }
    """
    node_features = config.get("node-features", [])
    edges = config.get("edges", [])
    directed = config.get("directed", True)

    if isinstance(node_features, list) and len(node_features) > 0:
        if isinstance(node_features[0], list):
            x = torch.tensor(node_features, dtype=torch.float32)
        else:
            x = torch.tensor([node_features], dtype=torch.float32)
    else:
        x = torch.zeros(1, 1)

    num_nodes = x.size(0)

    if isinstance(edges, list) and len(edges) > 0:
        if isinstance(edges[0], (list, tuple)):
            edge_index = torch.tensor(edges, dtype=torch.long).t().contiguous()
        else:
            edge_index = torch.tensor(edges, dtype=torch.long).view(2, -1)
    else:
        edge_index = torch.zeros(2, 0, dtype=torch.long)

    edge_attr = None
    edge_features = config.get("edge-features")
    if edge_features and isinstance(edge_features, list) and len(edge_features) > 0:
        edge_attr = torch.tensor(edge_features, dtype=torch.float32)

    if not directed and edge_index.size(1) > 0:
        reverse = edge_index.flip(0)
        edge_index = torch.cat([edge_index, reverse], dim=1)
        if edge_attr is not None:
            edge_attr = torch.cat([edge_attr, edge_attr], dim=0)

    return {"x": x, "edge_index": edge_index, "edge_attr": edge_attr, "num_nodes": num_nodes}


def graph_from_adjacency(adjacency: Any, features: Any) -> Dict[str, Any]:
    """Build graph from adjacency matrix and node features."""
    adj = torch.tensor(adjacency, dtype=torch.float32) if not isinstance(adjacency, torch.Tensor) else adjacency
    x = torch.tensor(features, dtype=torch.float32) if not isinstance(features, torch.Tensor) else features
    edge_index = adj.nonzero().t().contiguous()
    return {"x": x, "edge_index": edge_index, "edge_attr": None, "num_nodes": x.size(0)}


def graph_from_edge_list(edges: Any, features: Any) -> Dict[str, Any]:
    """Build graph from edge list [src, dst] pairs and node features."""
    x = torch.tensor(features, dtype=torch.float32) if not isinstance(features, torch.Tensor) else features
    edge_index = torch.tensor(edges, dtype=torch.long).t().contiguous() if not isinstance(edges, torch.Tensor) else edges
    return {"x": x, "edge_index": edge_index, "edge_attr": None, "num_nodes": x.size(0)}


def graph_add_self_loops(graph: Dict[str, Any]) -> Dict[str, Any]:
    """Add self-loop edges."""
    n = graph["num_nodes"]
    self_loops = torch.arange(n, dtype=torch.long).unsqueeze(0).repeat(2, 1)
    edge_index = torch.cat([graph["edge_index"], self_loops], dim=1)
    return {**graph, "edge_index": edge_index}


def graph_to_undirected(graph: Dict[str, Any]) -> Dict[str, Any]:
    """Convert directed graph to undirected by adding reverse edges."""
    ei = graph["edge_index"]
    reverse = ei.flip(0)
    edge_index = torch.cat([ei, reverse], dim=1)
    edge_attr = graph.get("edge_attr")
    if edge_attr is not None:
        edge_attr = torch.cat([edge_attr, edge_attr], dim=0)
    return {**graph, "edge_index": edge_index, "edge_attr": edge_attr}


def graph_subgraph(graph: Dict[str, Any], mask: Any) -> Dict[str, Any]:
    """Extract subgraph by boolean node mask."""
    mask_t = torch.tensor(mask, dtype=torch.bool) if not isinstance(mask, torch.Tensor) else mask
    node_map = torch.full((graph["num_nodes"],), -1, dtype=torch.long)
    new_indices = torch.arange(mask_t.sum().item(), dtype=torch.long)
    node_map[mask_t] = new_indices

    ei = graph["edge_index"]
    src_ok = mask_t[ei[0]]
    dst_ok = mask_t[ei[1]]
    keep = src_ok & dst_ok

    new_ei = node_map[ei[:, keep]]
    new_x = graph["x"][mask_t]
    return {"x": new_x, "edge_index": new_ei, "edge_attr": None, "num_nodes": new_x.size(0)}


def graph_k_hop(graph: Dict[str, Any], node: int, k: int) -> Dict[str, Any]:
    """Extract k-hop neighborhood subgraph around a node."""
    visited = {node}
    frontier = {node}
    for _ in range(k):
        next_frontier = set()
        ei = graph["edge_index"]
        for f in frontier:
            neighbors = ei[1][ei[0] == f].tolist() + ei[0][ei[1] == f].tolist()
            next_frontier.update(neighbors)
        frontier = next_frontier - visited
        visited.update(frontier)

    mask = torch.zeros(graph["num_nodes"], dtype=torch.bool)
    for v in visited:
        mask[v] = True
    return graph_subgraph(graph, mask)


def graph_node_features(graph: Dict[str, Any]) -> Any:
    return graph["x"]


def graph_edge_index(graph: Dict[str, Any]) -> Any:
    return graph["edge_index"]


def graph_edge_features(graph: Dict[str, Any]) -> Any:
    return graph.get("edge_attr")


def graph_num_nodes(graph: Dict[str, Any]) -> int:
    return graph["num_nodes"]


def graph_num_edges(graph: Dict[str, Any]) -> int:
    return graph["edge_index"].size(1)


def graph_degree(graph: Dict[str, Any]) -> Any:
    """Compute node degree tensor."""
    n = graph["num_nodes"]
    deg = torch.zeros(n, dtype=torch.long)
    src = graph["edge_index"][0]
    for s in src:
        deg[s.item()] += 1
    return deg


def graph_batch(graphs: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Batch multiple graphs into one (offset edge indices)."""
    xs, eis, batch_ids = [], [], []
    offset = 0
    for i, g in enumerate(graphs):
        xs.append(g["x"])
        eis.append(g["edge_index"] + offset)
        batch_ids.extend([i] * g["num_nodes"])
        offset += g["num_nodes"]
    return {
        "x": torch.cat(xs, dim=0),
        "edge_index": torch.cat(eis, dim=1),
        "edge_attr": None,
        "num_nodes": offset,
        "batch": torch.tensor(batch_ids, dtype=torch.long),
    }
