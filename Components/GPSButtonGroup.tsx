import React from 'react';

import {Block} from '../styled/Block';
import {Button} from '../styled/Button';
import {Text} from '../styled/Text';

interface Props {
  onStartTracking: () => void;
  onStopTracking: () => void;
  onShowRoutes: () => void;
}

const GPSButtonGroup: React.FC<Props> = ({
  onStartTracking,
  onStopTracking,
  onShowRoutes,
}) => {
  return (
    <Block
      position={'absolute'}
      bottom={'15px'}
      width={'100%'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      paddingHorizontal={'20px'}
      paddingVertical={'20px'}>
      <Button
        onPress={onStartTracking}
        paddingVertical={'10px'}
        paddingHorizontal={'10px'}
        borderRadius={'25px'}
        bg={'rgba(0, 0, 0, 0.5)'}>
        <Text color={'white'}>Start tracking</Text>
      </Button>
      <Button
        onPress={onShowRoutes}
        paddingVertical={'10px'}
        paddingHorizontal={'10px'}
        borderRadius={'25px'}
        bg={'rgba(0, 0, 0, 0.5)'}>
        <Text color={'#fff'}>Show routes</Text>
      </Button>
      <Button
        onPress={onStopTracking}
        paddingVertical={'10px'}
        paddingHorizontal={'10px'}
        borderRadius={'25px'}
        bg={'rgba(0, 0, 0, 0.5)'}>
        <Text color={'#fff'}>Stop tracking</Text>
      </Button>
    </Block>
  );
};

export default GPSButtonGroup;
