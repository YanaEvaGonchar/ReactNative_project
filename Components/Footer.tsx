/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {FC, useState, useEffect} from 'react';
import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

const Footer: FC = () => {
  const [scanCount, setScanCount] = useState(0);
  const [error, setError] = useState(false);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (scanning) {
      interval = setInterval(() => {
        const random = Math.random();

        if (random < 0.5) {
          setScanCount(prevCount => prevCount + 1);
          setError(false);
        } else {
          setError(true);
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [scanning]);

  const handlePress = () => {
    if (scanCount >= 3 || error) {
      setScanning(false);
      setScanCount(0);
      setError(false);
    } else if (scanning) {
      setScanning(false);
    } else {
      setScanning(true);
    }
  };

  const getButtonColor = () => {
    if (error) {
      return '#c91f48';
    } else if (scanCount >= 3) {
      return '#36803f';
    } else {
      return 'white';
    }
  };

  const getButtonText = () => {
    if (error) {
      return 'Error';
    } else if (scanCount >= 3) {
      return 'Scanning was successful';
    } else if (scanning) {
      return `${scanCount} items scanned`;
    } else {
      return 'Pull the trigger to scan a carton barcode.';
    }
  };

  const getButtonTextColor = () => {
    if (error) {
      return 'white';
    } else {
      return '#0d3d8c';
    }
  };

  const getBorderColor = () => {
    if (error) {
      return '#c91f48';
    } else {
      return '#0d3d8c';
    }
  };

  return (
    <Block
      flexDirection={'row'}
      alignItems={'center'}
      alignSelf={'center'}
      width={'100%'}
      justifyContent={'center'}
      paddingVertical={'10px'}
      borderBottomColor={'grey'}
      borderBottomWidth={'0.5px'}
      borderTopColor={'grey'}
      borderTopWidth={'0.5px'}>
      <Button
        onPress={handlePress}
        width={'340px'}
        height={'70px'}
        borderColor={getBorderColor()}
        bg={getButtonColor()}
        borderWidth={'1px'}
        borderRadius={'5px'}
        justifyContent={'center'}
        paddingHorizontal={'50px'}
        alignItems={'center'}>
        <Text color={getButtonTextColor()} fontSize={18} textAlign={'center'}>
          {getButtonText()}
        </Text>
      </Button>
    </Block>
  );
};

export default Footer;
