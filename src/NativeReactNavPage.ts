import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setRoot(routeName: string): void;
  push(routeName: string): void;
  pop(): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('ReactNavPage');
