import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

export default function FivePage() {
  const [stCount, setCount] = useState(0);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <Button
          label="Go to Third Tab"
          onPress={() => {
            ReactNavPage.changeTab(2);
          }}
        />
        <Button
          label={`${stCount}`}
          onPress={() => {
            setCount(stCount + 1);
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9c27b0',
    height: 900,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
