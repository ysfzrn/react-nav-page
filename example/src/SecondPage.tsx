import * as React from 'react';

import { Alert, BackHandler, StyleSheet, Text, View } from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

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
      <Button
        label="Go To Second Page"
        onPress={() => {
          ReactNavPage.pushWithRegister({
            routeName: 'FirstPage',
            component: require('./FirstPage').default,
            params: {
              count,
            },
          });
        }}
      />
      <Button
        label="POP"
        onPress={() => {
          ReactNavPage.setResult(100);
          ReactNavPage.pop();
        }}
      />
      <Button
        label="LOG OUT"
        onPress={() => {
          ReactNavPage.setRoot({
            type: 'STACK',
            routeName: 'FirstPage',
            params: {},
          });
        }}
      />
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff9800',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
