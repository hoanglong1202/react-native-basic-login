import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Text} from 'react-native-paper';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import CheckBoxButton from '../components/RememberButton';
import {theme} from '../core/theme';

export default function Dashboard({navigation}) {
  const items = [
    'Make Online Payments',
    'Spend or save daily',
    'Gain exposure to financial assets',
    'Spend and manage money',
    'Spend while traveling',
    'Other reason',
  ];
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Reason for Using Us</Header>
      <Paragraph>
        We want to provide the best experience according to your need
      </Paragraph>

      {items.map((x, index) => (
        <CheckBoxButton text={x} key={index} isBordered={true} />
      ))}

      <Button
        mode="contained"
        onPress={
          () => navigation.navigate('VerifyIdentity')
          // navigation.reset({
          //   index: 0,
          //   routes: [{name: 'VerifyIdentity'}],
          // })
        }>
        Continue
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
    marginVertical: 10,
    borderWidth: 1,
    borderColor: theme.colors.third,
    borderRadius: 20,
    padding: 15,
  },
  rememberText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
