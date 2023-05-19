import React, {useRef} from 'react';
import {Alert, Platform} from 'react-native';
import SignatureScreen, {SignatureViewRef} from 'react-native-signature-canvas';
import RNFS from 'react-native-fs';
import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

const saveSignature = async signature => {
  const fileName = 'signature.png';
  const folderPath = `${
    Platform.OS === 'ios'
      ? RNFS.ExternalStorageDirectoryPath
      : RNFS.DocumentDirectoryPath
  }/AppName`;

  if (!(await RNFS.exists(folderPath))) {
    await RNFS.mkdir(folderPath);
  }

  const imagePath = `${folderPath}/${fileName}`;

  try {
    await RNFS.writeFile(imagePath, signature, 'base64');
    Alert.alert('Success', 'Signature saved to device storage successfully!');
  } catch (error) {
    console.error('Failed to save signature:', error);
  }
};

const Sign = () => {
  const signatureRef = useRef<SignatureViewRef>();

  const handleSave = async () => {
    const signature = await signatureRef.current?.readSignature();
    if (signature) {
      await saveSignature(signature);
    } else {
      Alert.alert('Error', 'Please provide a signature');
    }
  };

  const handleConfirm = () => {
    Alert.alert('Confirmed', 'Signature confirmed');
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  return (
    <Block flex={1}>
      <Block
        height={'120px'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        paddingVertical={'20px'}>
        <Text fontWeight={'bold'} fontSize={18}>
          Signature
        </Text>
      </Block>
      <Block marginBottom={20} height={'400px'}>
        <SignatureScreen
          webStyle={'.m-signature-pad--footer {display: none; margin: 0px;}'}
          ref={signatureRef}
        />
      </Block>
      <Block
        paddingHorizontal={'20px'}
        marginBottom={20}
        flexDirection={'row'}
        justifyContent={'space-between'}>
        <Button
          onPress={handleClear}
          borderRadius={'5px'}
          height={'30px'}
          width={'80px'}
          bg={'#3c86ff'}
          justifyContent={'center'}>
          <Text textAlign={'center'} color={'white'}>
            Clear
          </Text>
        </Button>

        <Text color={'grey'}>Sign above</Text>

        <Button
          onPress={handleConfirm}
          bg={'#3c86ff'}
          height={'30px'}
          width={'80px'}
          borderRadius={'5px'}
          justifyContent={'center'}>
          <Text textAlign={'center'} color={'white'}>
            Confirm
          </Text>
        </Button>
      </Block>

      <Button
        justifyContent={'center'}
        height={'50px'}
        bg={'#e4e8ee'}
        onPress={handleSave}>
        <Text
          fontWeight={'bold'}
          fontSize={16}
          color={'#3c86ff'}
          textAlign={'center'}>
          Save signature
        </Text>
      </Button>
    </Block>
  );
};

export default Sign;
