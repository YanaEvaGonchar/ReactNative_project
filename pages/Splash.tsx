import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';

import {Block} from '../styled/Block';

import Cart from '../icons/cart.svg';

interface SplashScreenProps {
  onAnimationFinish: () => void;
}

const Splash: React.FC<SplashScreenProps> = ({onAnimationFinish}) => {
  useEffect(() => {
    setTimeout(() => {
      onAnimationFinish();
    }, 3000);
  }, [onAnimationFinish]);

  return (
    <Block
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      bg={'#0d3d8c'}>
      <Cart height={60} width={60} marginBottom={80} />
      <LottieView
        source={require('../icons/assets/lf20_yn8lqib7.json')}
        autoPlay
        loop
        onAnimationFinish={onAnimationFinish}
        speed={1}
      />
    </Block>
  );
};

export default Splash;
