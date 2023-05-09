import React, {useState} from 'react';

import {Block} from '../styled/Block';
import Header from '../Components/Header';
import Article from '../Components/Article';
import IdTag from '../Components/IdTag';
import ChangeButton from '../Components/ChangeButton';
import SummaryHeader from '../Components/SummaryHeader';
import Carton from '../Components/Carton';
import Footer from '../Components/Footer';

const Summary = () => {
  const [activeButton, setActiveButton] = useState('Cartons');

  const handleActiveButtonChange = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <Block>
      <Header />
      <IdTag />
      <ChangeButton onButtonChange={handleActiveButtonChange} />
      <SummaryHeader
        title={activeButton === 'Articles' ? 'ARTICLE NO.' : 'CARTON NO.'}
      />
      {activeButton === 'Articles' ? (
        <>
          <Article />
        </>
      ) : (
        <Block justifyContent={'space-between'} height={'70%'}>
          <Carton />
          <Footer />
        </Block>
      )}
    </Block>
  );
};

export default Summary;
