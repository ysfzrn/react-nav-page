import type { Graph, Node } from '../types';

export function addNode(graph: Graph, node: Node) {
  graph.push(node);
}

export function popLastNeighborOfLastNode(
  graph: Graph,
  currentTab: number
): Node | undefined {
  const lastNode = graph[currentTab];
  if (lastNode) {
    const lastNeighbor = lastNode.neighbors.pop();
    return lastNeighbor;
  }
  return undefined;
}

export function findLastNeighbor(graph: Graph, currentTab: number) {
  const node = graph[currentTab];
  // Düğümün komşularını kontrol ediyoruz
  const neighbors = node!.neighbors;

  // Eğer düğümün komşuları yoksa veya boşsa, null döndürüyoruz
  if (!neighbors || neighbors.length === 0) {
    return null;
  }

  // Komşular içindeki son komşuyu buluyoruz
  const lastNeighbor = neighbors[neighbors.length - 1];

  // Son komşuyu döndürüyoruz
  return lastNeighbor;
}

export function getNodeByID(graph: Graph, uniqueID: string): Node | undefined {
  return graph.find((node) => node.uniqueID === uniqueID);
}
