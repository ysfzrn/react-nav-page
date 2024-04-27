import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const BackIcon = require('../assets/back.png');
export const LeftButtonView = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={BackIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  icon: {
    width: 32,
    height: 32,
    tintColor: '#FFF',
  },
});
