import React, {useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';
import {launchImageLibrary} from 'react-native-image-picker';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {nameValidator} from '../helpers/nameValidator';
import {phoneValidator} from '../helpers/phoneValidator';

export default function FillProfile({route, navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [imageUri, setImageUri] = useState(() => route?.params?.imageUri);
  const actionSheetRef = useRef(null);
  const actionGenderSheetRef = useRef(null);
  const [name, setName] = useState({value: '', error: ''});
  const [address, setAddress] = useState({value: '', error: ''});
  const [phone, setPhone] = useState({value: '', error: ''});
  const [gender, setGender] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    const emailError = emailValidator(email.value);
    const nameError = nameValidator(name.value);
    const phoneError = phoneValidator(phone.value);
    if (emailError || nameError || phoneError) {
      setEmail({...email, error: emailError});
      setName({...name, error: nameError});
      setPhone({...phone, error: phoneError});
      return;
    }

    navigation.navigate('InputPin');
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'InputPin'}],
    // });
  };

  const openImageLibrary = async () => {
    actionSheetRef.current?.hide();
    const result = await launchImageLibrary();
    const uri = result.assets[0]?.uri;
    if (uri) {
      setImageUri(uri);
    }
  };

  const changeGender = async gender => {
    actionGenderSheetRef.current?.hide();
    setGender({value: gender, error: ''});
  };

  const checkName = name => {
    const nameError = nameValidator(name);
    if (nameError) {
      setName({value: name, error: nameError});
      return;
    }
    setName({value: name, error: ''});
  };

  const checkEmail = email => {
    const emailError = emailValidator(email);
    if (emailError) {
      setEmail({value: email, error: emailError});
      return;
    }
    setEmail({value: email, error: ''});
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Header>Fill your profile</Header>
      <View style={styles.imageContainer}>
        <Image
          source={imageUri ? {uri: imageUri} : require('../assets/avatar.png')}
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
        onChangeText={text => checkName(text)}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => checkEmail(text)}
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
        error={!!phone.error}
        errorText={phone.error}
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
      <TouchableOpacity
        style={styles.genderContainer}
        onPress={() => actionGenderSheetRef.current?.show()}>
        <TextInput label="Gender" value={gender.value} editable={false} />
      </TouchableOpacity>

      <ActionSheet ref={actionGenderSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Button mode="outlined" onPress={() => changeGender('Male')}>
            Male
          </Button>
          <Button mode="outlined" onPress={() => changeGender('Female')}>
            Female
          </Button>
        </View>
      </ActionSheet>

      <ActionSheet ref={actionSheetRef}>
        <View style={styles.actionSheetContainer}>
          <Button mode="outlined" onPress={openImageLibrary}>
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

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        disabled={!(email.value?.length && name.value?.length)}>
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
    height: 25,
    width: 25,
    borderRadius: 10,
  },
  whitePen: {
    backgroundColor: theme.colors.primary,
    position: 'absolute',
    bottom: 10,
    right: 20,
    padding: 5,
    borderRadius: 10,
  },
  actionSheetContainer: {
    height: 200,
    padding: 10,
  },
  genderContainer: {
    width: '100%',
    marginBottom: 10,
  },
});
