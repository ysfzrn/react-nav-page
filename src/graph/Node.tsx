export class Node {
  uniqueID: string;
  routeName: string;
  callback: Function;
  neighbors: Node[];

  constructor(uniqueID: string, routeName: string, callback: Function) {
    this.uniqueID = uniqueID;
    this.routeName = routeName;
    this.callback = callback;
    this.neighbors = [];
  }
}
