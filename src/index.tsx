import type { UnsafeObject } from 'react-native/Libraries/Types/CodegenTypes';

const ReactNavPageModule = require('./NativeReactNavPage').default;

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

export default new ReactNavPage();
