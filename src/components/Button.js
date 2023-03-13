import React from 'react';
import {StyleSheet} from 'react-native';
import {Surface, Button as PaperButton} from 'react-native-paper';
import {theme} from '../core/theme';

export default function Button({mode, style, ...props}) {
  return (
    <Surface style={styles.surface} elevation={2}>
      <PaperButton
        style={[
          styles.button,
          mode === 'outlined' && {backgroundColor: theme.colors.surface},
          style,
        ]}
        labelStyle={styles.text}
        mode={mode}
        // icon={{uri: '../assets/arrow_back.png'}}
        {...props}
      />
    </Surface>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: 2,
  },
  surface: {
    width: '100%',
    padding: 0,
    marginVertical: 10,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 16,
    lineHeight: 26,
  },
});
