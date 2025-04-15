import React, {useContext, useState} from 'react';
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

const filterOptions = [
  {label: 'All', key: 'all', value: 30},
  {label: 'Vacant Beds', key: 'vacant', value: 20},

  {label: '4 Beds', key: '4', value: 20},
  {label: '1 Bed', key: '1', value: 20},
  ,
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
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredBeds = dummyBeds.filter(bed => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'vacant') return bed.status === 'vacant';
    return bed.type === selectedFilter;
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorBedId, setAnchorBedId] = useState(null);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        marginTop: 25,
      }}>
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <ScrollView contentContainerStyle={{padding: 16}}>
          {/* Search Bar */}
          <PaperInput
            mode="flat" // looks more like RN TextInput
            placeholder="Search Beds..."
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
                    backgroundColor: theme.colors.primary,
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

          {/* Bed Cards */}
          {filteredBeds.map(bed => (
            <StandardCard key={bed.id} style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('RoomDetails', {bed})}>
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
                      color={theme.colors.primary}
                    />
                    <StandardText style={{marginLeft: 8}} fontWeight="bold">
                      Room {bed.name}
                    </StandardText>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        backgroundColor:
                          bed.status === 'vacant' ? '#DFF5E1' : '#FFF2D8',
                        borderRadius: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}>
                      <Text
                        style={{
                          color:
                            bed.status === 'vacant' ? '#219653' : '#F2994A',
                          fontWeight: 'bold',
                          fontSize: 12,
                        }}>
                        {bed.status === 'vacant' ? 'Available' : 'Occupied'}
                      </Text>
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

                {/* Bed Icons */}

                {/* Info Rows */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 4,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons name="bed" size={20} color="#333" />
                    <StandardText style={{marginLeft: 6}}>
                      Bed: <Text style={{fontWeight: 'bold'}}> {bed.type}</Text>
                    </StandardText>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', marginVertical: 10}}>
                      {[...Array(parseInt(bed.type)).keys()].map(index => (
                        <MaterialCommunityIcons
                          key={index}
                          name={
                            index <
                            (bed.status === 'vacant'
                              ? 0
                              : parseInt(bed.type) - 1)
                              ? 'bed'
                              : 'bed-outline'
                          }
                          size={24}
                          color={
                            index <
                            (bed.status === 'vacant'
                              ? 0
                              : parseInt(bed.type) - 1)
                              ? theme.colors.primary
                              : '#ccc'
                          }
                          style={{marginRight: 4}}
                        />
                      ))}
                    </View>
                  </View>
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
                    Under Notice: <Text style={{fontWeight: 'bold'}}>1</Text>
                  </StandardText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 4,
                  }}>
                  <MaterialCommunityIcons name="cash" size={20} color="#333" />
                  <StandardText style={{marginLeft: 6}}>
                    Rent Due: <Text style={{fontWeight: 'bold'}}>2</Text>
                  </StandardText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 8,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <MaterialCommunityIcons
                      name="alert-circle-outline"
                      size={20}
                      color="#333"
                    />
                    <StandardText style={{marginLeft: 6}}>
                      Active Ticket: <Text style={{fontWeight: 'bold'}}>1</Text>
                    </StandardText>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{alignItems: 'flex-end'}}>
                      <Button
                        mode="outlined"
                        onPress={() => {}}
                        labelStyle={{fontWeight: 'bold'}}>
                        ADD TENANT
                      </Button>
                    </View>
                  </View>
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
            backgroundColor: theme.colors.primary,
          }}
          onPress={() => navigation.navigate('AddBed')}
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
