import React from 'react';

import {Block} from '../styled/Block';

import CardsField from '../Components/CardsField';
import CoPilotList from '../Components/CoPilotList';
const CoPilot = () => {
  return (
    <Block flex={1}>
      <CardsField />
      <CoPilotList />
    </Block>
  );
};

export default CoPilot;
