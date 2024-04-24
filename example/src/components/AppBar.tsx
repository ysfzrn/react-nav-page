import { StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';
import { ReactNavPageHeaderView } from 'react-nav-page';

export const AppBar = (props: any) => {
  console.log('props', props);

  useEffect(() => {
    return () => {
      console.log('*****UNMOUNT APPBAR*******');
    };
  }, []);

  return (
    <ReactNavPageHeaderView style={styles.container}>
      <Text style={styles.title}>APPBAR2</Text>
    </ReactNavPageHeaderView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    width: 200,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
