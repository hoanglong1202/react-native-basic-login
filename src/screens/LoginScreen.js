import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Paragraph, Text} from 'react-native-paper';
import authService from '../api/auth.service';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import RememberButton from '../components/RememberButton';
import SocialList from '../components/SocialList';
import TextInput from '../components/TextInput';
import {theme} from '../core/theme';
import {emailValidator} from '../helpers/emailValidator';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = async () => {
    try {
      const emailError = emailValidator(email.value);
      if (emailError) {
        setEmail({...email, error: emailError});
        return;
      }
      const result = await authService.login({
        email: email.value,
        password: password.value,
      });

      if (result.status_code === 200) {
        navigation.navigate('Dashboard');
        // navigation.reset({
        //   index: 0,
        //   routes: [{name: 'Dashboard'}],
        // });
      }
    } catch (error) {
      setEmail({...email, error: 'Wrong email or password!'});
    }
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
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Login to Your Account</Header>
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
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <RememberButton />

      <Button
        mode="contained"
        onPress={onLoginPressed}
        disabled={!(email.value?.length && password.value?.length)}>
        Sign in
      </Button>

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividedText}>
        <View style={styles.line} />
        <View style={styles.dividedMiddleText}>
          <Paragraph style={styles.smallText}>or continue with</Paragraph>
        </View>

        <View style={styles.line} />
      </View>

      <SocialList />

      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 6,
  },
  row: {
    flexDirection: 'row',
    margin: 15,
  },
  forgot: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.primary,
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
    borderBottomColor: theme.colors.secondary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 2,
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
