import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CredentialsContext = createContext();

export const CredentialsProvider = ({children}) => {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkLoginCredentials = async () => {
    try {
      const data = await AsyncStorage.getItem('pgOwnerCredentials');
      if (data !== null) {
        setCredentials(JSON.parse(data));
      }
      console.log('Credentials loaded:', data);
    } catch (e) {
      console.log('Error loading credentials', e);
    } finally {
      setLoading(false);
    }
  };

  const saveCredentials = async creds => {
    try {
      console.log('Saving credentials:', creds);
      await AsyncStorage.setItem('pgOwnerCredentials', JSON.stringify(creds));
      setCredentials(creds);
    } catch (e) {
      console.log('Error saving credentials', e);
    }
  };

  const clearCredentials = async () => {
    try {
      await AsyncStorage.removeItem('pgOwnerCredentials');
      setCredentials(null);
    } catch (e) {
      console.log('Error clearing credentials', e);
    }
  };

  useEffect(() => {
    checkLoginCredentials();
  }, []);

  return (
    <CredentialsContext.Provider
      value={{
        credentials,
        setCredentials: saveCredentials,
        clearCredentials,
        loading,
      }}>
      {children}
    </CredentialsContext.Provider>
  );
};
