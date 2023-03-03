import React, {useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import SelectDropdown from 'react-native-select-dropdown';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {nameValidator} from '../helpers/nameValidator';

export default function FillProfile({route, navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const actionSheetRef = useRef(null);
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
      routes: [{name: 'InputPin'}],
    });
  };

  return (
    <Background>
      <Header>Fill your profile</Header>
      <View style={styles.imageContainer}>
        <Image
          source={
            route.params?.imageUri
              ? {uri: route.params?.imageUri}
              : require('../assets/avatar.png')
          }
          style={styles.image}
        />

        <TouchableOpacity
          style={styles.whitePen}
          onPress={() => actionSheetRef.current?.show()}>
          <Image
            source={require('../assets/white-pen.png')}
            style={styles.whitePenImage}
          />
        </TouchableOpacity>
      </View>
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

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Button
            mode="outlined"
            onPress={() => {
              actionSheetRef.current?.hide();
              navigation.navigate('PhotoCamera');
            }}>
            Select from library
          </Button>
          <Button
            mode="outlined"
            onPress={() => {
              actionSheetRef.current?.hide();
              navigation.navigate('PhotoCamera');
            }}>
            Take another picture
          </Button>
        </View>
      </ActionSheet>

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
  imageContainer: {
    borderRadius: 100,
    width: 200,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 100,
  },
  whitePenImage: {
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  whitePen: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 20,
    right: 30,
    padding: 5,
    borderRadius: 10,
  },
  actionSheetContainer: {
    height: 200,
    padding: 10,
  },
});
