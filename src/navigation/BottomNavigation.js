import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {Platform} from 'react-native';
import Home from '../screens/Home';
import Profile from '../screens/pages/Profile';

const BottomNavigation = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#5168B6',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          display: 'flex',
          backgroundColor: '#fff',
          borderWidth: 0,
          height: Platform.OS === 'ios' ? 90 : 70,
          borderRadius: 20,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          position: 'absolute',
          bottom: 15,
          left: 20,
          right: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Metropolis-Regular',
          marginBottom: 5,
        },
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Rooms') {
            iconName = focused ? 'door' : 'door-closed';
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          } else if (route.name === 'Tenants') {
            iconName = focused ? 'people' : 'people-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Tickets') {
            iconName = focused ? 'ticket' : 'ticket-outline';

            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }
        },
      })}>
      <Tab.Screen
        name="Dashboard"
        component={Home}
        options={{
          tabBarLabel: 'Dashboard',
        }}
      />

      <Tab.Screen
        name="Rooms"
        component={Home}
        options={{
          tabBarLabel: 'Rooms',
        }}
      />
      <Tab.Screen
        name="Tenants"
        component={Home}
        options={{
          tabBarLabel: 'Tenants',
        }}
      />
      <Tab.Screen
        name="Tickets"
        component={Profile}
        options={{
          tabBarLabel: 'Tickets',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
