import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

export default function SecondPage() {
  return (
    <View style={styles.container}>
      <Button
        label="POP"
        onPress={() => {
          ReactNavPage.pop();
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
    backgroundColor: '#ff9800',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
