const ReactNavPage = require('./NativeReactNavPage').default;

export function multiply(a: number, b: number): number {
  return ReactNavPage.multiply(a, b);
}

export function push(routeName: String): void {
  return ReactNavPage.push(routeName);
}

export function pop(): void {
  return ReactNavPage.pop();
}
