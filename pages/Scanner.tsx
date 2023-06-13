import React, {useRef} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

import {Camera, CameraType} from 'react-native-camera-kit';
import RNFS from 'react-native-fs';

import {Block} from '../styled/Block';
import {Button} from '../styled/Button';
import {Text} from '../styled/Text';

const Scanner = () => {
  const cameraRef = useRef<Camera>(null);

  const requestCameraPermission = async () => {
    const cameraPermission = await check(PERMISSIONS.IOS.CAMERA);
    if (cameraPermission !== 'granted') {
      await request(PERMISSIONS.IOS.CAMERA);
    }
  };

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  const handleCaptureCode = async () => {
    if (cameraRef.current) {
      const {uri} = await cameraRef.current.capture();
      const filePath = uri.replace('file://', '');
      const pathSegments = filePath.split('/');
      const fileName = pathSegments[pathSegments.length - 1];
      const destFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
      await RNFS.moveFile(filePath, destFilePath);

      Alert.alert('Photo was saved', destFilePath);
    }
  };

  const handleReadCode = (event: any) => {
    Alert.alert('Scanning was successful!', event.nativeEvent.codeStringValue);
  };

  const styles = StyleSheet.create({
    camera: {
      height: 500,
      marginBottom: 30,
      marginLeft: 10,
      marginRight: 10,
    },
  });

  return (
    <Block>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        cameraType={CameraType.Back}
        scanBarcode={true}
        onReadCode={handleReadCode}
        showFrame={true}
        laserColor="red"
        frameColor="yellow"
      />
      <Button
        width={'250px'}
        height={'40px'}
        bg={'#3c86ff'}
        justifyContent={'center'}
        alignSelf={'center'}
        borderRadius={'10px'}
        onPress={handleCaptureCode}>
        <Text fontWeight={'bold'} color={'white'} textAlign={'center'}>
          Capture QR-code
        </Text>
      </Button>
    </Block>
  );
};
export default Scanner;
