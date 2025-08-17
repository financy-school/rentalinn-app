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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CredentialsContext} from '../context/CredentialsContext';
import {ThemeContext} from '../context/ThemeContext'; // ⬅️ make sure this exists
import {handleUserLogin} from '../services/NetworkUtils';
import KeyBoardAvoidingWrapper from '../components/KeyBoardAvoidingWrapper';

const Login = ({navigation}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {setCredentials} = useContext(CredentialsContext);

  // theme contexts
  const {theme} = useTheme(); // your colors object
  const {theme: mode} = useContext(ThemeContext); // "light" | "dark"

  const isDark = mode === 'dark';

  // pick adaptive colors
  const backgroundColor = isDark
    ? theme.colors.backgroundDark
    : theme.colors.backgroundLight;

  const cardBackground = isDark ? theme.colors.light_black : theme.colors.white;

  const textPrimary = isDark ? theme.colors.white : theme.colors.textPrimary;
  const textSecondary = isDark
    ? theme.colors.light_gray
    : theme.colors.textSecondary;

  const onPrimary = theme.colors.white; // text/icon on top of primary
  const primary = theme.colors.primary;

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await handleUserLogin({email, password});
      const {user, accessToken} = response;
      console.log('Login Response:', response);
      setCredentials({...user, accessToken});
    } catch (error) {
      console.error('Login Error:', error);
      setErrorMessage('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyBoardAvoidingWrapper>
      <View style={{flex: 1, backgroundColor}}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundColor}
        />

        {/* Header Section */}
        <View
          style={{
            backgroundColor: primary,
            height: Dimensions.get('window').height * 0.4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={80}
            color={onPrimary}
          />
          <Text
            variant="headlineLarge"
            style={{
              color: onPrimary,
              fontWeight: 'bold',
              marginTop: 15,
            }}>
            Sign in to your Account
          </Text>
          <Text variant="bodyMedium" style={{color: onPrimary, marginTop: 10}}>
            Enter your email and password to log in
          </Text>
        </View>

        {/* Login Form Section */}
        <View style={{paddingHorizontal: 20, marginTop: -50}}>
          <Card style={{padding: 20, backgroundColor: cardBackground}}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              mode="outlined"
              left={<TextInput.Icon icon="email" />}
              theme={{
                colors: {
                  text: textPrimary,
                  placeholder: textSecondary,
                  primary: primary,
                  background: cardBackground,
                },
              }}
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
              theme={{
                colors: {
                  text: textPrimary,
                  placeholder: textSecondary,
                  primary: primary,
                  background: cardBackground,
                },
              }}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              style={{marginTop: 20}}
              buttonColor={primary}
              textColor={onPrimary}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  color: primary,
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
          action={{label: 'Dismiss', onPress: () => setErrorMessage('')}}
          style={{
            backgroundColor: isDark ? theme.colors.error : theme.colors.error,
          }}>
          {errorMessage}
        </Snackbar>
      </View>
    </KeyBoardAvoidingWrapper>
  );
};

export default Login;
