import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

export default function FirstPage() {
  const [count, setCount] = React.useState(0);

  return (
    <View style={styles.container}>
      <Button
        label="Go To Second Page"
        onPress={() => {
          ReactNavPage.push({
            routeName: 'SecondPage',
            params: {
              count,
            },
            callback: (v: number) => setCount(v),
          });
        }}
      />
      <Button
        label="Count+"
        onPress={() => {
          setCount(count + 1);
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
    backgroundColor: '#673ab7',
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
