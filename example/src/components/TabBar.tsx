import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import ReactNavPage, { useTabChange } from 'react-nav-page';

const HomeSelected = require('../assets/home-selected.png');
const HomeUnSelected = require('../assets/home-unselected.png');
const ProfileSelected = require('../assets/profile-selected.png');
const ProfileUnSelected = require('../assets/profile-unselected.png');

export const TabBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    return () => {
      console.log('unmound CustomTabBar');
    };
  }, []);

  useTabChange((index: number) => {
    setSelectedIndex(index);
  });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container]}>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => ReactNavPage.changeTab(0)}
        >
          <Image
            source={selectedIndex === 0 ? HomeSelected : HomeUnSelected}
            style={[styles.icon, { tintColor: '#673ab7' }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => ReactNavPage.changeTab(1)}
          activeOpacity={0.94}
        >
          <View
            style={[
              styles.plus,
              { backgroundColor: selectedIndex === 1 ? '#E91E63' : '#37474f' },
            ]}
          >
            <Text style={styles.plusText}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => ReactNavPage.changeTab(2)}
        >
          <Image
            source={selectedIndex === 2 ? ProfileSelected : ProfileUnSelected}
            style={[styles.icon, { tintColor: '#ff9800' }]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    width: '85%',
    alignSelf: 'center',
    height: 60,
    borderRadius: 120,
    bottom: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
  plus: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    top: -35,
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  plusText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
