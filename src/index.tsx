import { useEffect } from 'react';
import { NativeEventEmitter, Platform } from 'react-native';
import type { UnsafeObject } from 'react-native/Libraries/Types/CodegenTypes';

const ReactNavPageModule = require('./NativeReactNavPage').default;

const moduleEventEmitter = new NativeEventEmitter(
  Platform.OS === 'ios' ? ReactNavPageModule : undefined
);

type pushTypes = {
  routeName: string;
  params: UnsafeObject;
  callback?: Function;
};

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

  setRoot = (routeName: String) => {
    ReactNavPageModule.setRoot(routeName);
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

export const useFocused = (routeName: string, callback: Function) => {
  useEffect(() => {
    const subscription = moduleEventEmitter.addListener(
      'onRouteChange',
      (event: any) => {
        if (routeName === event.routeName) {
          callback({ event });
        }
      }
    );

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

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

export default new ReactNavPage();
