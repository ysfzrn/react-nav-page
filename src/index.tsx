import React, { useEffect } from 'react';
import { NativeEventEmitter, Platform, AppRegistry } from 'react-native';
import type { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import type {
  Graph,
  Node,
  pushTypes,
  pushWithRegisterTypes,
  registerTypes,
  rootTypes,
} from './types';
import {
  addNode,
  findLastNeighbor,
  getNodeByID,
  popLastNeighborOfLastNode,
} from './graph/NavigationGraph';

const ReactNavPageModule = require('./NativeReactNavPage').default;

const moduleEventEmitter = new NativeEventEmitter(
  Platform.OS === 'ios' ? ReactNavPageModule : undefined
);

const getUniqueID = () => {
  return new Date().getTime().toString(36);
};

class ReactNavPage {
  callbacks: [];
  navigationGraph: Graph;
  currentNavigationType: string;
  currentTab: Int32;
  currentRoute: string;
  currentRouteID: string;

  constructor() {
    this.callbacks = [];
    this.navigationGraph = [];
    this.currentNavigationType = 'STACK';
    this.currentTab = 0;
    this.currentRoute = '';
    this.currentRouteID = '';
    moduleEventEmitter.addListener('onRouteChange', (event: any) => {
      console.log('navigationGraph', JSON.stringify(this.navigationGraph));
      console.log('this.callbacks', this.callbacks);
      this.currentRoute = event.routeName;
    });
    moduleEventEmitter.addListener('onTabChange', (event: any) => {
      this.currentTab = event.tabIndex;
    });
  }

  push = ({ routeName, params, callback }: pushTypes) => {
    const currentNode = getNodeByID(this.navigationGraph, `${this.currentTab}`);
    const uniqueID = getUniqueID();
    const neighbor: Node = {
      uniqueID: uniqueID,
      routeName: routeName,
      callback: callback,
      neighbors: [],
    };

    if (callback) {
      this.callbacks.push({
        uniqueID: uniqueID,
        callback: callback,
      });
    }
    currentNode!.neighbors.push(neighbor);
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
    this.push({ routeName, params, callback });
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
    const currentNode = findLastNeighbor(this.navigationGraph, this.currentTab);
    console.log('currentNode?.uniqueID', currentNode);
    const newCallbacks = this.callbacks.filter(
      (cb) => cb.uniqueID !== currentNode?.uniqueID
    );
    this.callbacks = newCallbacks;
    popLastNeighborOfLastNode(this.navigationGraph, this.currentTab);
    ReactNavPageModule.pop();
  };

  setRoot = ({
    type,
    routeName = '',
    tabBar = {},
    params = {},
    stacks = [],
  }: rootTypes) => {
    this.callbacks = [];
    this.navigationGraph = [];
    const stacksObj = {
      tabs: stacks,
    };

    if (type === 'STACK') {
      this.currentRouteID = getUniqueID();
      const node: Node = {
        uniqueID: `0`,
        routeName: routeName,
        neighbors: [],
      };
      addNode(this.navigationGraph, node);
    } else if (type === 'TAB_STACK') {
      for (let index = 0; index < stacks.length; index++) {
        const stack = stacks[index];
        const node: Node = {
          uniqueID: `${index}`,
          routeName: stack?.routeName,
          neighbors: [],
        };
        addNode(this.navigationGraph, node);
      }
    }

    ReactNavPageModule.setRoot(type, routeName, params, stacksObj, tabBar);
  };

  changeTab = (index: Int32) => {
    ReactNavPageModule.changeTab(index);
  };

  setResult(args: any) {
    const currentNode = findLastNeighbor(this.navigationGraph, this.currentTab);
    const callbackObject = this.callbacks.find(
      (cb) => cb?.uniqueID === currentNode?.uniqueID
    );

    if (callbackObject) {
      callbackObject?.callback(args);
    }
  }
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
