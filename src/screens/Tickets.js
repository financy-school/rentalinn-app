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
  {label: 'Active', key: 'vacant', value: 20},
  {label: 'Closed', key: '4', value: 20},
];

const dummyTickets = [
  {
    id: '#10125',
    timestamp: "19 Jul'23, 10:52PM",
    status: 'Active',
    raisedBy: 'Rihaan, Room 101',
    issue: 'Washing Machine',
    description:
      'Washing machine is not working. Someone came and checked but it still not working.',
  },
  {
    id: '#10126',
    timestamp: "19 Jul'23, 10:52PM",
    status: 'Closed',
    raisedBy: 'Rihaan, Room 101',
    issue: 'Washing Machine',
    description:
      'Washing machine is not working. Someone came and checked but it still not working.',
  },
  {
    id: '#10127',
    timestamp: "19 Jul'23, 10:52PM",
    status: 'Active',
    raisedBy: 'Rihaan, Room 101',
    issue: 'Washing Machine',
    description:
      'Washing machine is not working. Someone came and checked but it still not working.',
  },
];

const Tickets = ({navigation}) => {
  const {theme: mode} = useContext(ThemeContext);
  const theme = useTheme();

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

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
            placeholder="Search Tickets..."
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
          {dummyTickets.map(ticket => (
            <StandardCard
              key={ticket.id}
              style={{marginBottom: 16, padding: 12}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <StandardText style={{fontWeight: 'bold'}}>
                  {ticket.id}
                </StandardText>
                <View
                  style={{
                    backgroundColor:
                      ticket.status === 'Active' ? '#f44336' : '#4caf50',
                    borderRadius: 12,
                    paddingHorizontal: 10,
                    paddingVertical: 2,
                  }}>
                  <StandardText size="sm" color="default_gray">
                    {ticket.status}
                  </StandardText>
                </View>
              </View>

              <StandardText size="sm" color="default_gray">
                {ticket.timestamp}
              </StandardText>

              <View style={{marginTop: 8, flexDirection: 'row'}}>
                <StandardText fontWeight="bold">Raised by: </StandardText>
                <StandardText style={{color: theme.colors.primary}}>
                  {ticket.raisedBy}
                </StandardText>
              </View>

              <View
                style={{
                  height: 1,
                  backgroundColor: '#ddd',
                  marginVertical: 10,
                  width: '70%',
                  alignSelf: 'center',
                }}
              />

              <StandardText fontWeight="bold">
                Issue: {ticket.issue}
              </StandardText>
              <StandardText>{ticket.description}</StandardText>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginTop: 12,
                }}>
                <Button mode="outlined" onPress={() => {}}>
                  <StandardText>CLOSE</StandardText>
                </Button>
              </View>
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

export default Tickets;
