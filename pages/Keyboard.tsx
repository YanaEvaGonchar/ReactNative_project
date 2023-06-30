import React, {useRef} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';
import {Block} from '../styled/Block';
import FormField from '../Components/FormField';

const Keyboard = () => {
  const [inputFields, setInputFields] = React.useState(
    Array.from({length: 10}).map(() => ({
      value: '',
      onFocus: false,
    })),
  );
  const scrollViewRef = useRef(null);

  const handleInputChange = (index: number, value: string) => {
    const newInputFields = [...inputFields];
    newInputFields[index].value = value;
    setInputFields(newInputFields);
  };

  const handleInputFocus = (index: number) => {
    const newInputFields = inputFields.map((field, i) => ({
      ...field,
      onFocus: i === index,
    }));
    setInputFields(newInputFields);
    const inputFieldPosition = index * 90;
    scrollViewRef.current.scrollTo({y: inputFieldPosition, animated: true});
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={105}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContentContainer}
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}>
          {inputFields.map((field, index) => (
            <Block
              borderWidth={field.onFocus ? '2px' : '0'}
              borderColor={'grey'}
              paddingHorizontal={'10px'}
              height={'90px'}
              borderRadius={'10px'}>
              <FormField
                key={index}
                header={`${index + 1} form field:`}
                value={field.value}
                onChangeText={text => handleInputChange(index, text)}
                placeholder="Enter text here"
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => handleInputFocus(index)}
              />
            </Block>
          ))}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContentContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Keyboard;
