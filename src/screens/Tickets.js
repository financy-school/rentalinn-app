import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
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
import {fetchTickets, updateTicket} from '../services/NetworkUtils';
import {CredentialsContext} from '../context/CredentialsContext';
import colors from '../theme/color';

const filterOptions = [
  {label: 'All', key: 'all', value: 30},
  {label: 'Active', key: 'vacant', value: 20},
  {label: 'Closed', key: '4', value: 20},
];

const Tickets = ({navigation}) => {
  const {theme: mode} = useContext(ThemeContext);
  const {credentials} = useContext(CredentialsContext);

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketImages, setTicketImages] = useState({}); // { ticketId: [urls] }

  const {getDocument} = require('../services/NetworkUtils');
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchTickets(
        credentials.accessToken,
        credentials.property_id,
      );
      console.log('Tickets fetched:', response.data);
      const items = response.data.items || [];
      setTickets(items);

      // Fetch image URLs for tickets with image_document_id_list
      const imagesMap = {};
      for (const ticket of items) {
        if (
          ticket.image_document_id_list &&
          Array.isArray(ticket.image_document_id_list)
        ) {
          imagesMap[ticket.id] = [];
          for (const docId of ticket.image_document_id_list) {
            try {
              const docRes = await getDocument(
                credentials.accessToken,
                credentials.property_id,
                docId,
              );
              if (docRes?.data?.download_url) {
                imagesMap[ticket.id].push(docRes.data.download_url);
              }
            } catch (err) {
              console.log('Error fetching ticket image:', err);
            }
          }
        }
      }
      setTicketImages(imagesMap);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  }, [credentials.accessToken, credentials.property_id, getDocument]);

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

          {tickets.map(ticket => (
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
                      ticket.status === 'PENDING' ? '#f44336' : '#4caf50',
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
                <StandardText style={{color: colors.primary}}>
                  {ticket.raisedBy}
                </StandardText>
              </View>

              {/* Ticket Images */}
              {ticketImages[ticket.id] &&
                ticketImages[ticket.id].length > 0 && (
                  <ScrollView horizontal style={{marginVertical: 8}}>
                    {ticketImages[ticket.id].map((imgUrl, idx) => (
                      <View key={idx} style={{marginRight: 8}}>
                        <Avatar.Image size={64} source={{uri: imgUrl}} />
                      </View>
                    ))}
                  </ScrollView>
                )}

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

              {ticket.status === 'PENDING' && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 12,
                  }}>
                  <Button
                    mode="outlined"
                    onPress={async () => {
                      await updateTicket(credentials.accessToken, ticket.id, {
                        status: 'CLOSED',
                      });
                    }}>
                    <StandardText>CLOSE</StandardText>
                  </Button>
                </View>
              )}
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
          onPress={() => navigation.navigate('AddTicket')}
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
