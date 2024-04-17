import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import ReactNavPage from 'react-nav-page';

const Spiderman = require('./assets/spiderman.png');

export default function SharedDetail() {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.image}
        nativeID="spidermanContainer"
        onPress={() => {
          ReactNavPage.pop();
        }}
      >
        <Image style={styles.image} source={Spiderman} resizeMode="cover" />
      </Pressable>
      <View style={styles.box} nativeID="box" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    width: 300,
    height: 340,
    zIndex: 10,
    position: 'absolute',
    top: 50,
  },
  image2: {
    width: '100%',
    height: '100%',
    opacity: 0.2,
  },
  box: {
    width: 300,
    height: 300,
    backgroundColor: 'blue',
    borderRadius: 150,
    top: 100,
  },
});
