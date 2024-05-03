import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import ReactNavPage, {
  useAppBarPress,
  useRouteChange,
  SharedElementView,
  SharedElementImage,
} from 'react-nav-page';
import { Button } from './components/Button';

const WallPaper = require('./assets/italy2.jpg');

export default function FirstPage() {
  const [count, setCount] = useState(0);

  useRouteChange((event: any) => {
    console.log('Current Route Name', event.routeName);
  });

  useAppBarPress((event: any) => {
    const { button } = event || {};
    if (button === 'left') {
      ReactNavPage.pop();
    }
  });

  useEffect(() => {
    return () => {
      console.log('unmount FirstPage');
    };
  }, []);

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <SharedElementImage
          sharedID="wallpaper"
          source={WallPaper}
          style={styles.image}
        />
        <Button
          label="Go To Page"
          onPress={() => {
            ReactNavPage.pushWithTransition({
              routeName: 'SecondPage',
              title: 'Second Page',
              component: require('./SecondPage').default,
              params: {
                count,
              },
              navOptions: {
                headerShow: true,
                sharedElements: ['wallpaper', 'circle', 'myPop'],
              },
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
                  routeName: 'FirstPage',
                  title: 'First Page',
                  params: {},
                },
                {
                  routeName: 'FivePage',
                  title: 'Five Page',
                  params: {},
                },
                {
                  routeName: 'ThirdPage',
                  title: 'Third Page',
                  params: {},
                  navOptions: {
                    headerBackgroundColor: '#009688',
                  },
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

        <SharedElementView sharedID="myPop">
          <Text style={styles.count}>{count}</Text>
        </SharedElementView>
        <TextInput style={styles.input} />
        <SharedElementView sharedID="circle" style={styles.circle} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#E91E63',
    paddingTop: 56,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    height: 1000,
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
    width: 150,
    height: 150,
  },
  image: {
    width: 150,
    height: 150,
  },
  circle: {
    width: 100,
    height: 100,
    backgroundColor: '#f9a825',
  },
});
