import { NavigationGraph } from './NavigationGraph';
import type { Node } from './node';

export class TabNavigationManager {
  tabNavigationGraphs: Map<number, NavigationGraph>; // Her bir tab için bir navigation graph

  constructor() {
    this.tabNavigationGraphs = new Map();
  }

  addTab(tabIndex: number) {
    const navigationGraph = new NavigationGraph();
    this.tabNavigationGraphs.set(tabIndex, navigationGraph);
  }

  addNodeToTab(tabIndex: number, node: Node) {
    const navigationGraph = this.tabNavigationGraphs.get(tabIndex);
    if (navigationGraph) {
      navigationGraph.addNode(node);
    } else {
      console.error(`Tab '${tabIndex}' not found.`);
    }
  }

  getNodeFromTab(tabIndex: number, uniqueID: string): Node | undefined {
    const navigationGraph = this.tabNavigationGraphs.get(tabIndex);
    if (navigationGraph) {
      return navigationGraph.getNodeByID(uniqueID);
    } else {
      console.error(`Tab '${tabIndex}' not found.`);
      return undefined;
    }
  }
}
