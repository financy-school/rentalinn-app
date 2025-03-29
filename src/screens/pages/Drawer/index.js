import React, {useContext, useState} from 'react';
import {
  View,
  Pressable,
  Image,
  Dimensions,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {academicMenu, accountMenu, actionMenu, exploreMenu} from './constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SvgUri} from 'react-native-svg';
import {CredentialsContext} from '../../../components/CredentialsContext';

function DrawerContent(props) {
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {first_name, last_name, email, phone_number} = storedCredentials;
  const navigation = useNavigation();

  const [expandedMenus, setExpandedMenus] = useState({});

  const toggleExpand = label => {
    setExpandedMenus(prev => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = async () => {
    setStoredCredentials(null);
    await AsyncStorage.clear();
  };

  const LogoutCard = () => (
    <Pressable
      style={{flexDirection: 'row', alignItems: 'center', padding: 12}}
      onPress={handleLogout}>
      {/* <SvgUri
        uri={'https://cdn-icons-png.flaticon.com/512/1828/1828427.png'}
        style={{marginRight: 10}}
      /> */}

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828427.png',
        }}
        style={{
          width: 25,
          height: 25,
          marginRight: 10,
        }}
      />
      <Text style={{fontSize: 16, fontWeight: '600', color: '#333'}}>
        Logout
      </Text>
    </Pressable>
  );

  const ExpandableItem = ({item}) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus[item.label];

    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#FAFAFA',
            borderRadius: 8,
            padding: 12,
            marginVertical: 4,
            elevation: 3,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.1,
            shadowRadius: 5,
          }}
          onPress={() =>
            hasChildren
              ? toggleExpand(item.label)
              : navigation.navigate(item.route)
          }>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <SvgUri uri={item.icon} style={{marginRight: 12}} /> */}
            <Image
              source={{
                uri: item.icon,
              }}
              style={{
                width: 25,
                height: 25,
                marginRight: 12,
                borderColor: 'black',
              }}
              onError={e => console.log('Image Load Error:', e.nativeEvent)}
            />
            <Text style={{fontSize: 16, fontWeight: '500', color: '#333'}}>
              {item.label}
            </Text>
          </View>
          {hasChildren && (
            <Icon
              name={isExpanded ? 'chevron-up' : 'chevron-down'}
              size={18}
              color="#333"
            />
          )}
        </TouchableOpacity>

        {hasChildren && isExpanded && (
          <View style={{paddingLeft: 32, marginTop: 4}}>
            {item.children.map((subItem, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 8,
                }}
                onPress={() => navigation.navigate(subItem.route)}>
                {/* <SvgUri uri={subItem.icon} style={{marginRight: 12}} /> */}
                <Image
                  source={{
                    uri: subItem.icon,
                  }}
                  style={{width: 15, height: 15, marginRight: 12}}
                />
                <Text style={{fontSize: 14, color: '#555'}}>
                  {subItem.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
      <View
        style={{
          minHeight: Dimensions.get('screen').height - 100,
          justifyContent: 'space-between',
        }}>
        <SafeAreaView
          style={{
            backgroundColor: '#fff',
            padding: 16,
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 240, height: 52}}
            source={require('../../../assets/edumynd.png')}
            resizeMode="contain"
          />
          <View style={{marginTop: 12}}>
            <Text style={{fontSize: 22, fontWeight: '600', color: '#000'}}>
              {first_name} {last_name}
            </Text>
            {email && (
              <Text style={{fontSize: 14, color: '#666', marginTop: 4}}>
                {email.replace(/\%2B/g, '+')}
              </Text>
            )}
            {phone_number && (
              <Text style={{fontSize: 14, color: '#666'}}>
                +91 {phone_number}
              </Text>
            )}
          </View>
        </SafeAreaView>

        <View style={{padding: 16}}>
          {[...accountMenu, ...exploreMenu, ...actionMenu].map(
            (item, index) => (
              <ExpandableItem item={item} key={index} />
            ),
          )}

          <LogoutCard />
        </View>
      </View>
    </ScrollView>
  );
}

export default DrawerContent;
