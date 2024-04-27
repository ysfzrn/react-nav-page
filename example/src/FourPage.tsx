import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReactNavPage, { useAppBarPress } from 'react-nav-page';
import { Button } from './components/Button';

const WallPaper = require('./assets/image.png');

export default function FourPage(props: any) {
  const [stCount, setCount] = useState(0);
  const { params: { count = 0 } = {} } = props || {};

  useAppBarPress((event: any) => {
    const { button } = event || {};
    if (button === 'left') {
      Alert.alert('ALERT', 'naber');
    }
  });

  const handleScroll = (event: any) => {
    ReactNavPage.setNavBarAlpha(event.nativeEvent.contentOffset.y / 100);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'black' }}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={styles.container}>
        <Image source={WallPaper} style={styles.image} />
        <Button
          label="POP"
          onPress={() => {
            ReactNavPage.pop();
          }}
        />
        <Button
          label={`${stCount}`}
          onPress={() => {
            setCount(stCount + 1);
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
    backgroundColor: '#e64a19',
    height: 1200,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 400,
  },
});
