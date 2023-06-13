import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {Block} from '../styled/Block';

import VideoButton from '../Components/VideoButton';
import Video from '../Components/Video';

import videos from '../items/videos';
import VideoType from '../types/VideoType';

interface VideoPlayerProps {
  videos: VideoType[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = () => {
  const [videoStates, setVideoStates] = useState<boolean[]>(
    videos.map(() => false),
  );

  const handleVideoClick = (index: number) => {
    const updatedStates = [...videoStates];
    updatedStates[index] = !updatedStates[index];
    setVideoStates(updatedStates);
  };

  return (
    <ScrollView>
      <Block>
        {videos.map((video, index) => (
          <Block key={video.id}>
            <VideoButton
              videoName={video.name}
              handleVideoClick={() => handleVideoClick(index)}
              openVideo={videoStates[index]}
            />
            {videoStates[index] && (
              <Block>
                <Video videoCode={video.code} />
              </Block>
            )}
          </Block>
        ))}
      </Block>
    </ScrollView>
  );
};

export default VideoPlayer;
