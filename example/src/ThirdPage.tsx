import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

export default function ThirdPage() {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    return () => {
      console.log('unmount ThirdPage');
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={styles.container}>
        <Button
          label="Go To Four"
          onPress={() => {
            ReactNavPage.push({
              routeName: 'FourPage',
              params: {
                count,
              },
              callback: (v: number) => setCount(v),
            });
          }}
        />
        <Button
          label="POP"
          onPress={() => {
            ReactNavPage.setResult(100);
            ReactNavPage.pop();
          }}
        />
        <Button
          label="Count+"
          onPress={() => {
            setCount(count + 1);
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
    backgroundColor: '#43a047',
    height: 900,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
