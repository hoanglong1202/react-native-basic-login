import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {theme} from '../core/theme';

export default function SocialList() {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity style={styles.iconBtnContainer}>
        <Image source={require('../assets/fb.png')} style={styles.iconBtn} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtnContainer}>
        <Image source={require('../assets/apple.png')} style={styles.iconBtn} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconBtnContainer}>
        <Image
          source={require('../assets/google.jpg')}
          style={styles.iconBtn}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  iconBtnContainer: {
    borderColor: theme.colors.third,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  iconBtn: {
    width: 25,
    height: 25,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
});
