import React, { useEffect } from 'react';
import { NativeEventEmitter, Platform, AppRegistry } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import type {
  pushTypes,
  pushWithRegisterTypes,
  registerTypes,
  rootTypes,
} from './types';

const ReactNavPageModule = require('./NativeReactNavPage').default;

const moduleEventEmitter = new NativeEventEmitter(
  Platform.OS === 'ios' ? ReactNavPageModule : undefined
);

class ReactNavPage {
  instance: any;

  constructor() {
    this.instance = {};
  }

  push = ({ routeName, params, callback }: pushTypes) => {
    if (callback) {
      const newInstance = new Date().getTime().toString(36);
      this.instance[newInstance] = {
        callback: callback,
      };
    }
    ReactNavPageModule.push(routeName, params);
  };

  pushWithRegister = ({
    routeName,
    params,
    callback,
    component,
  }: pushWithRegisterTypes) => {
    this.registerComponent({
      route: routeName,
      Component: component,
      initialProps: { params },
    });
    if (callback) {
      const newInstance = new Date().getTime().toString(36);
      this.instance[newInstance] = {
        callback: callback,
      };
    }
    ReactNavPageModule.push(routeName, params);
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
  }: rootTypes) => {
    const stacksObj = {
      tabs: stacks,
    };
    ReactNavPageModule.setRoot(type, routeName, params, stacksObj, tabBar);
  };

  changeTab = (index: Int32) => {
    ReactNavPageModule.changeTab(index);
  };

  setResult(args: any) {
    const currentInstanceKey = this.getCurrentInstanceKey();
    const currentInstance = this.instance[currentInstanceKey];

    if (currentInstance) {
      currentInstance?.callback(args);
    }
  }

  getCurrentInstanceKey = () => {
    const instances = Object.keys(this.instance);
    const currentInstanceKey = instances[instances.length - 1] || '';
    return currentInstanceKey;
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

export default new ReactNavPage();
