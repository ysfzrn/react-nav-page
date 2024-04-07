import { AppRegistry } from 'react-native';
import App from './src/App';
import SecondPage from './src/SecondPage';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('SecondPage', () => SecondPage);
