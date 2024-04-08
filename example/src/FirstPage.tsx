import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

export default function FirstPage() {
  return (
    <View style={styles.container}>
      <Button
        label="Go To Second Page"
        onPress={() => {
          ReactNavPage.push('SecondPage');
        }}
      />
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
});
