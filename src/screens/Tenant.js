import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Avatar, FAB, Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput as PaperInput} from 'react-native-paper';

import {ThemeContext} from '../context/ThemeContext';
import StandardText from '../components/StandardText/StandardText';
import StandardCard from '../components/StandardCard/StandardCard';
import Gap from '../components/Gap/Gap';
import {Menu} from 'react-native-paper';
import {fetchTenants, putTenantOnNotice} from '../services/NetworkUtils';
import {CredentialsContext} from '../context/CredentialsContext';
import colors from '../theme/color';

const filterOptions = [
  {label: 'All', key: 'all', value: 30},
  {label: 'Dues', key: 'vacant', value: 20},
  {label: 'No Dues', key: '4', value: 20},
  {label: 'Notice', key: '1', value: 20},
];

const Tenants = ({navigation}) => {
  const {theme: mode} = useContext(ThemeContext);
  const {credentials} = useContext(CredentialsContext);
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorBedId, setAnchorBedId] = useState(null);
  const [tenants, setTenants] = useState([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchTenants(
        credentials.accessToken,
        credentials.property_id,
      );

      setTenants(res.data.items || []);
    } catch (error) {
      console.error('Error fetching tenants:', error);
      setTenants([]);
    } finally {
      setLoading(false);
    }
  }, [credentials.accessToken, credentials.property_id]);

  useEffect(() => {
    fetchData();

    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation, fetchData]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
        marginTop: 25,
      }}>
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <ScrollView contentContainerStyle={{padding: 16}}>
          <PaperInput
            mode="flat"
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
              <Text>Loading tickets...</Text>
            </View>
          )}

          {tenants.map(tenant => (
            <StandardCard key={tenant.id} style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('TenantDetails', {tenant});
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  {/* LEFT: Avatar */}
                  <Avatar.Image
                    size={120}
                    source={{
                      uri: 'https://avatar.iran.liara.run/public/37',
                    }}
                    style={{
                      marginRight: 12,
                      marginTop: 4,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />

                  <View style={{flex: 1}}>
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
                          {tenant.name}
                        </StandardText>
                      </View>

                      <Menu
                        visible={menuVisible && anchorBedId === tenant.id}
                        onDismiss={() => {
                          setMenuVisible(false);
                          setAnchorBedId(null);
                        }}
                        anchor={
                          <TouchableOpacity
                            onPress={() => {
                              setMenuVisible(true);
                              setAnchorBedId(tenant.id);
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
                        <Menu.Item
                          onPress={() => {
                            putTenantOnNotice(
                              credentials.accessToken,
                              tenant.id,
                              {notice: true},
                            );
                          }}
                          title="Put on Notice"
                        />
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
                        <Text style={{fontWeight: 'bold'}}>
                          {tenant.room.name}
                        </Text>
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
                        <Text style={{fontWeight: 'bold'}}>
                          {tenant.is_on_notice ? 'Yes' : 'No'}
                        </Text>
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
                        Rent Due:{' '}
                        <Text style={{fontWeight: 'bold'}}>
                          {tenant.room.rentAmount}
                        </Text>
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
                        <Text style={{fontWeight: 'bold'}}>
                          {tenant.check_in_date}
                        </Text>
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
            backgroundColor: colors.primary,
          }}
          onPress={() => navigation.navigate('AddTenant')}
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
