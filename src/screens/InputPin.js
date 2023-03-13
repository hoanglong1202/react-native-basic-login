import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import PincodeInput from 'react-native-pincode-input';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import {Modal, Portal, Text} from 'react-native-paper';
import {theme} from '../core/theme';

export default function InputPin({navigation}) {
  const [pin, setPin] = useState('');
  const pincodeInput = useRef(null);
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
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
      <Button mode="contained" onPress={showModal}>
        Finish
      </Button>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}>
          <View style={styles.imgContainer}>
            <Image
              source={require('../assets/success.png')}
              style={styles.successImg}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Successful!</Text>
            <Text style={styles.description}>
              Please wait a moment, we are preparing for you...
            </Text>
          </View>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('StartScreen')}>
            Finish
          </Button>
        </Modal>
      </Portal>
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
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 50,
    borderRadius: 40,
  },
  titleContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: theme.colors.primary,
    fontFamily: 'SourceSansPro-Bold',
    fontSize: 26,
    marginBottom: 15,
  },
  description: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
    textAlign: 'center',
  },
  successImg: {
    width: 200,
    height: 200,
  },
  imgContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
