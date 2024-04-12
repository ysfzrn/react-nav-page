import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNavPage, { useRouteChange } from 'react-nav-page';
import { Button } from './components/Button';

export default function FirstPage() {
  const [count, setCount] = useState(0);

  useRouteChange((event: any) => {
    console.log('Current Route Name', event.routeName);
  });

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
