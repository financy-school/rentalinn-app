import React, {useCallback, useContext, useRef, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Chip,
  Menu,
  Text,
  useTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from '../context/ThemeContext';
import StandardText from '../components/StandardText/StandardText';
import StandardCard from '../components/StandardCard/StandardCard';
import Gap from '../components/Gap/Gap';

const RoomDetails = ({navigation, route}) => {
  const {theme: mode} = useContext(ThemeContext);
  const theme = useTheme();
  const {room} = route.params;
  console.log('Bed Details:', room);

  const scrollX = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;

  const images = [
    'https://media-hosting.imagekit.io/c4a5665e008c4fbe/kam-idris-_HqHX3LBN18-unsplash.jpg?Expires=1839138745&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=yUULa32ynOWsyruAkfKgaSajINzJxq-0~IlHfzLhi3EsN1pnU~WGZ2pYYY6L6G9YYLp-LEEp-d-sAc~aL9FgIXNMSyL48stJRDHt0Q6E9CcUiPD8zbpH6h7ZYosy8ECEAB4Cg0BOaMhJVaOIjkfp7pyU8o1cw2FvfB21Bmfx~xqp4B~I9WTFS-vxfkF~0haqQUFL1wkLS9h~4Z15Ler1FCPIVgpirrH2p9471DPnEoZr7xodHlxaY7TVrvqkS-tJKahBlr2xNsJBYg4OSm1ApYxlfZTR66Wg7IYGR8oiHLHlcTCBP4udPqGhJ5-WWjh7CxDYZOjZ4bkK5OTBjqB3Ig__',
    'https://media-hosting.imagekit.io/683e986cb4b74d23/christopher-jolly-GqbU78bdJFM-unsplash.jpg?Expires=1839138745&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=qqQxVc2ZMgpl3EE6vqkFEs9DmpiGWHLNr939J~JXBeHl1BgnG7DoP9icHDdtRChgrjX~6eAW-UIQNOcI-olTEQTawSIXu1loNdhtc3HKz45UeR3-1auL8KYCQ9Q0pJHvu7bTxIcQgUZWi6XzQDk-Etav-UYtQiI3Pub~IOCUNeLlWBmVvjUhg31Azl985zIMfjhOiwCi54l4vXlL-B7QQQg4Byqk1S4De2HbcTUCN8WNNnUxqjwapxoQ-RvKsQaLr8bN05Wuh8H5AQE73yqej7ksNmYQaGyYqYf13wAkyf955-Ecc~0VWKQ3WlPLlffJgqAKEEUS2tWDyJHZF92htw__',
  ];

  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorBedId, setAnchorBedId] = useState(null);

  const dummyBeds = [
    {id: '1', name: 'Bed A1', status: 'occupied', type: '1'},
    {id: '2', name: 'Bed A2', status: 'vacant', type: '1'},
    {id: '3', name: 'Bed B1', status: 'vacant', type: '2'},
    {id: '4', name: 'Bed C1', status: 'occupied', type: '3'},
  ];
  const roomName = room?.name || 'Unknown';
  const isAvailable = room?.isAvailable ?? true;
  const bedroomCount = room?.bedroomCount || 0;
  const bathroomCount = room?.bathroomCount || 0;
  const roomArea = room?.area || 'N/A';

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      {/* Image Carousel */}
      <View style={{height: 250, marginBottom: 12}}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}>
          {images.map((img, index) => (
            <Image
              key={index}
              source={{uri: img}}
              style={{
                width: screenWidth,
                height: 250,
                resizeMode: 'cover',
              }}
            />
          ))}
        </Animated.ScrollView>

        {/* Dots */}
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            alignSelf: 'center',
            flexDirection: 'row',
          }}>
          {images.map((_, index) => {
            const opacity = scrollX.interpolate({
              inputRange: [
                screenWidth * (index - 1),
                screenWidth * index,
                screenWidth * (index + 1),
              ],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={{
                  height: 6,
                  width: 50,
                  backgroundColor: '#000',
                  opacity,
                  margin: 4,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => console.log('Show Menu')}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: 'transparent', // Changed from red
            padding: 8, // Added padding for better touch target
            borderRadius: 20, // Optional: makes it circular
          }}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={24}
            color="white"
          />
          {/* Changed to white for visibility */}
        </TouchableOpacity>
      </View>

      {/* Room Info Bar */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: 16,
          marginTop: -20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="door"
            size={40}
            color={theme.colors.primary}
          />
          <StandardText style={{marginLeft: 6}} fontWeight="bold" size="xl">
            Room {room.name}
          </StandardText>
        </View>

        <View
          style={{
            backgroundColor: room.status === 'vacant' ? '#DFF5E1' : '#FFF2D8',
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 15,
          }}>
          <Text
            style={{
              color: room.status === 'vacant' ? '#219653' : '#F2994A',
              fontWeight: 'bold',
              fontSize: 12,
            }}>
            {room.isAvailable ? 'Available' : 'Occupied'}
          </Text>
        </View>
      </View>

      {/* Horizonatal Line */}
      <View
        style={{
          height: 1,
          backgroundColor: '#E0E0E0',
          marginVertical: 10,
          marginHorizontal: 25,
          width: '70%',
          borderRadius: 5,
          alignSelf: 'center',
        }}
      />

      <ScrollView style={{paddingHorizontal: 15, paddingTop: 10}}>
        <View style={{gap: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* LEFT COLUMN */}
            <View>
              {/* Bed Count */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons name="bed" size={22} color="#000" />
                <StandardText
                  style={{marginLeft: 6}}
                  fontWeight="bold"
                  size="md">
                  Bed:{' '}
                  <Text style={{color: '#F2994A'}}>{room.totalBeds || 4}</Text>
                </StandardText>
              </View>

              {/* Available */}
              <StandardText
                style={{marginLeft: 28, color: 'gray', marginTop: 4}}
                size="sm">
                Available:{' '}
                <MaterialCommunityIcons name="bed" size={18} color="#F2C94C" />
              </StandardText>

              {/* Occupied */}
              <StandardText
                style={{marginLeft: 28, color: 'gray', marginTop: 2}}
                size="sm">
                Occupied:{' '}
                <MaterialCommunityIcons name="bed" size={18} color="#BDBDBD" />
                <MaterialCommunityIcons name="bed" size={18} color="#BDBDBD" />
              </StandardText>

              {/* Rent Due */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                <MaterialCommunityIcons name="cash" size={22} color="#000" />
                <StandardText
                  style={{marginLeft: 6}}
                  fontWeight="bold"
                  size="md">
                  Rent Due:{' '}
                  <Text style={{color: '#F2994A'}}>
                    {room.rentDueCount || 2}
                  </Text>
                </StandardText>
              </View>
              {/* Rent Due People */}
              <View style={{marginLeft: 28, marginTop: 6}}>
                {['Rihaa Kapoor', 'Schmidt'].map((name, idx) => (
                  <View
                    key={idx}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                    {/* <Avatar.Image
                      size={24}
                      source={require('../assets/avatar-placeholder.png')} // Replace with real image if needed
                    /> */}
                    <MaterialCommunityIcons
                      name="account-circle"
                      size={22}
                      color="#000"
                    />
                    <StandardText style={{marginLeft: 8}} size="sm">
                      {name}
                    </StandardText>
                  </View>
                ))}
              </View>
            </View>

            {/* RIGHT COLUMN */}
            <View>
              {/* Active Ticket */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <MaterialCommunityIcons
                  name="ticket-confirmation"
                  size={22}
                  color="#000"
                />
                <StandardText
                  style={{marginLeft: 6}}
                  fontWeight="bold"
                  size="md">
                  Active Ticket:{' '}
                  <Text style={{color: '#F2994A'}}>
                    {room.activeTickets || 1}
                  </Text>
                </StandardText>
              </View>
              <StandardText
                style={{marginLeft: 28, color: 'gray', marginTop: 4}}
                size="sm">
                {room.ticketMessage || 'Cupboard door needs fixing'}
              </StandardText>

              {/* Under Notice */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                <MaterialCommunityIcons
                  name="calendar-alert"
                  size={22}
                  color="#000"
                />
                <StandardText
                  style={{marginLeft: 6}}
                  fontWeight="bold"
                  size="md">
                  Under Notice:{' '}
                  <Text style={{color: '#F2994A'}}>{room.room || 1}</Text>
                </StandardText>
              </View>
              <View style={{marginLeft: 28, marginTop: 6}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {/* <Avatar.Image
                    size={24}
                    source={require('../assets/avatar-placeholder.png')} // Replace with real image if needed
                  /> */}
                  <MaterialCommunityIcons
                    name="account-circle"
                    size={22}
                    color="#000"
                  />
                  <StandardText style={{marginLeft: 8}} size="sm">
                    Rihan Kapoor
                  </StandardText>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View>
          <StandardText fontWeight="bold" size="md" style={{marginBottom: 8}}>
            Amenities
          </StandardText>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
            {(room.amenities
              ? room.amenities.split(',').map(item => item.trim())
              : ['WiFi', 'AC', 'Heater', 'Wardrobe', 'Attached Bathroom']
            ).map((item, idx) => (
              <Chip
                key={idx}
                style={{backgroundColor: '#F0F0F0'}}
                textStyle={{fontWeight: '500'}}
                icon="check">
                {item}
              </Chip>
            ))}
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: '#E0E0E0',
            marginVertical: 10,
            marginHorizontal: 25,
            width: '70%',
            borderRadius: 5,
            alignSelf: 'center',
          }}
        />

        <StandardText fontWeight="bold" size="xl" style={{marginBottom: 8}}>
          List of Tenants
        </StandardText>

        {dummyBeds.map(bed => (
          <StandardCard key={bed.id} style={{marginTop: 10}}>
            <TouchableOpacity onPress={() => {}}>
              {/* Row: Avatar + Info Section */}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {/* LEFT: Avatar */}
                {/* <Avatar.Image
               size={48}
               source={require('../assets/avatar-placeholder.png')} // Replace with actual avatar
               style={{ marginRight: 12, marginTop: 4 }}
             /> */}

                <MaterialCommunityIcons
                  name="account-circle"
                  size={120}
                  style={{
                    marginRight: 12,
                    marginTop: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />

                {/* RIGHT: Details */}
                <View style={{flex: 1}}>
                  {/* Header Row: Name Tag + 3-dot menu */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 6,
                    }}>
                    <View
                      style={{
                        borderRadius: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}>
                      <StandardText fontWeight="bold" size="xl">
                        Sumit Gupta
                      </StandardText>
                    </View>

                    <Menu
                      visible={menuVisible && anchorBedId === bed.id}
                      onDismiss={() => {
                        setMenuVisible(false);
                        setAnchorBedId(null);
                      }}
                      anchor={
                        <TouchableOpacity
                          onPress={() => {
                            setMenuVisible(true);
                            setAnchorBedId(bed.id);
                          }}
                          style={{paddingHorizontal: 8, paddingVertical: 4}}>
                          <MaterialCommunityIcons
                            name="dots-vertical"
                            size={20}
                            color="#888"
                          />
                        </TouchableOpacity>
                      }>
                      <Menu.Item onPress={() => {}} title="Edit" />
                      <Menu.Item onPress={() => {}} title="Share" />
                      <Menu.Item onPress={() => {}} title="Send Message" />
                      <Menu.Item onPress={() => {}} title="Delete" />
                    </Menu>
                  </View>

                  {/* Detail Rows */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                    <MaterialCommunityIcons name="bed" size={20} color="#333" />
                    <StandardText style={{marginLeft: 6}}>
                      Room:{' '}
                      <Text style={{fontWeight: 'bold'}}>{room.type}</Text>
                    </StandardText>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                    <MaterialCommunityIcons
                      name="calendar-alert"
                      size={20}
                      color="#333"
                    />
                    <StandardText style={{marginLeft: 6}}>
                      Under Notice:{' '}
                      <Text style={{fontWeight: 'bold'}}>Yes</Text>
                    </StandardText>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                    <MaterialCommunityIcons
                      name="cash"
                      size={20}
                      color="#333"
                    />
                    <StandardText style={{marginLeft: 6}}>
                      Rent Due: <Text style={{fontWeight: 'bold'}}>Yes</Text>
                    </StandardText>
                  </View>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="alert-circle-outline"
                      size={20}
                      color="#333"
                    />
                    <StandardText style={{marginLeft: 6}}>
                      Joined:{' '}
                      <Text style={{fontWeight: 'bold'}}>2025-01-23</Text>
                    </StandardText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </StandardCard>
        ))}

        <Gap size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoomDetails;
