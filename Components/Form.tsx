import React, {FC, useState} from 'react';

import styled from 'styled-components/native';

import {Block} from '../styled/Block';
import {Button} from '../styled/Button';
import {Text} from '../styled/Text';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  Platform,
  TextInputChangeEventData,
  TextInputProps,
} from 'react-native';
import {PaddingTypes} from '../types/PaddingTypes';
import {PaddingStyle} from '../styled/PaddingStyle';

import OpenEye from '../icons/open-eye.svg';
import ClosedEye from '../icons/closed-eye.svg';

type TextInput = {
  header: string;
  width?: string;
  color?: string;
  value?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  bg?: string;
  onChangeText: (textValue: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  paddingHorizontal?: string;
  paddingVertical?: string;
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  onBlur?: (event: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  errorMessage?: string | false | undefined;
} & PaddingTypes;

const StyledSimpleInput = styled.TextInput<Omit<TextInput, 'header'>>`
  width: ${({width}): string | undefined => `${width || '100%'}`};
  ${({fontWeight}): string | undefined =>
    fontWeight && `font-weight: ${fontWeight}`};
  color: ${({color}): string => color || 'black'};
  background-color: ${({bg}): string => bg || 'transparent'};
  font-size: ${({fontSize}): string => fontSize || '14px'};
  font-family: ${({fontFamily}): string => fontFamily || 'Helvetica'};
  ${({paddingHorizontal}): string | undefined =>
    paddingHorizontal && `padding-horizontal: ${paddingHorizontal}`};
  ${({paddingVertical}): string | undefined =>
    paddingVertical && `padding-vertical: ${paddingVertical}`};
  ${PaddingStyle};
`;
const isIos = Platform.OS === 'ios';

const Form: FC<TextInput> = ({
  onChangeText,
  value,
  header,
  isLoading,
  keyboardType,
  secureTextEntry,
  autoCapitalize,
  ...rest
}) => {
  const [isTextHidden, setIsTextHidden] = useState(secureTextEntry);

  const toggleSecureText = () => {
    setIsTextHidden(!isTextHidden);
  };

  return (
    <Block
      flexDirection={'column'}
      bg={'white'}
      height={'60px'}
      marginBottom={20}
      borderBottomWidth={'0.5px'}
      borderBottomColor={'grey'}
      paddingTop={'10px'}
      paddingBottom={'10px'}>
      <Block
        paddingHorizontal={'8px'}
        flexDirection={'row'}
        alignItems={'center'}>
        <Text marginRight={8} fontSize={15} fontWeight={'500'} color={'grey'}>
          {header}
        </Text>
        {isLoading && <ActivityIndicator size={'small'} />}
      </Block>
      <Block
        flexDirection={'row'}
        paddingLeft={isIos ? '8px' : '6px'}
        paddingRight={'8px'}
        paddingBottom={isIos ? '12px' : ''}
        paddingTop={isIos ? '9px' : ''}>
        <StyledSimpleInput
          value={value}
          fontSize={isIos ? '17px' : '15px'}
          fontWeight={'400'}
          paddingRight={25}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isTextHidden}
          autoCapitalize={autoCapitalize}
          {...rest}
        />
        {secureTextEntry && (
          <Block
            height={'100%'}
            right={'10px'}
            position={'absolute'}
            top={Platform.OS === 'ios' ? '8px' : '0px'}>
            <Button
              height={'100%'}
              justifyContent={'center'}
              onPress={toggleSecureText}>
              {isTextHidden ? (
                <ClosedEye width={20} height={20} />
              ) : (
                <OpenEye width={20} height={20} />
              )}
            </Button>
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default Form;
