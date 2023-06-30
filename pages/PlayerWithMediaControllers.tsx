import React, {useEffect, useState} from 'react';
import TrackPlayer, {
  useProgress,
  Capability,
  useTrackPlayerEvents,
  Event,
  State,
  RepeatMode,
} from 'react-native-track-player';
import {StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

import Play from '../icons/play.svg';
import Pause from '../icons/pause.svg';
import SkipBackward from '../icons/skip-backward.svg';
import SkipForward from '../icons/skip-forward.svg';
import Volume from '../icons/volume.svg';
import VolumeOff from '../icons/volume-off.svg';

const PlayerWithMediaControllers = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    setupPlayer();
  }, []);

  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToPrevious,
        Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
    await TrackPlayer.add([
      {
        id: '1',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        title: 'Spy vs. Spy - Chill-out Acid Squeeze Mix',
        artist: 'T. Schürger',
        artwork: require('../media/covers/cover-1.jpg'),
      },
      {
        id: '2',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        title: 'The Stationary Ark - Low pH Arktic Clubmix',
        artist: 'T. Schürger',
        artwork: require('../media/covers/cover-2.jpg'),
      },
      {
        id: '3',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        title: 'SoundHelix Song 3',
        artist: 'T. Schürger',
        artwork: require('../media/covers/cover-3.jpg'),
      },
    ]);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  };

  useEffect(() => {
    setTrackInfo();
  }, []);

  useTrackPlayerEvents([Event.PlaybackTrackChanged], event => {
    if (event.state == State.nextTrack) {
      setTrackInfo();
    }
  });

  async function setTrackInfo() {
    const track = await TrackPlayer.getCurrentTrack();
    const info = await TrackPlayer.getTrack(track);
    setInfo(info);
  }

  const startPlayback = async () => {
    await TrackPlayer.play();
    setIsPlaying(true);
  };

  const pausePlayback = async () => {
    await TrackPlayer.pause();
    setIsPlaying(false);
  };

  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };

  const {position, duration} = useProgress();

  return (
    <Block flex={1} bg={'#ff75fd'}>
      <Block alignItems={'center'} top={'120px'}>
        <Block marginBottom={15}>
          {isPlaying ? (
            <Volume height={180} width={180} />
          ) : (
            <VolumeOff height={180} width={180} />
          )}
        </Block>
        <Block
          marginBottom={15}
          justifyContent={'center'}
          alignItems={'center'}
          gap={5}>
          <Text fontSize={16}>{info.title}</Text>
          <Text>{info.artist}</Text>
        </Block>
        <Block flexDirection={'row'} gap={40}>
          <Button onPress={skipToPrevious}>
            <SkipBackward height={40} width={40} />
          </Button>

          {isPlaying ? (
            <Button onPress={pausePlayback}>
              <Pause height={40} width={40} />
            </Button>
          ) : (
            <Button onPress={startPlayback}>
              <Play height={40} width={40} />
            </Button>
          )}

          <Button onPress={skipToNext}>
            <SkipForward height={40} width={40} />
          </Button>
        </Block>
        <Slider
          style={style.progressBar}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          thumbTintColor="#000"
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#fff"
          onSlidingComplete={async value => {
            await TrackPlayer.seekTo(value);
          }}
        />
        <Block
          flexDirection={'row'}
          width={'320px'}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <Text>{Math.round(position)}s</Text>
          <Text>{Math.round(duration)}s</Text>
        </Block>
      </Block>
    </Block>
  );
};

const style = StyleSheet.create({
  progressBar: {
    width: 350,
    height: 40,
    marginTop: 25,
    flexDirection: 'row',
  },
});

export default PlayerWithMediaControllers;
