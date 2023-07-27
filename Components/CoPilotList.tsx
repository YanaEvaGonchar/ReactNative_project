import React from 'react';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';

import AddButton from '../icons/add-button.svg';
import tasks from '../items/tasks';
import CoPilotTask from './CoPilotTask';
import CoPilotButton from './CoPilotButton';

const CoPilotList = () => {
  return (
    <Block
      paddingVertical={'15px'}
      paddingHorizontal={'8px'}
      alignItems={'center'}>
      <Block flexDirection={'row'}>
        <Block
          marginBottom={15}
          width={'100%'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Block>
            <Text fontWeight={'bold'} fontSize={16} color={'#1a1c1e'}>
              Create a New CoPilot
            </Text>
            <Text fontSize={16} color={'#72777f'}>
              Visual Schedules, Checklist, etc..
            </Text>
          </Block>
          <AddButton width={24} height={24} />
        </Block>
      </Block>
      <Block marginBottom={15} width={'100%'}>
        {tasks.map((task, index) => (
          <CoPilotTask
            key={task.id}
            photo={task.photo}
            Icon={task.icon}
            title={task.title}
            text={task.text}
          />
        ))}
      </Block>
      <CoPilotButton />
    </Block>
  );
};

export default CoPilotList;
