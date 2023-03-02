import React, {useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {theme} from '../core/theme';

const windowWidth = Dimensions.get('window').width;

// type Props = NativeStackScreenProps<Routes, 'CameraPage'>;
export default function PhotoCamera({navigation}) {
  const [image, setImage] = useState(null);
  const takePicture = async camera => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    setImage(data.uri);
    navigation.navigate('FillProfile', {imageUri: data.uri});
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.cameraContainer}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {({camera, status, recordAudioPermissionStatus}) => {
          if (status !== 'READY') {
            return <Text>No</Text>;
          }
          return (
            <View style={styles.wrapperButton}>
              {/* <Image source={{uri: image}} style={{width: 100, height: 100}} /> */}
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.button}>
                <Image
                  source={require('../assets/camera.png')}
                  style={styles.image}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  cameraContainer: {
    flex: 1,
  },
  wrapperButton: {
    position: 'absolute',
    bottom: 50,
    width: windowWidth,
    height: 100,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
});
