import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';

export default function CheckBoxButton({text, isBordered}) {
  const [checked, setChecked] = React.useState(false);

  return (
    <TouchableOpacity
      style={
        isBordered
          ? {...styles.rememberContainer, ...styles.borderContainer}
          : styles.rememberContainer
      }
      onPress={() => setChecked(!checked)}>
      <BouncyCheckbox
        isChecked={checked}
        iconStyle={{borderRadius: 10}}
        innerIconStyle={{borderRadius: 10}}
        fillColor={theme.colors.primary}
        disableBuiltInState
        onPress={() => setChecked(!checked)}
      />
      <Text style={styles.rememberText}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  rememberContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  borderContainer: {
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.third,
    borderRadius: 20,
    padding: 15,
  },
  rememberText: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Bold',
  },
});
