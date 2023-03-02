import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import PincodeInput from 'react-native-pincode-input';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import {theme} from '../core/theme';

export default function InputPin({navigation}) {
  const [pin, setPin] = useState('');
  const pincodeInput = useRef(null);

  return (
    <Background>
      <Header>Create New Pin</Header>
      <Paragraph>Add a PIN number to make your account more secure</Paragraph>
      <PincodeInput
        ref={pincodeInput}
        length={4}
        containerStyle={styles.container}
        circleContainerStyle={styles.circleContainer}
        circleEmptyStyle={styles.circleEmpty}
        circleFilledStyle={styles.circleFilled}
        pin={pin}
        onTextChange={pin => setPin(pin)}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('StartScreen')}>
        Finish
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  circleContainer: {
    paddingHorizontal: 32,
  },
  circleEmpty: {
    borderWidth: 1,
    borderColor: theme.colors.third,
  },
  circleFilled: {
    backgroundColor: theme.colors.black,
  },
  selectButton: {
    width: '100%',
    borderRadius: 10,
    marginVertical: 8,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
});
