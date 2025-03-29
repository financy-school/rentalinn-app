import React, {useState, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import RootStack from './src/navigation/RootStack';
import {CredentialsContext} from './src/components/CredentialsContext';

import {Provider as PaperProvider} from 'react-native-paper';
import {darkTheme, lightTheme} from './src/theme/theme';

export default function App() {
  const [storedCredentials, setStoredCredentials] = useState(null);

  const colorScheme = useColorScheme();

  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  useEffect(() => {
    const checkLoginCredentials = async () => {
      try {
        const data = await AsyncStorage.getItem('financyCredentials');
        if (data !== null) {
          setStoredCredentials(JSON.parse(data));
        } else {
          setStoredCredentials(null);
        }
      } catch (error) {
        console.log('error');
      }
    };

    checkLoginCredentials();
    SplashScreen.hide();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <CredentialsContext.Provider
        value={{storedCredentials, setStoredCredentials}}>
        <RootStack />
      </CredentialsContext.Provider>
    </PaperProvider>
  );
}
