import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ReactNavPage, { SharedElementImage } from 'react-nav-page';
import { Button } from './components/Button';

const WallPaper = require('./assets/italy2.jpg');

export default function ThirdPage() {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    return () => {
      console.log('unmount ThirdPage');
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#43a047' }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <SharedElementImage
            sharedID="wallpaper"
            source={WallPaper}
            style={styles.image}
          />
        </View>
        <Button
          label="Go To Four"
          onPress={() => {
            ReactNavPage.pushWithTransition({
              routeName: 'FourPage',
              title: 'Four Page',
              component: require('./FourPage').default,
              params: {
                count,
              },
              navOptions: {
                headerTransparent: true,
                hederNavBarAlpha: 0,
                sharedElements: ['wallpaper'],
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
          label="Count+"
          onPress={() => {
            setCount(count + 1);
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
    paddingTop: 56,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  box: {
    top: 0,
    width: 100,
    height: 100,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
