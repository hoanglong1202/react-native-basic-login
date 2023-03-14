import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Paragraph} from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import {nameValidator} from '../helpers/nameValidator';
import SocialList from '../components/SocialList';
import RememberButton from '../components/RememberButton';
import authService from '../api/auth.service';
import CheckBoxButton from '../components/RememberButton';

export default function RegisterScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onSignUpPressed = async () => {
    try {
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);
      if (emailError || passwordError) {
        setEmail({...email, error: emailError});
        setPassword({...password, error: passwordError});
        return;
      }
      const result = await authService.register({
        email: email.value,
        password: password.value,
        domain_code: '1234abcd',
      });

      if (result.status_code === 201) {
        navigation.navigate('Dashboard');
        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'Dashboard'}],
        // });
      }
    } catch (error) {
      setEmail({...email, error: 'Something wrong!'});
    }
  };

  const checkPassword = pass => {
    const passwordError = passwordValidator(pass);
    if (passwordError) {
      setPassword({value: pass, error: passwordError});
      return;
    }
    setPassword({value: pass, error: ''});
  };

  const checkEmail = mail => {
    const emailError = emailValidator(mail);
    if (emailError) {
      setEmail({value: mail, error: emailError});
      return;
    }
    setEmail({value: mail, error: ''});
  };

  return (
    <Background>
      <BackButton
        goBack={() => navigation.replace('StartScreen')}
        // onPress={() => navigation.replace('StartScreen')}
      />
      <Logo />
      <Header>Create new Account</Header>

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
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => checkPassword(text)}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <CheckBoxButton text="Remember me" />

      <Button
        mode="contained"
        onPress={onSignUpPressed}
        disabled={!(email.value?.length && password.value?.length)}>
        Sign Up
      </Button>

      <View style={styles.dividedText}>
        <View style={styles.line} />
        <View style={styles.dividedMiddleText}>
          <Paragraph style={styles.smallText}>or continue with</Paragraph>
        </View>

        <View style={styles.line} />
      </View>

      <SocialList />

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  dividedText: {
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  line: {
    borderBottomColor: theme.colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 1,
    width: 90,
  },
  dividedMiddleText: {
    marginBottom: 0,
    width: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    marginBottom: 0,
  },
});
