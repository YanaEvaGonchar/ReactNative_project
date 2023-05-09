import React, {FC} from 'react';
import {Alert} from 'react-native';
import {useFormik} from 'formik';

import {Block} from '../styled/Block';
import {Text} from '../styled/Text';
import {Button} from '../styled/Button';

import RegistrationHeader from '../Components/RegistrationHeader';
import Form from '../Components/Form';
import ValidText from '../Components/ValidText';

const Registration: FC = () => {
  const formik = useFormik({
    initialValues: {email: '', password: ''},
    onSubmit: () => {
      Alert.alert('Successful login');
    },
    validate: values => {
      let errors = {};
      if (!values.email) {
        errors = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors = 'Invalid email address';
      }
      if (!values.password) {
        errors = 'Password is required';
      } else {
        if (values.password.length < 8) {
          errors = 'Password must be at least 8 characters long';
        }
        if (!/[a-zA-Z]/.test(values.password)) {
          errors = 'Password must include at least one letter';
        }
        if (!/\d/.test(values.password)) {
          errors = 'Password must include at least one number';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(values.password)) {
          errors = 'Password must include at least one special character';
        }
        if (/(.)\1{2,}/.test(values.password)) {
          errors = 'Password must not have more than two repeated characters';
        }
      }
      return errors;
    },
  });

  const handleLogin = async () => {
    if (Object.keys(formik.errors).length > 0) {
      Alert.alert('Please correct the invalid fields');
    } else {
      await formik.submitForm();
    }
  };

  const renderValidText = () => {
    const passwordValidations = [
      {
        key: 'Password must be at least 8 characters long',
        validation: () => formik.values.password.length >= 8,
      },
      {
        key: 'Password must include at least one number',
        validation: () => /\d/.test(formik.values.password),
      },
      {
        key: 'Password must include at least one letter',
        validation: () => /[a-zA-Z]/.test(formik.values.password),
      },
      {
        key: 'Password must include at least one special character',
        validation: () => /[!@#$%^&*(),.?":{}|<>]/.test(formik.values.password),
      },
      {
        key: 'Password must not have more than two repeated characters',
        validation: () => !/(.)\1{2,}/.test(formik.values.password),
      },
    ];

    return (
      <Block marginBottom={10} marginLeft={25}>
        {passwordValidations.map(({key, validation}) => (
          <ValidText key={key} isValid={validation()} text={key} />
        ))}
      </Block>
    );
  };

  return (
    <Block flex={1}>
      <RegistrationHeader />
      <Block flex={2} paddingHorizontal={'20px'} paddingTop={'5px'}>
        <Form
          header="EMAIL"
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          errorMessage={formik.touched.email && formik.errors.email}
        />
        <Form
          header="PASSWORD"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          onBlur={formik.handleBlur('password')}
          secureTextEntry={true}
          errorMessage={formik.touched.password && formik.errors.password}
        />
        <Block marginBottom={15}>{renderValidText()}</Block>
        <Block marginBottom={10}>
          <Button
            onPress={handleLogin}
            alignItems={'center'}
            justifyContent={'center'}
            bg={'#20336c'}
            width={'100%'}
            height={'35px'}>
            <Text color={'#fff'}>LOGIN</Text>
          </Button>
        </Block>
        <Block>
          <Button
            onPress={() => {}}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
            height={'35px'}>
            <Text color={'grey'}>FORGOT PASSWORD?</Text>
          </Button>
          <Text fontSize={8} textAlign={'center'}>
            2.3.19 (202012041745) - DEBUG
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default Registration;
