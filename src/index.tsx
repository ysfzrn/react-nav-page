import React, { useContext, useEffect } from 'react';
import {
  NativeEventEmitter,
  Platform,
  AppRegistry,
  RootTagContext,
} from 'react-native';
import type { Float, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import type {
  appBarTypes,
  pushTypes,
  pushWithRegisterTypes,
  registerTypes,
  rootTypes,
} from './types';

export * from './SharedElementView';
export * from './SharedElementImage';

const ReactNavPageModule = require('./NativeReactNavPage').default;

const moduleEventEmitter = new NativeEventEmitter(
  Platform.OS === 'ios' ? ReactNavPageModule : undefined
);

class ReactNavPage {
  constructor() {}

  push = ({ routeName, params }: pushTypes) => {
    ReactNavPageModule.push(routeName, params);
  };

  pushWithRegister = ({
    routeName,
    params,
    component,
    title,
    navOptions,
  }: pushWithRegisterTypes) => {
    this.registerComponent({
      route: routeName,
      Component: component,
      initialProps: { params },
    });
    ReactNavPageModule.push(routeName, title, navOptions, params);
  };

  pushWithTransition = ({
    routeName,
    params,
    component,
    title,
    navOptions,
  }: pushWithRegisterTypes) => {
    this.registerComponent({
      route: routeName,
      Component: component,
      initialProps: { params },
    });
    ReactNavPageModule.pushWithTransition(routeName, title, navOptions, params);
  };

  registerComponent({
    route,
    Component,
    Provider,
    initialProps,
  }: registerTypes) {
    if (AppRegistry.getAppKeys()?.indexOf(route) === -1) {
      let ComponentWithProps = (p: any) => {
        const props = { ...initialProps, ...p };
        return <Component {...props} />;
      };

      if (Provider) {
        ComponentWithProps = (p: any) => {
          const propsWithProvider = {
            ...initialProps,
            ...p,
          };
          return (
            <Provider>
              <Component {...propsWithProvider} />
            </Provider>
          );
        };
      }

      AppRegistry.registerComponent(route, () => ComponentWithProps);
    }
  }

  pop = () => {
    ReactNavPageModule.pop();
  };

  setRoot = ({
    type,
    routeName = '',
    tabBar = {},
    params = {},
    stacks = [],
    title = '',
    navOptions,
  }: rootTypes) => {
    const stacksObj = {
      tabs: stacks,
    };
    ReactNavPageModule.setRoot(
      type,
      routeName,
      title,
      params,
      navOptions,
      tabBar,
      stacksObj
    );
  };

  changeTab = (index: Int32) => {
    ReactNavPageModule.changeTab(index);
  };

  setNavBarAlpha = (alpha: Float) => {
    ReactNavPageModule.setNavBarAlpha(alpha);
  };

  registerAppBar = ({
    LeftBarComponent,
    TitleBarComponent,
    RightBarComponent,
    Provider,
  }: appBarTypes) => {
    if (LeftBarComponent) {
      this.registerComponent({
        route: 'LeftButtonView',
        Component: LeftBarComponent,
        Provider: Provider,
      });
    }
    if (TitleBarComponent) {
      this.registerComponent({
        route: 'TitleView',
        Component: TitleBarComponent,
        Provider: Provider,
      });
    }
    if (RightBarComponent) {
      this.registerComponent({
        route: 'RightButtonView',
        Component: RightBarComponent,
        Provider: Provider,
      });
    }
  };
}

export const useRouteChange = (callback: Function) => {
  useEffect(() => {
    const subscription = moduleEventEmitter.addListener(
      'onRouteChange',
      (event: any) => {
        callback(event);
      }
    );

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useTabChange = (callback: Function) => {
  useEffect(() => {
    const subscription = moduleEventEmitter.addListener(
      'onTabChange',
      (event: any) => {
        console.log(event);
        callback(event.tabIndex);
      }
    );

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useAppBarPress = (callback: Function) => {
  const rootTag = useContext(RootTagContext);

  useEffect(() => {
    const subscription = moduleEventEmitter.addListener(
      'onAppBarPress',
      (event: any) => {
        console.log('event useAppBarPress', event);
        if (rootTag === event.rootTag) {
          console.log(event);
          callback(event);
        }
      }
    );

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useAppBarRouteChange = (callback: Function) => {
  useEffect(() => {
    const subscription = moduleEventEmitter.addListener(
      'onRouteChange',
      (event: any) => {
        if (Platform.OS === 'android') {
          callback(event);
        }
      }
    );

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default new ReactNavPage();
