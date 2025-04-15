import {Colors} from '../components/styles';
const {primary, tertiary} = Colors;
import Login from '../screens/Login';
import SignUp from '../screens/Signup';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CredentialsContext} from '../context/CredentialsContext';
import SplashScreen from '../components/SplashScreen';
import DrawerStack from './DrawerNavigation';
import {useContext, useEffect, useState} from 'react';
import RentDetails from '../screens/RentDetails';
import RoomDetails from '../screens/RoomDetails';
import TenantDetails from '../screens/TenantDetails';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {credentials} = useContext(CredentialsContext);

  useEffect(() => {
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

            <Stack.Screen
              options={{
                headerTintColor: primary,
                headerShown: true,
                headerTitle: 'Settings',
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#ffffff',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: primary,
                },
                headerLeftContainerStyle: {
                  paddingLeft: 20,
                },
                headerRightContainerStyle: {
                  paddingRight: 20,
                },
                headerShadowVisible: false,
                headerBackTitleVisible: false,
                headerBackButtonMenuEnabled: true,
                headerBackTitle: 'Back',
                headerBackButtonMenuVisible: true,
                headerBackButtonVisible: true,
                headerBackButtonPressColor: primary,
                headerBackButtonPressOpacity: 0.8,
                headerBackButtonPressRippleColor: primary,
                headerBackButtonPressRippleOpacity: 0.8,
                headerBackButtonPressRippleRadius: 20,
                headerBackButtonPressRippleColorAndroid: primary,
              }}
              name="Settings"
              component={RentDetails}
            />

            <Stack.Screen
              options={{
                headerTintColor: primary,
                headerShown: true,
                headerBackButtonVisible: true,
                headerBackButtonPressColor: primary,
                headerBackButtonPressOpacity: 0.8,
                headerBackButtonPressRippleColor: primary,
                headerBackButtonPressRippleOpacity: 0.8,
                headerBackButtonPressRippleRadius: 20,
                headerBackButtonPressRippleColorAndroid: primary,
              }}
              name="RoomDetails"
              component={RoomDetails}
            />

            <Stack.Screen
              options={{
                headerShown: true,
                headerTitle: 'Profile',
                headerTintColor: primary,
                headerTitleAlign: 'center',
                headerBackButtonVisible: true,
                headerBackButtonPressColor: primary,
                headerBackButtonPressOpacity: 0.8,
                headerBackButtonPressRippleColor: primary,
                headerBackButtonPressRippleOpacity: 0.8,
                headerBackButtonPressRippleRadius: 20,
                headerBackButtonPressRippleColorAndroid: primary,
              }}
              name="TenantDetails"
              component={TenantDetails}
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
