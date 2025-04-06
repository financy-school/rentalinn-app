import React, {useState, useContext} from 'react';
import {StatusBar, Dimensions, View, TouchableOpacity} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Snackbar,
  Card,
  useTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CredentialsContext} from '../context/CredentialsContext';
import {handleSchoolUserLogin} from '../services/NetworkUtils';
import KeyBoardAvoidingWrapper from '../components/KeyBoardAvoidingWrapper';

const Login = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {setCredentials} = useContext(CredentialsContext);
  const {colors} = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await handleSchoolUserLogin({email, password});

      const token = 'Bearer';

      console.log('Login Response:', response);
      setCredentials({...response, token});
    } catch (error) {
      console.error('Login Error:', error);
      console.error('Login Error:', JSON.stringify(error));
      setErrorMessage('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyBoardAvoidingWrapper>
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <StatusBar
          barStyle={
            colors.background === '#F8F9FA' ? 'dark-content' : 'light-content'
          }
        />

        {/* Header Section */}
        <View
          style={{
            backgroundColor: colors.primary,
            height: Dimensions.get('window').height * 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={80}
            color={colors.onPrimary}
          />
          <Text
            variant="headlineLarge"
            style={{
              color: colors.onPrimary,
              fontWeight: 'bold',
              marginTop: 15,
            }}>
            Sign in to your Account
          </Text>
          <Text
            variant="bodyMedium"
            style={{color: colors.onPrimary, marginTop: 10}}>
            Enter your email and password to log in
          </Text>
        </View>

        {/* Login Form Section */}
        <View style={{paddingHorizontal: 20, marginTop: -50}}>
          <Card style={{padding: 20}}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={hidePassword}
              mode="outlined"
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={hidePassword ? 'eye-off' : 'eye'}
                  onPress={() => setHidePassword(!hidePassword)}
                />
              }
              style={{marginTop: 15}}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              style={{marginTop: 20}}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  color: colors.primary,
                  marginTop: 20,
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                }}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </Card>
        </View>

        {/* Error Message */}
        <Snackbar
          visible={!!errorMessage}
          onDismiss={() => setErrorMessage('')}
          action={{label: 'Dismiss', onPress: () => setErrorMessage('')}}>
          {errorMessage}
        </Snackbar>
      </View>
    </KeyBoardAvoidingWrapper>
  );
};

export default Login;
