import { AppRegistry } from 'react-native';
import SplashPage from './src/SplashPage';
import FirstPage from './src/FirstPage';
import SecondPage from './src/SecondPage';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => SplashPage);
AppRegistry.registerComponent('FirstPage', () => FirstPage);
AppRegistry.registerComponent('SecondPage', () => SecondPage);
