import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {ScrollView, Modal} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

import {ChartData} from '../types/ChartData';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  labelFontSize: 12,
  gridColor: 'rgba(0, 0, 0, 0.5)',
  gridOpacity: 1,
};

const Chart: React.FC = () => {
  const [countries, setCountries] = useState<ChartData[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ChartData | null>(
    null,
  );

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data: ChartData[] = await response.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCountries();
  }, []);

  const showCountryInfo = useCallback((country: ChartData) => {
    setSelectedCountry(country);
    setModalVisible(true);
  }, []);

  const countryData = useMemo(() => {
    return {
      datasets: [
        {
          data: countries.map(country => country?.population),
        },
      ],
    };
  }, [countries]);

  return (
    <Block>
      <ScrollView horizontal>
        <Block
          position="relative"
          width={`${countries.length * 100}px`}
          height="100%">
          <BarChart
            data={countryData}
            width={countries.length * 100}
            height={800}
            chartConfig={chartConfig}
            fromZero
            showBarTops={false}
            showValuesOnTopOfBars
            withHorizontalLabels={true}
            withInnerLines={true}
            withVerticalLabels={true}
            yAxisSuffix="k"
          />
        </Block>
        <Block
          position="absolute"
          flexDirection={'row'}
          bottom={'0'}
          left={'75'}
          height="100px"
          width={`${countries.length * 100}px`}>
          {countries.map((country, index) => (
            <Button
              key={country?.name?.common}
              onPress={() => showCountryInfo(country)}
              position="absolute"
              width={'100px'}
              height={'300px'}>
              <Text textDecorationLine={'underline'} color={'#0d328c'}>
                {country?.name?.common}
              </Text>
            </Button>
          ))}
        </Block>
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Block
          alignItems="center"
          justifyContent="center"
          marginTop={20}
          flex={1}>
          <Block
            marginHorizontal={20}
            marginVertical={20}
            bg="white"
            borderRadius="20px"
            paddingHorizontal={'35px'}
            paddingVertical={'35px'}
            alignItems="center"
            shadowColor="#000"
            shadowOpacity={0.2}
            shadowRadius={5}>
            <Text
              color={'#0d328c'}
              fontSize={16}
              fontWeight={'bold'}
              marginBottom={15}
              textAlign="center">
              {selectedCountry?.name?.common}
            </Text>
            <Text fontSize={16} marginBottom={25} textAlign="center">
              Population: {selectedCountry?.population} people
            </Text>
            <Button
              onPress={() => setModalVisible(false)}
              bg="#0d3d8c"
              borderRadius="20px"
              paddingHorizontal="10px"
              paddingVertical="10px"
              elevation={2}
              width="100px">
              <Text color="white" fontWeight="bold" textAlign="center">
                Close
              </Text>
            </Button>
          </Block>
        </Block>
      </Modal>
    </Block>
  );
};

export default Chart;
