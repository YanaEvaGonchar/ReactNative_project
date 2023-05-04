/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {FC} from 'react';
import {Block} from '../styled/Block';
import {Text} from '../styled/Text';

type Props = {
  title: string;
};

const SummaryHeader: FC<Props> = ({title}) => {
  return (
    <Block
      flexDirection={'row'}
      justifyContent={'space-between'}
      paddingHorizontal={'20px'}
      paddingVertical={'17px'}
      borderBottomColor={'grey'}
      borderBottomWidth={'1px'}>
      <Text color={'grey'}>{title}</Text>
      <Text color={'grey'}>ACT</Text>
    </Block>
  );
};

export default SummaryHeader;
