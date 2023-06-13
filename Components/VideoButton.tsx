import React from 'react';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

import VideoOpen from '../icons/video-open.svg';
import VideoClose from '../icons/video-close.svg';

interface VideoButtonProps {
  videoName: string;
  handleVideoClick: () => void;
  openVideo: boolean;
}

const VideoButton: React.FC<VideoButtonProps> = ({
  videoName,
  handleVideoClick,
  openVideo,
}) => {
  return (
    <Block
      justifyContent={'space-between'}
      paddingHorizontal={'30px'}
      paddingVertical={'15px'}
      bg={'silver'}
      width={'100%'}
      flexDirection={'row'}>
      <Text fontSize={18}>{videoName}</Text>
      {openVideo ? (
        <Button onPress={handleVideoClick}>
          <VideoClose width={20} height={20} />
        </Button>
      ) : (
        <Button onPress={handleVideoClick}>
          <VideoOpen width={20} height={20} />
        </Button>
      )}
    </Block>
  );
};

export default VideoButton;
