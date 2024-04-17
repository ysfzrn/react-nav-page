import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReactNavPage, { useRouteChange } from 'react-nav-page';
import { Button } from './components/Button';
const Spiderman = require('./assets/spiderman.png');

export default function FirstPage() {
  const [count, setCount] = useState(0);

  useRouteChange((event: any) => {
    console.log('Current Route Name', event.routeName);
  });

  useEffect(() => {
    return () => {
      console.log('unmount FirstPage');
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <Image source={Spiderman} style={styles.image} resizeMode="contain" />
        <Button
          label="Go To Page"
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
        <Button
          label="POP"
          onPress={() => {
            ReactNavPage.setResult(100);
            ReactNavPage.pop();
          }}
        />
        <Button
          label="Show Tab Bar"
          onPress={() => {
            ReactNavPage.setRoot({
              type: 'TAB_STACK',
              stacks: [
                {
                  routeName: 'FirstPage',
                },
                {
                  routeName: 'ThirdPage',
                },
              ],
              tabBar: {
                tabBarComponentName: 'MyTabBar',
                tabBarHeight: 100,
              },
              params: {},
            });
          }}
        />

        <Text style={styles.count}>{count}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#673ab7',
    height: 900,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 240,
  },
});
