import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

export default function FourPage(props: any) {
  const [stCount, setCount] = useState(0);
  const { params: { count = 0 } = {} } = props || {};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <Button
          label="POP"
          onPress={() => {
            ReactNavPage.setResult(50);
            ReactNavPage.pop();
          }}
        />
        <Button
          label={`${stCount}`}
          onPress={() => {
            setCount(stCount + 1);
          }}
        />
        <Button
          label="Shared Page"
          onPress={() => {
            ReactNavPage.push({
              routeName: 'SharedPage',
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
    backgroundColor: '#e64a19',
    height: 900,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
