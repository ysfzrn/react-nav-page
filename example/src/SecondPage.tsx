import * as React from 'react';

import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReactNavPage, { SharedElementView } from 'react-nav-page';
import { Button } from './components/Button';

const WallPaper = require('./assets/italy2.jpg');

export default function SecondPage(props: any) {
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
      <SharedElementView style={styles.box} sharedID="myImage">
        <Image source={WallPaper} style={styles.image} />
      </SharedElementView>
      <Button
        label="Go To Second Page"
        onPress={() => {
          ReactNavPage.pushWithRegister({
            routeName: 'FirstPage',
            title: 'First Page',
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ff9800',
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  box: {
    width: '100%',
    height: 400,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
