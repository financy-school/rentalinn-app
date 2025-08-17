import React, {useState, useContext} from 'react';
import {StatusBar, View, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import {TextInput, Button, Text, Snackbar, useTheme} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CredentialsContext} from '../context/CredentialsContext';
import {handleUserSignup} from '../services/NetworkUtils';
import KeyBoardAvoidingWrapper from '../components/KeyBoardAvoidingWrapper';
import {Image} from 'react-native';

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
      delete credentials.confirmPassword;
      const response = await handleUserSignup(credentials);
      const {user, message} = response;
    } catch (error) {
      let errorMessage =
        'An error occurred. Please check your network and try again.';

      if (error.response && error.response.data) {
        if (error.response.data.message) {
          if (Array.isArray(error.response.data.message)) {
            errorMessage = error.response.data.message.join(', ');
          } else {
            errorMessage = error.response.data.message;
          }
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        }
      }
      setMessage(errorMessage);
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
          {/* <MaterialCommunityIcons
            name="home-city-outline"
            size={80}
            color={colors.primary}
          /> */}

          <Image
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              borderRadius: 50,
            }}
            source={require('../assets/rentalinn.png')}
            resizeMode="contain"
          />
          <Text variant="displayMedium" style={{color: colors.primary}}>
            Sign Up
          </Text>
        </View>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'landlord',
            phone: '',
            address: '',
            city: '',
            state: '',
            postalCode: '',
            country: '',
          }}
          onSubmit={(values, {setSubmitting}) =>
            handleSignup(values, setSubmitting)
          }>
          {({handleChange, handleBlur, handleSubmit, values, isSubmitting}) => (
            <View style={{marginBottom: 20}}>
              <TextInput
                label="First Name"
                mode="outlined"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                left={<TextInput.Icon icon="account" color={colors.primary} />}
                style={{marginTop: 15}}
              />

              <TextInput
                label="Last Name"
                mode="outlined"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                left={<TextInput.Icon icon="account" color={colors.primary} />}
                style={{marginTop: 15}}
              />

              <TextInput
                label="Phone Number"
                mode="outlined"
                value={values.phone}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                keyboardType="phone-pad"
                left={<TextInput.Icon icon="phone" color={colors.primary} />}
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
                label="City"
                mode="outlined"
                value={values.city}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                left={<TextInput.Icon icon="city" color={colors.primary} />}
                style={{marginTop: 15}}
              />

              <TextInput
                label="State"
                mode="outlined"
                value={values.state}
                onChangeText={handleChange('state')}
                onBlur={handleBlur('state')}
                left={<TextInput.Icon icon="map" color={colors.primary} />}
                style={{marginTop: 15}}
              />

              <TextInput
                label="Postal Code"
                mode="outlined"
                value={values.postalCode}
                onChangeText={handleChange('postalCode')}
                onBlur={handleBlur('postalCode')}
                keyboardType="numeric"
                left={
                  <TextInput.Icon icon="code-brackets" color={colors.primary} />
                }
                style={{marginTop: 15}}
              />

              <TextInput
                label="Country"
                mode="outlined"
                value={values.country}
                onChangeText={handleChange('country')}
                onBlur={handleBlur('country')}
                left={<TextInput.Icon icon="flag" color={colors.primary} />}
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
            </View>
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
