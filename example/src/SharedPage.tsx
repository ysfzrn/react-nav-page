import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

const Spiderman = require('./assets/spiderman.png');

export default function SharedPage() {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.imageContainer}
        nativeID={`spidermanContainer`}
        onPress={() => {
          ReactNavPage.push({
            routeName: 'SharedDetail',
            params: {},
          });
        }}
      >
        <Image style={styles.image} source={Spiderman} resizeMode="cover" />
      </Pressable>

      <Button
        label="Go To Page"
        onPress={() => {
          ReactNavPage.push({
            routeName: 'FirstPage',
            params: {},
          });
        }}
      />
      <View style={styles.box} nativeID="box" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageContainer: {
    width: 160,
    height: 180,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    bottom: 300,
  },
});
