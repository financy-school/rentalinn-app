import {createContext} from 'react';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const CredentialsContext = createContext({
  storedCredentials: {},
  setStoredCredentials: () => {},
});
export const CredentialsProvider = ({children}) => {
  const [credentials, setCredentials] = useState(null);
  const [loading, setLoading] = useState(true);
  const checkLoginCredentials = () => {
    AsyncStorage.getItem('financyCredentials')
      .then(data => {
        if (data !== null) {
          setCredentials(JSON.parse(data));
          setLoading(false);
        } else {
          setCredentials(null);
          setLoading(false);
        }
      })
      .catch(() => {
        console.log('error');
      });
  };
  return (
    <CredentialsContext.Provider
      value={{credentials, setCredentials, checkLoginCredentials, loading}}>
      {children}
    </CredentialsContext.Provider>
  );
};
