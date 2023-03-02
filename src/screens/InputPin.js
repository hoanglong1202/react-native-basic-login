import React, {useRef, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import {emailValidator} from '../helpers/emailValidator';
import {nameValidator} from '../helpers/nameValidator';
import PincodeInput from 'react-native-pincode-input';

export default function InputPin({navigation}) {
  const [pin, setPin] = useState('');
  const pincodeInput = useRef(null);
  const [name, setName] = useState({value: '', error: ''});
  const [address, setAddress] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const countries = ['Male', 'Female'];

  const shakePincode = () => {
    this.pincodeInput.shake();
  };

  return (
    <Background>
      <Header>Create New Pin</Header>
      <PincodeInput
        ref={pincodeInput}
        length={4}
        containerStyle={{
          display: 'flex',
          width: '100%',
          height: 200,
          justifyContent: 'center',
        }}
        circleContainerStyle={{
          paddingHorizontal: 32,
        }}
        circleEmptyStyle={{
          borderWidth: 1,
          borderColor: '#424242',
        }}
        circleFilledStyle={{
          backgroundColor: '#424242',
        }}
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
