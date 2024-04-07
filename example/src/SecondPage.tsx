import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { pop } from 'react-nav-page';

export default function SecondPage() {
  return (
    <View style={styles.container}>
      <Button
        title="POP"
        color="white"
        onPress={() => {
          pop();
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
