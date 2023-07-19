import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  TextInput,
  StyleSheet,
  PanResponder,
  Vibration,
  Alert,
} from 'react-native';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';

const Calculator = () => {
  const [currentValue, setCurrentValue] = useState('');
  const [calculation, setCalculation] = useState('');
  const [lastCalculation, setLastCalculation] = useState('');
  const [result, setResult] = useState('');
  const [showCalculation, setShowCalculation] = useState(true);
  const [isNewNumberEntered, setIsNewNumberEntered] = useState(false);
  const inputRef = useRef(null);

  const handleGesture = (gesture) => {
    const {dx, dy} = gesture;

    if (!showCalculation || isNewNumberEntered) {
      if (dy < -50) {
        updateCalculation(' * ');
      } else if (dy > 50) {
        updateCalculation(' / ');
      } else if (dx > 50) {
        updateCalculation(' + ');
      } else if (dx < -50) {
        updateCalculation(' - ');
      }
      inputRef.current.clear();
    }
  };

  const updateCalculation = (operator) => {
    if (currentValue !== '') {
      if (showCalculation) {
        setCalculation(
          prevCalculation => prevCalculation + currentValue + operator,
        );
      } else {
        setCalculation('');
        setCurrentValue('');
      }
      setShowCalculation(true);
      setIsNewNumberEntered(false);
      Vibration.vibrate(50);
    }
  };

  const handleShake = () => {
    setCalculation(prevCalculation => {
      const lastChar = prevCalculation.slice(-1);
      const updatedCalculation = prevCalculation.slice(0, -1 - lastChar.length);

      setCurrentValue(prevValue => (prevValue === lastChar ? '' : prevValue));

      return updatedCalculation;
    });
  };

  const handleTripleTap = () => {
    setCalculation('');
    setCurrentValue('');
    setResult('');
    setShowCalculation(true);
    setIsNewNumberEntered(false);
    inputRef.current.clear();
  };

  const calculateResult = () => {
    try {
      const result = eval(calculation + currentValue);
      if (isNaN(result) || !isFinite(result)) {
        Alert.alert('Warning', 'Division by zero is not possible.');
        setResult('');
      } else {
        setResult(
          hasDecimalPlaces(result) ? result.toFixed(2) : result.toString(),
        );
        setLastCalculation(calculation);
        setShowCalculation(false);
      }
    } catch (error) {
      setResult('');
    } finally {
      setCurrentValue('');
      setIsNewNumberEntered(false);
    }
  };

  const hasDecimalPlaces = (number) => {
    const decimalPart = number.toString().split('.')[1];
    return decimalPart && decimalPart.length > 2;
  };

  const handleInputChange = (text) => {
    setCurrentValue(text.replace(/[^0-9.]/g, ''));
    setIsNewNumberEntered(true);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => showCalculation,
    onPanResponderMove: (_, gesture) => handleGesture(gesture),
  });

  return (
    <Block
      flex={1}
      alignItems={'center'}
      paddingVertical={'25px'}
      {...panResponder.panHandlers}>
      {showCalculation && (
        <Text fontSize={24} marginBottom={20}>
          {calculation}
        </Text>
      )}
      {result !== '' && (
        <Text fontSize={28} marginBottom={20} fontWeight={'bold'}>
          {result}
        </Text>
      )}
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={currentValue}
        onChangeText={handleInputChange}
        keyboardType="numeric"
      />
      <Block flexDirection={'row'} gap={10}>
        <TouchableOpacity
          style={styles.button}
          onPress={calculateResult}
          disabled={!calculation || currentValue === ''}>
          <Text fontSize={16} fontWeight={'bold'}>
            Finish
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleShake}
          disabled={!calculation || showCalculation}>
          <Text fontSize={16} fontWeight={'bold'}>
            Clear Last
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleTripleTap}
          disabled={!calculation || showCalculation}>
          <Text fontSize={16} fontWeight={'bold'}>
            Reset
          </Text>
        </TouchableOpacity>
      </Block>
    </Block>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default Calculator;
