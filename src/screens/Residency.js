import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Text} from 'react-native-paper';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import {theme} from '../core/theme';
import CardIcon from '../assets/address-card-solid.png';
import CarIcon from '../assets/car-solid.png';
import PassportIcon from '../assets/passport-solid.png';

const ListItem = ({text, url}) => {
  const [checked, setChecked] = React.useState(false);
  return (
    <TouchableOpacity
      style={styles.rememberContainer}
      onPress={() => setChecked(!checked)}>
      <View style={styles.titleContainer}>
        <Image source={url} style={styles.image} />
        <Text style={styles.rememberText}>{text}</Text>
      </View>

      <BouncyCheckbox
        isChecked={checked}
        iconStyle={{borderRadius: 10}}
        innerIconStyle={{borderRadius: 10}}
        fillColor={theme.colors.primary}
        disableBuiltInState
        onPress={() => setChecked(!checked)}
      />
    </TouchableOpacity>
  );
};

export default function Residency({navigation}) {
  const items = [
    {
      text: 'National Identity Card',
      url: CardIcon,
    },
    {
      text: 'Passport',
      url: CarIcon,
    },
    {
      text: 'Driver License',
      url: PassportIcon,
    },
  ];
  return (
    <Background>
      <Header>Proof of Residency</Header>
      <Paragraph>Prove you live in United State</Paragraph>

      <View style={styles.methodContainer}>
        <Text style={styles.method}>Nationality</Text>
      </View>

      <TouchableOpacity style={styles.rememberContainer}>
        <View style={styles.titleContainer}>
          <Image
            source={require('../assets/vietnam.png')}
            style={styles.image}
          />
          <Text style={styles.rememberText}>United Stated</Text>
        </View>

        <Text style={styles.changeText}>change</Text>
      </TouchableOpacity>

      <View style={styles.methodContainer}>
        <Text style={styles.method}>Choose Verification Method</Text>
      </View>
      {items.map((x, index) => (
        <ListItem text={x.text} url={x.url} key={index} />
      ))}

      <View style={styles.methodContainer}>
        <Button
          mode="contained"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'VerifyIdentity'}],
            })
          }>
          Continue
        </Button>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  rememberContainer: {
    display: 'flex',
    justifyContent: 'space-between',
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
    width: 25,
    height: 25,
    marginHorizontal: 8,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
  },
  methodContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',

    marginVertical: 15,
  },
  method: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  changeText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
