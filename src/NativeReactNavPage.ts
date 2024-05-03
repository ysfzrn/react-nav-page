import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';
import type {
  Float,
  Int32,
  UnsafeObject,
} from 'react-native/Libraries/Types/CodegenTypes';

export interface Spec extends TurboModule {
  setRoot(
    type: string,
    routeName: string,
    title: string,
    initialProps: UnsafeObject,
    navOptions: UnsafeObject,
    tabBar: UnsafeObject,
    stacks: UnsafeObject
  ): void;
  changeTab(index: Int32): void;
  push(
    routeName: string,
    title: string,
    navOptions: UnsafeObject,
    params?: UnsafeObject
  ): void;
  pushWithTransition(
    routeName: string,
    title: string,
    navOptions: UnsafeObject,
    params?: UnsafeObject
  ): void;
  pop(): void;
  addListener(eventName: string): void;
  removeListeners(count: number): void;
  setNavBarAlpha(alpha: Float): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNavPage');
