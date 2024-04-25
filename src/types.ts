import type { FC } from 'react';
import type {
  Float,
  UnsafeObject,
} from 'react-native/Libraries/Types/CodegenTypes';

export type Node = {
  uniqueID: string;
  routeName: string;
  callback?: Function;
  neighbors: Node[];
};

export type Graph = Node[];

export type pushTypes = {
  routeName: string;
  params: UnsafeObject;
  callback?: Function;
};

export type pushWithRegisterTypes = pushTypes & {
  component: FC;
};

export type registerTypes = {
  route: string;
  Component: FC;
  Provider?: React.FC<{ children: React.ReactNode }>;
  initialProps?: any;
};

export type tabTypes = {
  tabBarComponentName?: string;
  tabBarHeight?: Float;
};

export type rootTypes = {
  type: string;
  routeName?: string;
  tabBar?: tabTypes;
  params?: UnsafeObject;
  stacks?: UnsafeObject;
};
