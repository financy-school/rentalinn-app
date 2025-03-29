import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';

import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import DrawerContent from '../screens/pages/Drawer';
import Home from '../screens/Home';

const Drawer = createDrawerNavigator();

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerShown: false,
        drawerPosition: 'left',
        drawerType: 'slide',
      })}>
      <Drawer.Screen name="BottomNavigation" component={BottomNavigation} />
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default DrawerStack;
