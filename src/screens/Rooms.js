import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Avatar, Button, Card, FAB, Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput as PaperInput} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext';
import StandardText from '../components/StandardText/StandardText';
import StandardCard from '../components/StandardCard/StandardCard';
import Gap from '../components/Gap/Gap';
import {Menu} from 'react-native-paper';
import Share from 'react-native-share';
import {getDocument, propertyRooms} from '../services/NetworkUtils';
import {CredentialsContext} from '../context/CredentialsContext';
import colors from '../theme/color';

const filterOptions = [
  {label: 'All', key: 'all', value: 30},
  {label: 'Vacant Beds', key: 'vacant', value: 20},
  {label: '4 Beds', key: '4', value: 20},
  {label: '1 Bed', key: '1', value: 20},
  {label: '2 Beds', key: '2', value: 20},
  {label: '3 Beds', key: '3', value: 20},
];

const dummyBeds = [
  {id: '1', name: 'Bed A1', status: 'occupied', type: '1'},
  {id: '2', name: 'Bed A2', status: 'vacant', type: '1'},
  {id: '3', name: 'Bed B1', status: 'vacant', type: '2'},
  {id: '4', name: 'Bed C1', status: 'occupied', type: '3'},
];

const Rooms = ({navigation}) => {
  const {theme: mode} = useContext(ThemeContext);
  const {credentials} = useContext(CredentialsContext);
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const filteredBeds = dummyBeds.filter(bed => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'vacant') return bed.status === 'vacant';
    return bed.type === selectedFilter;
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorBedId, setAnchorBedId] = useState(null);

  const accessToken = credentials.accessToken;
  const propertyId = credentials.property_id;

  const fetchRooms = useCallback(async () => {
    if (!accessToken || !propertyId) {
      setError('Missing access token or property ID');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await propertyRooms(accessToken, propertyId);
      console.log('Rooms fetched:', response.data);
      const roomData = response.data.items || [];
      setRooms(roomData);
      setError(null);
    } catch (err) {
      console.error('Error fetching rooms:', err);
      setError('Failed to load rooms. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [accessToken, propertyId]);

  useEffect(() => {
    fetchRooms();

    // Add a listener for when the screen receives focus
    const unsubscribe = navigation.addListener('focus', () => {
      fetchRooms();
    });

    // Clean up the listener when component unmounts
    return unsubscribe;
  }, [navigation, fetchRooms]);

  const filteredRooms = rooms
    .filter(room => {
      if (!search) return true;

      // Filter by search term
      const searchTerm = search.toLowerCase();
      return room.name.toLowerCase().includes(searchTerm);
    })
    .filter(room => {
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'vacant') return room.status === 'vacant';
      return room.type === selectedFilter;
    });

  // Helper to share room details
  const handleShareRoom = async room => {
    try {
      // Build message
      const message = `Room Details:\nName: ${room.name || room.id}\nStatus: ${
        room.isAvailable ? 'Available' : 'Occupied'
      }\nBeds: ${room.totalBeds || room.bedroomCount || 0}\nSize: ${
        room.area
      } sqft`;

      // Get image URL from document ID if available
      let imageUrl = null;
      if (
        room.image_document_id_list &&
        room.image_document_id_list.length > 0
      ) {
        const documentId = room.image_document_id_list[0];
        console.log('Fetching image URL for document ID:', documentId);
        if (documentId) {
          try {
            // getDocument should be imported from your services
            const result = await getDocument(
              accessToken,
              propertyId,
              documentId,
            );
            console.log('Fetched image URL:', result);
            imageUrl = result?.data?.download_url || null;
          } catch (err) {
            console.log('Error fetching image URL:', err);
          }
        }
      }
      console.log('Sharing room with image URL:', imageUrl);

      const shareOptions = {
        title: 'Share Room',
        message,
        url: imageUrl || undefined,
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        marginTop: 25,
      }}>
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <ScrollView contentContainerStyle={{padding: 16}}>
          {/* Search Bar */}
          <PaperInput
            mode="flat"
            placeholder="Search Rooms..."
            value={search}
            onChangeText={setSearch}
            style={styles.searchBar}
            left={<PaperInput.Icon icon="magnify" />}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            theme={{
              roundness: 25,
              colors: {
                background: '#fff',
                text: '#000',
                placeholder: '#888',
              },
            }}
          />

          <Gap size="md" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}>
            {filterOptions.map(option => (
              <TouchableOpacity
                key={option.key}
                onPress={() => setSelectedFilter(option.key)}
                style={[
                  styles.filterBox,
                  selectedFilter === option.key && {
                    backgroundColor: colors.primary,
                  },
                ]}>
                <View style={styles.textWrapper}>
                  <Text
                    style={{
                      color: selectedFilter === option.key ? '#fff' : '#000',
                      textAlign: 'center',
                    }}>
                    {option.label}
                  </Text>
                  <Text
                    style={{
                      color: selectedFilter === option.key ? '#fff' : '#000',
                      fontSize: 12,
                      textAlign: 'center',
                    }}>
                    {option.value}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {loading && (
            <View style={{padding: 20, alignItems: 'center'}}>
              <Text>Loading rooms...</Text>
            </View>
          )}

          {error && (
            <View style={{padding: 20, alignItems: 'center'}}>
              <Text style={{color: 'red'}}>{error}</Text>
              <Button
                mode="contained"
                onPress={fetchRooms}
                style={{marginTop: 10}}>
                Retry
              </Button>
            </View>
          )}

          {/* Room Cards */}
          {!loading && !error && filteredRooms.length === 0 && (
            <View style={{padding: 20, alignItems: 'center'}}>
              <Text>No rooms found</Text>
            </View>
          )}

          {/* Room Cards */}
          {!loading &&
            filteredRooms.map(room => (
              <StandardCard key={room.id} style={{marginTop: 10}}>
                {console.log('Rendering room:', room)}
                <TouchableOpacity
                  onPress={() => navigation.navigate('RoomDetails', {room})}>
                  {/* Header Row */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialCommunityIcons
                        name="door"
                        size={24}
                        color={colors.primary}
                      />
                      <StandardText style={{marginLeft: 8}} fontWeight="bold">
                        Room {room.name || room.id}
                      </StandardText>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View
                        style={{
                          backgroundColor: room.isAvailable
                            ? '#DFF5E1'
                            : '#FFF2D8',
                          borderRadius: 15,
                          paddingHorizontal: 10,
                          paddingVertical: 4,
                        }}>
                        <Text
                          style={{
                            color: room.isAvailable ? '#219653' : '#F2994A',
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>
                          {room.isAvailable ? 'Available' : 'Occupied'}
                        </Text>
                      </View>

                      <Menu
                        visible={menuVisible && anchorBedId === room.id}
                        onDismiss={() => {
                          setMenuVisible(false);
                          setAnchorBedId(null);
                        }}
                        anchor={
                          <TouchableOpacity
                            onPress={() => {
                              setMenuVisible(true);
                              setAnchorBedId(room.id);
                            }}
                            style={{paddingHorizontal: 8, paddingVertical: 4}}>
                            <MaterialCommunityIcons
                              name="dots-vertical"
                              size={20}
                              color="#888"
                            />
                          </TouchableOpacity>
                        }>
                        <Menu.Item
                          onPress={() => {
                            setMenuVisible(false);
                            setAnchorBedId(null);
                          }}
                          title="Edit"
                        />
                        <Menu.Item
                          onPress={() => {
                            setMenuVisible(false);
                            setAnchorBedId(null);
                            handleShareRoom(room);
                          }}
                          title="Share"
                        />
                        <Menu.Item
                          onPress={() => {
                            setMenuVisible(false);
                            setAnchorBedId(null);
                          }}
                          title="Send Message"
                        />
                        <Menu.Item
                          onPress={() => {
                            setMenuVisible(false);
                            setAnchorBedId(null);
                          }}
                          title="Delete"
                        />
                      </Menu>
                    </View>
                  </View>

                  {/* Room details - adapt these based on your API data structure */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <MaterialCommunityIcons
                        name="bed"
                        size={20}
                        color="#333"
                      />
                      <StandardText style={{marginLeft: 6}}>
                        Beds:{' '}
                        <Text style={{fontWeight: 'bold'}}>
                          {room.totalBeds || 0}
                        </Text>
                      </StandardText>
                    </View>
                  </View>

                  {/* Additional room info */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 4,
                    }}>
                    <MaterialCommunityIcons
                      name="ruler"
                      size={20}
                      color="#333"
                    />
                    <StandardText style={{marginLeft: 6}}>
                      Size:{' '}
                      <Text style={{fontWeight: 'bold'}}>{room.area} sqft</Text>
                    </StandardText>
                  </View>

                  {/* Add tenant button */}
                  <View style={{alignItems: 'flex-end', marginTop: 10}}>
                    <Button
                      mode="outlined"
                      onPress={() => {
                        navigation.navigate('AddTenant');
                      }}
                      labelStyle={{fontWeight: 'bold'}}>
                      ADD TENANT
                    </Button>
                  </View>
                </TouchableOpacity>
              </StandardCard>
            ))}
        </ScrollView>

        <FAB
          icon="plus"
          color="#fff"
          style={{
            position: 'absolute',
            bottom: 120,
            right: 30,
            borderRadius: 30,
            backgroundColor: colors.primary,
          }}
          onPress={() => navigation.navigate('AddRoom')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterBox: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    width: 80,
  },
  searchBar: {
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    elevation: 2, // subtle shadow
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default Rooms;
