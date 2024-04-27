import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

export const TitleView = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props?.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#FFF',
  },
  text: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
