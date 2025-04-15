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
  {label: 'Dues', key: 'vacant', value: 20},
  {label: 'No Dues', key: '4', value: 20},
  {label: 'Notice', key: '1', value: 20},
];

const dummyBeds = [
  {id: '1', name: 'Bed A1', status: 'occupied', type: '1'},
  {id: '2', name: 'Bed A2', status: 'vacant', type: '1'},
  {id: '3', name: 'Bed B1', status: 'vacant', type: '2'},
  {id: '4', name: 'Bed C1', status: 'occupied', type: '3'},
];

const Tenants = ({navigation}) => {
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
            placeholder="Search Tenants..."
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

          {dummyBeds.map(bed => (
            <StandardCard key={bed.id} style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('TenantDetails', {});
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
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
                        <Menu.Item onPress={() => {}} title="Put on Notice" />
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
                      <MaterialCommunityIcons
                        name="bed"
                        size={20}
                        color="#333"
                      />
                      <StandardText style={{marginLeft: 6}}>
                        Room:{' '}
                        <Text style={{fontWeight: 'bold'}}>{bed.type}</Text>
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

          <Gap size="lg" />
          <Gap size="lg" />
          <Gap size="lg" />
          <Gap size="lg" />
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

export default Tenants;
