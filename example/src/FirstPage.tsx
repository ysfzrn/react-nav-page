import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ReactNavPage from 'react-nav-page';
import { Button } from './components/Button';

export default function FirstPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    return () => {
      console.log('unmount FirstPage');
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Button
            label="Go To Page"
            onPress={() => {
              ReactNavPage.pushWithRegister({
                routeName: 'SecondPage',
                component: require('./SecondPage').default,
                params: {
                  count,
                },
                callback: (v: number) => setCount(v),
              });
            }}
          />
          <Button
            label="Count+"
            onPress={() => {
              setCount(count + 1);
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
            label="Show Tab Bar"
            onPress={() => {
              ReactNavPage.setRoot({
                type: 'TAB_STACK',
                stacks: [
                  {
                    routeName: 'FivePage',
                  },
                  {
                    routeName: 'FirstPage',
                  },
                  {
                    routeName: 'ThirdPage',
                  },
                ],
                tabBar: {
                  tabBarComponentName: 'MyTabBar',
                  tabBarHeight: 100,
                },
                params: {},
              });
            }}
          />

          <Text style={styles.count}>{count}</Text>
          <TextInput style={styles.input} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#673ab7',
  },
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 900,
  },
  count: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#FFF',
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    width: 300,
    borderRadius: 12,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
    top: 100,
    left: 100,
  },
});
