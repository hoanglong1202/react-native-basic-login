import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {launchImageLibrary} from 'react-native-image-picker';
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

  const openImageLibrary = async () => {
    const result = await launchImageLibrary();
    const uri = result.assets?.uri;
    if (uri) {
      navigation.navigate('FillProfile', {imageUri: uri});
    }
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

              <View style={styles.wrapperButton}>
                <TouchableOpacity
                  onPress={openImageLibrary}
                  style={styles.libraryButton}>
                  <Image
                    source={require('../assets/image.png')}
                    style={styles.smallImage}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => takePicture(camera)}
                  style={styles.button}>
                  <Image
                    source={require('../assets/camera.png')}
                    style={styles.image}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.libraryButton}>
                  <Image
                    source={require('../assets/disk.png')}
                    style={styles.smallImage}
                  />
                </TouchableOpacity>
              </View>
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
    justifyContent: 'center',
    flexDirection: 'row',
  },
  button: {
    width: 100,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  smallImage: {
    width: 20,
    height: 20,
  },
  libraryButton: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: theme.colors.third,
    marginHorizontal: 10,
  },
});
