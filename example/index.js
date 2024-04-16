import { AppRegistry } from 'react-native';
import SplashPage from './src/SplashPage';
import FirstPage from './src/FirstPage';
import SecondPage from './src/SecondPage';
import ThirdPage from './src/ThirdPage';
import FourPage from './src/FourPage';
import { TabBar } from './src/components/TabBar';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => SplashPage);
AppRegistry.registerComponent('FirstPage', () => FirstPage);
AppRegistry.registerComponent('SecondPage', () => SecondPage);
AppRegistry.registerComponent('ThirdPage', () => ThirdPage);
AppRegistry.registerComponent('FourPage', () => FourPage);
AppRegistry.registerComponent('MyTabBar', () => TabBar);
