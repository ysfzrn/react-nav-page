import { AppRegistry } from 'react-native';
import SplashPage from './src/SplashPage';
import FirstPage from './src/FirstPage';
import SecondPage from './src/SecondPage';
import ThirdPage from './src/ThirdPage';
import FourPage from './src/FourPage';
import FivePage from './src/FivePage';
import { TabBar } from './src/components/TabBar';
import { name as appName } from './app.json';
import ReactNavPage from 'react-nav-page';

ReactNavPage.registerComponent({
  route: appName,
  Component: SplashPage,
});

ReactNavPage.registerComponent({
  route: 'FirstPage',
  Component: FirstPage,
});

ReactNavPage.registerComponent({
  route: 'ThirdPage',
  Component: ThirdPage,
});

ReactNavPage.registerComponent({
  route: 'FivePage',
  Component: FivePage,
});

ReactNavPage.registerComponent({
  route: 'MyTabBar',
  Component: TabBar,
});
