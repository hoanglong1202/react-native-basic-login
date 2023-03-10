import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Paragraph from '../components/Paragraph';
import {theme} from '../core/theme';

export default function StartScreen({navigation}) {
  return (
    <Background>
      <Logo />
      <Header>Let's you in</Header>
      <TouchableOpacity style={styles.button}>
        <Image source={require('../assets/fb.png')} style={styles.iconBtn} />
        <Text style={styles.title}>Continue with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image
          source={require('../assets/google.jpg')}
          style={styles.iconBtn}
        />
        <Text style={styles.title}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image source={require('../assets/apple.png')} style={styles.iconBtn} />
        <Text style={styles.title}>Continue with Apple</Text>
      </TouchableOpacity>

      <Divider />

      <View style={styles.dividedText}>
        <View style={styles.line} />
        <View style={styles.dividedMiddleText}>
          <Paragraph style={styles.smallText}>or</Paragraph>
        </View>

        <View style={styles.line} />
      </View>

      <Button
        mode="contained"
        buttonColor={theme.colors.primary}
        onPress={() => navigation.navigate('LoginScreen')}>
        Sign in with password
      </Button>
      <View style={styles.row}>
        <Text style={styles.smallTitle}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 10,
  },
  title: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 16,
  },
  smallTitle: {
    fontFamily: 'SourceSansPro-Regular',
  },
  link: {
    fontFamily: 'SourceSansPro-Bold',
    color: theme.colors.primary,
  },
  button: {
    borderColor: theme.colors.third,
    borderWidth: 1,
    padding: 15,
    marginVertical: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15,
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
    height: 2,
    width: 120,
  },
  dividedMiddleText: {
    marginBottom: 0,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    marginBottom: 0,
  },
  iconBtn: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
