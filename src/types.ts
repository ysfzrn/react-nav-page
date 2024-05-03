import type { FC } from 'react';
import type {
  Float,
  UnsafeObject,
} from 'react-native/Libraries/Types/CodegenTypes';

export type navOptions = {
  headerShow?: boolean;
  headerTransparent?: boolean;
  headerBackgroundColor?: string;
  hederNavBarAlpha?: Float;
  sharedElements?: UnsafeObject;
};

export type pushTypes = {
  routeName: string;
  title: string;
  params: UnsafeObject;
  navOptions?: navOptions;
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

export type appBarTypes = {
  LeftBarComponent?: FC;
  TitleBarComponent?: FC;
  RightBarComponent?: FC;
  Provider?: React.FC<{ children: React.ReactNode }>;
};

export type tabTypes = {
  tabBarComponentName?: string;
  tabBarHeight?: Float;
};

export type rootTypes = {
  type: string;
  routeName?: string;
  title?: string;
  params?: UnsafeObject;
  navOptions?: navOptions;
  tabBar?: tabTypes;
  stacks?: pushTypes[];
};
