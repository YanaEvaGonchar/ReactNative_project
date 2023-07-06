import React from 'react';
import {Modal, FlatList, TouchableOpacity} from 'react-native';

import {Block} from '../styled/Block';
import {Button} from '../styled/Button';
import {Text} from '../styled/Text';

import {Route} from '../types/Route';

interface Props {
  isRoutesVisible: boolean;
  onClose: () => void;
  routes: Route[];
  onRouteSelect: (selectedRoute: Route) => void;
  onRouteDelete: (routeId: string) => void;
}

const Routes: React.FC<Props> = ({
  isRoutesVisible,
  onClose,
  routes,
  onRouteSelect,
  onRouteDelete,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isRoutesVisible}
      onRequestClose={onClose}>
      <Block marginTop={80} justifyContent={'center'} alignItems={'center'}>
        <Block
          bg={'white'}
          justifyContent={'center'}
          alignItems={'center'}
          width={'300px'}
          height={'500px'}
          marginVertical={100}
          paddingVertical={'20px'}
          paddingHorizontal={'20px'}
          borderRadius={'10px'}>
          <FlatList
            data={routes}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <Block
                flexDirection="row"
                alignItems="center"
                justifyContent={'space-between'}>
                <TouchableOpacity onPress={() => onRouteSelect(item)}>
                  <Text>{item.startTime.toISOString()}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onRouteDelete(item.id)}>
                  <Text color={'red'} marginLeft={15}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </Block>
            )}
          />
          <Button
            borderRadius={'20px'}
            paddingHorizontal={'20px'}
            paddingVertical={'5px'}
            bg={'silver'}
            onPress={onClose}>
            <Text>Close</Text>
          </Button>
        </Block>
      </Block>
    </Modal>
  );
};

export default Routes;
