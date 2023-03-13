import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Text} from 'react-native-paper';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import {theme} from '../core/theme';

export default function VerifyIdentity({navigation}) {
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Let's Verify Identity</Header>
      <Paragraph>
        We want to confirm your identity before you can use our service
      </Paragraph>
      <Image source={require('../assets/verify.png')} style={styles.image} />
      <Button
        mode="contained"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'PhotoCamera'}],
          })
        }>
        Verify Identity
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  rememberContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: theme.colors.third,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 8,
  },
});
