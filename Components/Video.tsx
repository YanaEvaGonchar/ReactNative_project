import React from 'react';
import YouTube from 'react-native-youtube';

import {Block} from '../styled/Block';

interface VideoProps {
  videoCode: string;
}

const Video: React.FC<VideoProps> = ({videoCode}) => {
  return (
    <Block>
      <YouTube
        videoId={videoCode}
        apiKey="AIzaSyDe5zCQnFs1xVeIorYi2QxqcZIPGo0nnr4"
        play
        fullscreen
        loop
        style={{alignSelf: 'center', height: 300, width: '100%'}}
      />
    </Block>
  );
};

export default Video;
