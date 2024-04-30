import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import ReactNavPage, {
  SharedElementView,
  useAppBarPress,
} from 'react-nav-page';
import { Button } from './components/Button';

const WallPaper = require('./assets/italy2.jpg');

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
    let offset = Math.min(event.nativeEvent.contentOffset.y, 100);

    if (offset > 0) {
      ReactNavPage.setNavBarAlpha(
        Math.min(event.nativeEvent.contentOffset.y, 100) / 100
      );
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: 'black' }}
      onScroll={handleScroll}
      bounces={false}
      scrollEventThrottle={16}
    >
      <View style={styles.container}>
        <SharedElementView sharedID="four" style={styles.image}>
          <Image source={WallPaper} style={styles.image} />
        </SharedElementView>
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
