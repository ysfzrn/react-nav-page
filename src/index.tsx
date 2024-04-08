const ReactNavPageModule = require('./NativeReactNavPage').default;

class ReactNavPage {
  push = (routeName: String) => {
    ReactNavPageModule.push(routeName);
  };

  pop = () => {
    ReactNavPageModule.pop();
  };

  setRoot = (routeName: String) => {
    ReactNavPageModule.setRoot(routeName);
  };
}

export default new ReactNavPage();
