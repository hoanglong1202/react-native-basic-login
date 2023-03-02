import React, {useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Image} from 'react-native';
import {theme} from '../core/theme';

const windowWidth = Dimensions.get('window').width;

// type Props = NativeStackScreenProps<Routes, 'CameraPage'>;
export default function PhotoCamera({navigation}) {
  const [takingPic, setTakingPic] = useState(false);
  const camera = useRef(null);
  const takePicture = async () => {
    if (camera && !takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      setTakingPic(true);

      try {
        const data = await camera.takePictureAsync(options);

        Alert.alert('Success', JSON.stringify(data));
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        setTakingPic(false);
      }
    }
  };
  return (
    <View style={styles.container} onPress={takePicture}>
      <RNCamera
        ref={camera}
        captureAudio={false}
        onPress={takePicture}
        style={styles.cameraContainer}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />

      <View style={styles.wrapperButton}>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => navigation.replace('FillProfile')}
          onPress={takePicture}>
          <Image
            source={require('../assets/camera.png')}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
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
