import { useEffect } from 'react';
import { NativeEventEmitter, Platform } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import type { pushTypes, rootTypes } from './types';

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
