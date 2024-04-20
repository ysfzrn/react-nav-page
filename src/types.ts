import type {
  Float,
  UnsafeObject,
} from 'react-native/Libraries/Types/CodegenTypes';

export type pushTypes = {
  routeName: string;
  params: UnsafeObject;
  callback?: Function;
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
