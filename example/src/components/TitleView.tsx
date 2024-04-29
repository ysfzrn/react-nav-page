import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TitleView = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props?.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderColor: '#FFF',
  },
  text: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
