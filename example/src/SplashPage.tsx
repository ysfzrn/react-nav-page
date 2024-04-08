import React, { useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import ReactNavPage from 'react-nav-page';

export default function SplashPage() {
  useLayoutEffect(() => {
    setTimeout(() => {
      ReactNavPage.setRoot('FirstPage');
    }, 500);
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
