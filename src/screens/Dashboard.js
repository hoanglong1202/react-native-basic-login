import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Text} from 'react-native-paper';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import {theme} from '../core/theme';

const ListItem = ({text}) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <TouchableOpacity
      style={styles.rememberContainer}
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
};

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
        <ListItem text={x} key={index} />
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
