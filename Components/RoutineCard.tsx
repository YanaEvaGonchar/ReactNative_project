import React from 'react';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';

const RoutineCard = ({
  CardTitle,
  CardDay,
  CardTime,
  CardWeather,
  CardEdit,
  CardToggle,
  CardBackground,
  CardTextColor,
}) => {
  return (
    <Block
      borderWidth={'1px'}
      paddingVertical={'15px'}
      paddingHorizontal={'15px'}
      borderRadius={'20px'}
      bg={CardBackground}>
      <Text color={CardTextColor} fontSize={16} fontWeight={'bold'}>
        {CardTitle}
      </Text>
      <Block flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Block>
          <Text color={CardTextColor}>{CardDay}</Text>
          <Text color={CardTextColor}>{CardTime}</Text>
        </Block>
        <CardWeather width={49} height={41} />
      </Block>
      <Block flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <CardToggle width={45} height={24} />
        <CardEdit width={36} height={36} />
      </Block>
    </Block>
  );
};

export default RoutineCard;
