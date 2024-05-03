import * as React from 'react';

import {
  Alert,
  BackHandler,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';
import ReactNavPage, {
  SharedElementView,
  SharedElementImage,
} from 'react-nav-page';
import { Button } from './components/Button';

const screenWidth = Dimensions.get('screen').width;

const WallPaper = require('./assets/italy2.jpg');

export default function SecondPage(props: any) {
  console.log('props', props);
  const { params: { count = 0 } = {} } = props || {};

  React.useEffect(() => {
    const onBackPress = () => {
      Alert.alert('Alert Title', 'Back button disabled on this page', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
      return true;
    };
    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      console.log('unmount SecondPage');
    };
  }, []);

  return (
    <View style={styles.container}>
      <SharedElementImage
        sharedID="wallpaper"
        source={WallPaper}
        style={styles.image}
      />
      <Button
        label="Go To Second Page"
        onPress={() => {
          ReactNavPage.pushWithRegister({
            routeName: 'FirstPage2',
            title: 'First Page 2',
            component: require('./FirstPage').default,
            params: {
              count,
            },
            navOptions: {
              headerBackgroundColor: '#2196F3',
            },
          });
        }}
      />
      <Button
        label="POP"
        onPress={() => {
          ReactNavPage.pop();
        }}
      />
      <Button
        label="LOG OUT"
        onPress={() => {
          ReactNavPage.setRoot({
            type: 'STACK',
            routeName: 'FirstPage',
            title: 'First Page',
            params: {},
          });
        }}
      />
      <SharedElementView sharedID="myPop">
        <Text style={styles.count}>{count}</Text>
      </SharedElementView>
      <SharedElementView sharedID="circle" style={styles.circle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff9800',
    paddingTop: Platform.OS === 'android' ? 56 : 0,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  box: {
    width: screenWidth,
    height: 200,
  },
  image: {
    width: '100%',
    height: 400,
  },
  circle: {
    width: screenWidth,
    height: 200,
    backgroundColor: '#2196F3',
    borderRadius: 100,
  },
});
