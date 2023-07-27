import React from 'react';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';

import RoutineCard from './RoutineCard';

import LightEdit from '../icons/light-edit.svg'
import LightToggle from '../icons/light-toggle.svg'
import LightWeather from '../icons/light-weather.svg'
import DarkEdit from '../icons/dark-edit.svg'
import DarkWeather from '../icons/dark-weather.svg'
import DarkToggle from '../icons/dark-toggle.svg'

const CardsField = () => {
  return (
    <Block
      flexDirection={'row'}
      gap={5}
      paddingVertical={'15px'}
      paddingHorizontal={'8px'}
      borderBottomWidth={'1px'}
      borderBottomColor={'#e0e0e0'}>
      <Block flex={1}>
        <RoutineCard
          CardTextColor={'black'}
          CardTitle={'Morning Routine'}
          CardDay={'Weekday'}
          CardTime={'7:00 AM'}
          CardWeather={LightWeather}
          CardEdit={LightEdit}
          CardToggle={LightToggle}
          CardBackground={'#9fb9eb'}
        />
      </Block>
      <Block flex={1}>
        <RoutineCard
          CardTextColor={'white'}
          CardTitle={'Night Routine'}
          CardDay={'Everyday'}
          CardTime={'9:00 PM'}
          CardWeather={DarkWeather}
          CardEdit={DarkEdit}
          CardToggle={DarkToggle}
          CardBackground={'#182545'}
        />
      </Block>
    </Block>
  );
};

export default CardsField;
