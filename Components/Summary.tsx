import React, {useState} from 'react';

import {Block} from '../styled/Block';
import Header from './Header';
import Article from './Article';
import IdTag from './IdTag';
import ChangeButton from './ChangeButton';
import SummaryHeader from './SummaryHeader';
import Carton from './Carton';
import Footer from './Footer';

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
        <Block justifyContent={'space-between'}
               height={'70%'}>
          <Carton />
          <Footer title={'Pull the trigger to scan a carton barcode.'} />
        </Block>
      )}
    </Block>
  );
};

export default Summary;
