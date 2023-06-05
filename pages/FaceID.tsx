import React from 'react';
import {Alert} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

import FaceId from '../icons/face-id.svg';

const FaceID = () => {
  const handleScanFaceID = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    const {biometryType} = await rnBiometrics.isSensorAvailable();

    if (biometryType === BiometryTypes.FaceID) {
      try {
        const {success} = await rnBiometrics.simplePrompt({
          promptMessage: 'Scan your face to continue',
        });

        if (success) {
          Alert.alert('Face ID scan successful');
        } else {
          Alert.alert('Face ID scan failed');
        }
      } catch (error) {
        Alert.alert('Face ID scan error');
      }
    } else {
      Alert.alert('FaceID not supported');
    }
  };

  return (
    <Block flex={1} top={'220px'} alignItems={'center'}>
      <FaceId width={50} height={50} fill={'grey'} marginBottom={30} />
      <Button
        width={'120px'}
        height={'30px'}
        borderRadius={'10px'}
        justifyContent={'center'}
        bg={'#0d3d8c'}
        onPress={handleScanFaceID}>
        <Text fontSize={16} textAlign={'center'} color={'white'}>
          Use Face ID
        </Text>
      </Button>
    </Block>
  );
};

export default FaceID;
