import * as React from 'react';
import {Colors} from '../components/styles';
const {primary, tertiary} = Colors;
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CredentialsContext} from '../context/CredentialsContext';
import SplashScreen from '../components/SplashScreen';
import DrawerStack from './DrawerNavigation';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const {credentials} = React.useContext(CredentialsContext);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTintColor: tertiary,
          headerTransparent: true,
          headerTitle: '',
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName={credentials ? 'DrawerStack' : 'Login'}>
        {credentials ? (
          <>
            <Stack.Screen
              options={{headerTintColor: primary}}
              name="DrawerStack"
              component={DrawerStack}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
