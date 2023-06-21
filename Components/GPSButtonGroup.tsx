import React from 'react';
import {Block} from '../styled/Block';
import {Button} from '../styled/Button';
import {Text} from '../styled/Text';

interface Props {
  startTracking: () => void;
  stopTracking: () => void;
  showPath: () => void;
  isPathOnScreen: boolean;
}

const GPSButtonGroup: React.FC<Props> = ({
  startTracking,
  stopTracking,
  showPath,
  isPathOnScreen,
}) => {
  return (
    <Block
      flexDirection={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingHorizontal={'20px'}
      paddingVertical={'20px'}>
      <Button
        onPress={startTracking}
        paddingVertical={'10px'}
        paddingHorizontal={'10px'}
        borderRadius={'15px'}
        borderColor={'black'}
        borderWidth={'1px'}
        bg={'silver'}>
        <Text color={'black'}>Start Tracking</Text>
      </Button>
      <Button
        onPress={showPath}
        paddingVertical={'10px'}
        paddingHorizontal={'10px'}
        borderRadius={'15px'}
        borderColor={'black'}
        borderWidth={'1px'}
        bg={'silver'}>
        {isPathOnScreen ? (
          <Text color={'black'}>Close Path</Text>
        ) : (
          <Text color={'black'}>Show Path</Text>
        )}
      </Button>
      <Button
        onPress={stopTracking}
        paddingVertical={'10px'}
        paddingHorizontal={'10px'}
        borderRadius={'15px'}
        borderColor={'black'}
        borderWidth={'1px'}
        bg={'silver'}>
        <Text color={'black'}>Stop Tracking</Text>
      </Button>
    </Block>
  );
};

export default GPSButtonGroup;
