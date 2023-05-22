import React, {useRef, useState} from 'react';
import {Alert, Platform} from 'react-native';
import SignatureScreen from 'react-native-signature-canvas';
import RNFS from 'react-native-fs';
import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

const Sign = () => {
  const signatureRef = useRef(null);
  const [signature, setSignature] = useState('');

  const saveSignature = async () => {
    const fileName = 'signature.png';
    const folderPath = `${
      Platform.OS === 'ios'
        ? RNFS.DocumentDirectoryPath
        : RNFS.ExternalDirectoryPath
    }/AppName`;

    try {
      if (!(await RNFS.exists(folderPath))) {
        await RNFS.mkdir(folderPath);
      }

      const imagePath = `${folderPath}/${fileName}`;
      await RNFS.writeFile(imagePath, signature, 'base64');

      await RNFS.scanFile(imagePath); // Сканирование файла для добавления его в галерею устройства

      Alert.alert('Success', 'Signature saved to gallery successfully!');
    } catch (error) {
      console.error('Failed to save signature:', error);
    }
  };

  const handleSave = async signature => {
    setSignature(signature);
  };

  const handleConfirm = () => {
    Alert.alert('Confirmed', 'Signature confirmed');
  };

  const handleClear = () => {
    signatureRef.current?.clearSignature();
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleEnd = () => {
    signatureRef.current?.readSignature();
  };

  return (
    <Block flex={1}>
      <Block marginBottom={20} height={'350px'}>
        <SignatureScreen
          webStyle={'.m-signature-pad--footer {display: none; margin: 0px;}'}
          ref={signatureRef}
          onEnd={handleEnd}
          onOK={handleSave}
          onEmpty={handleEmpty}
          onClear={handleClear}
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
        onPress={saveSignature}>
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
