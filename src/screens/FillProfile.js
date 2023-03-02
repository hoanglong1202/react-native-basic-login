import React, {useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import {emailValidator} from '../helpers/emailValidator';
import {nameValidator} from '../helpers/nameValidator';

export default function FillProfile({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [name, setName] = useState({value: '', error: ''});
  const [address, setAddress] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const countries = ['Male', 'Female'];

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const nameError = nameValidator(name.value);
    if (emailError || nameError) {
      setEmail({...email, error: emailError});
      setName({...name, error: nameError});
      return;
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
  };

  return (
    <Background>
      <Header>Fill your profile</Header>
      <Image source={require('../assets/avatar.png')} style={styles.image} />

      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Phone"
        returnKeyType="next"
        value={phone.value}
        onChangeText={text => setPhone({value: text, error: ''})}
        keyboardType="numeric"
      />
      <TextInput
        label="Address"
        returnKeyType="next"
        value={address.value}
        onChangeText={text => setAddress({value: text, error: ''})}
      />
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={styles.selectButton}
        defaultButtonText="Gender"
      />

      <Button mode="contained" onPress={onSignUpPressed}>
        Continue
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