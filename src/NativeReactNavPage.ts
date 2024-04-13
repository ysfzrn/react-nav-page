import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {
  Int32,
  UnsafeObject,
} from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  setRoot(
    type: string,
    routeName: string,
    initialProps: UnsafeObject,
    stacks: UnsafeObject,
    tabBar: UnsafeObject
  ): void;
  changeTab(index: Int32): void;
  push(routeName: string, params?: UnsafeObject): void;
  pop(): void;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNavPage');
