import React from 'react';
import {StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Text} from 'react-native-paper';
import {theme} from '../core/theme';

export default function RememberButton({navigation}) {
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.rememberContainer}>
      <BouncyCheckbox
        iconStyle={{borderRadius: 10}}
        innerIconStyle={{borderRadius: 10}}
        fillColor={theme.colors.primary}
        onPress={() => setChecked(!checked)}
      />
      <Text style={styles.rememberText}>Remember me</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rememberContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  rememberText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
