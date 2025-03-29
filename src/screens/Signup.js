import React, {useState, useContext} from 'react';
import {StatusBar, View, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {TextInput, Button, Text, Snackbar, useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CredentialsContext} from '../components/CredentialsContext';
import {handleSchoolUserSignup} from '../services/NetworkUtils';
import KeyBoardAvoidingWrapper from '../components/KeyBoardAvoidingWrapper';

const SignUp = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const {setStoredCredentials} = useContext(CredentialsContext);
  const {colors} = useTheme();

  const handleSignup = async (credentials, setSubmitting) => {
    setMessage('');
    setVisible(false);

    try {
      const response = await handleSchoolUserSignup(credentials);
      const {user, message} = response;
      const token = 'Bearer';
      persistLogin({...user, token}, message, 'success');
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please check your network and try again.');
      setVisible(true);
    } finally {
      setSubmitting(false);
    }
  };

  const persistLogin = async (credentials, message) => {
    try {
      await AsyncStorage.setItem(
        'pgOwnerCredentials',
        JSON.stringify(credentials),
      );
      setMessage(message);
      setVisible(true);
      setStoredCredentials(credentials);
    } catch (error) {
      console.error('Persisting login failed', error);
      setMessage('Persisting login failed');
      setVisible(true);
    }
  };

  return (
    <KeyBoardAvoidingWrapper>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          padding: 20,
          position: 'relative',
        }}>
        <StatusBar barStyle="dark-content" />
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={{position: 'absolute', top: 20, left: 20, zIndex: 999}}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={30}
            color={colors.primary}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={80}
            color={colors.primary}
          />
          <Text variant="displayMedium" style={{color: colors.primary}}>
            Sign Up
          </Text>
        </View>

        <Formik
          initialValues={{
            fullName: '',
            phoneNumber: '',
            pgName: '',
            address: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, {setSubmitting}) =>
            handleSignup(values, setSubmitting)
          }>
          {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
            <>
              <TextInput
                label="Full Name"
                mode="outlined"
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                left={<TextInput.Icon icon="account" color={colors.primary} />}
                style={{marginTop: 15}}
              />
              <TextInput
                label="Phone Number"
                mode="outlined"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                keyboardType="phone-pad"
                left={<TextInput.Icon icon="phone" color={colors.primary} />}
                style={{marginTop: 15}}
              />
              <TextInput
                label="PG Name"
                mode="outlined"
                value={values.pgName}
                onChangeText={handleChange('pgName')}
                onBlur={handleBlur('pgName')}
                left={<TextInput.Icon icon="home" color={colors.primary} />}
                style={{marginTop: 15}}
              />
              <TextInput
                label="Address"
                mode="outlined"
                value={values.address}
                onChangeText={handleChange('address')}
                onBlur={handleBlur('address')}
                left={
                  <TextInput.Icon icon="map-marker" color={colors.primary} />
                }
                style={{marginTop: 15}}
              />
              <TextInput
                label="Email"
                mode="outlined"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                keyboardType="email-address"
                left={<TextInput.Icon icon="email" color={colors.primary} />}
                style={{marginTop: 15}}
              />

              <TextInput
                label="Password"
                mode="outlined"
                secureTextEntry={hidePassword}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                left={<TextInput.Icon icon="lock" color={colors.primary} />}
                right={
                  <TextInput.Icon
                    icon={hidePassword ? 'eye-off' : 'eye'}
                    onPress={() => setHidePassword(!hidePassword)}
                  />
                }
                style={{marginTop: 15}}
              />

              <TextInput
                label="Confirm Password"
                mode="outlined"
                secureTextEntry={hideConfirmPassword}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                left={<TextInput.Icon icon="lock" color={colors.primary} />}
                right={
                  <TextInput.Icon
                    icon={hideConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                  />
                }
                style={{marginTop: 15}}
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                loading={isSubmitting}
                style={{marginTop: 20}}>
                Sign Up
              </Button>

              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={{marginTop: 20, alignItems: 'center'}}>
                <Text
                  style={{
                    color: colors.primary,
                    textDecorationLine: 'underline',
                  }}>
                  Already have an account? Sign In
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <Snackbar
          visible={visible}
          onDismiss={() => setVisible(false)}
          duration={3000}>
          {message}
        </Snackbar>
      </View>
    </KeyBoardAvoidingWrapper>
  );
};

export default SignUp;
