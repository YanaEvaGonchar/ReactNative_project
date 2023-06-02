import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Modal} from 'react-native';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';

import Header from '../Components/Header';
import Carton from '../Components/Carton';

import Wifi from '../icons/wifi.svg';

const BarcodeScanning = () => {
  const [count, setCount] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;

    if (isScanning) {
      interval = setInterval(() => {
        const result = Math.random() >= 0.5;

        if (result) {
          setCount(prevCount => prevCount + 1);
          setError(false);
        } else {
          setError(true);
        }
      }, 3000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isScanning, error]);

  const handleChangeScanning = () => {
    setIsScanning(prevScanning => !prevScanning);
  };

  return (
    <Block>
      <Header />
      <Carton />
      <Block alignItems={'center'} marginBottom={10}>
        <Text fontSize={100} color={'#0d3d8c'}>
          {count}
        </Text>
        <Wifi marginBottom={10} width={100} height={100} fill={'grey'} />
        <Text fontSize={24} color={'grey'}>
          Reading RFID...
        </Text>
        {error && (
          <Modal
            visible={error}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setError(false)}>
            <Block
              flex={1}
              justifyContent={'center'}
              alignItems={'center'}
              bg={'white'}>
              <Block
                width={'300px'}
                height={'170px'}
                justifyContent={'center'}
                alignItems={'center'}
                paddingVertical={'10px'}
                borderRadius={'5px'}
                bg={'#c91f48'}>
                <Text
                  marginBottom={30}
                  textAlign={'center'}
                  fontWeight={'bold'}
                  fontSize={20}
                  color={'white'}>
                  Invalid barcode
                </Text>
                <TouchableOpacity onPress={() => setError(false)}>
                  <Block bg={'white'} width={'100px'} borderRadius={'15px'}>
                    <Text fontSize={18} textAlign={'center'} color={'#c91f48'}>
                      Close
                    </Text>
                  </Block>
                </TouchableOpacity>
              </Block>
            </Block>
          </Modal>
        )}
      </Block>
      <TouchableOpacity onPress={handleChangeScanning}>
        <Block
          bg={'transparent'}
          marginHorizontal={10}
          paddingVertical={'10px'}
          paddingHorizontal={'20px'}
          borderRadius={'5px'}
          alignSelf={'center'}
          marginBottom={10}
          marginTop={180}
          borderWidth={'1px'}
          borderColor={'#0d3d8c'}>
          <Text fontSize={18} color={'#0d3d8c'} textAlign={'center'}>
            {isScanning
              ? 'Pull the trigger to stop scanning a carton barcode.'
              : 'Pull the trigger to start scanning a carton barcode.'}
          </Text>
        </Block>
      </TouchableOpacity>
    </Block>
  );
};

export default BarcodeScanning;
