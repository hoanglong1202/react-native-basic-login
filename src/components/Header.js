import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    color: theme.colors.secondary,
    paddingVertical: 6,
    marginBottom: 6,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'SourceSansPro-Bold',
  },
});
