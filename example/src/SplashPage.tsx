import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ReactNavPage from 'react-nav-page';

export default function SplashPage() {
  useLayoutEffect(() => {
    setTimeout(() => {
      ReactNavPage.setRoot({
        type: 'STACK',
        routeName: 'FirstPage',
        title: 'First Page',
        params: {},
      });
    }, 500);

    /*
    ReactNavPage.setRoot({
      type: 'TAB_STACK',
      routeNames: ['FirstPage', 'SecondPage'],
      tabBarView: 'MyTabBar',
      initialProps: {},
    });*/
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>React Nav Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#673ab7',
  },
  text: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
