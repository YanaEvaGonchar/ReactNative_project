import React, {useState, useRef} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';
import {Image} from '../styled/Image';

import Play from '../icons/play.svg';
import Pause from '../icons/pause.svg';
import PlayForward from '../icons/play-forward.svg';
import PlayRewind from '../icons/play-rewind.svg';

import songs from '../items/songs';

const MediaPlayer = () => {
  const [pause, setPause] = useState(true);
  const [selectedTrack, setSelectedTrack] = useState(0);

  const currentSong = songs[selectedTrack];
  function onPlay() {
    setPause(false);
  }
  function onPause() {
    setPause(true);
  }
  function onNext() {
    setPause(true);
    if (selectedTrack === songs.length - 1) {
      setSelectedTrack(0);
    } else {
      setSelectedTrack(selectedTrack + 1);
    }
  }

  function onBack() {
    setPause(true);
    if (selectedTrack === 0) {
      setSelectedTrack(songs.length - 1);
    } else {
      setSelectedTrack(selectedTrack - 1);
    }
  }

  return (
    <Block flex={1} bg={'#0d3d8c'}>
      <Block marginTop={70} justifyContent={'center'} alignItems={'center'}>
        <Image
          resizeMode={'contain'}
          width={'300px'}
          height={'300px'}
          source={currentSong.artwork}
        />
      </Block>

      <Block
        marginTop={30}
        flexDirection={'column'}
        justifyContent={'space-around'}>
        <Block justifyContent={'center'} alignItems={'center'}>
          <Text fontSize={18} fontWeight={'bold'} color={'white'}>
            {currentSong.title}
          </Text>
          <Text fontSize={16} color={'white'}>
            {currentSong.artist}
          </Text>
        </Block>
      </Block>

      <Block
        flexDirection={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        marginTop={20}
        gap={40}>
        <Button onPress={onBack}>
          <PlayRewind width={30} height={30} />
        </Button>
        {pause ? (
          <Button onPress={onPlay}>
            <Play width={30} height={30} />
          </Button>
        ) : (
          <Button onPress={onPause}>
            <Pause width={30} height={30} />
          </Button>
        )}
        <Button onPress={onNext}>
          <PlayForward width={30} height={30} />
        </Button>
      </Block>

      <Video
        source={currentSong.url}
        paused={pause}
        audioOnly
        poster={currentSong.artwork.toString()}
      />
    </Block>
  );
};

export default MediaPlayer;
