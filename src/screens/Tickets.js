import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Avatar, Button, FAB, Text} from 'react-native-paper';
import {TextInput as PaperInput} from 'react-native-paper';
import {ThemeContext} from '../context/ThemeContext';
import StandardText from '../components/StandardText/StandardText';
import StandardCard from '../components/StandardCard/StandardCard';
import Gap from '../components/Gap/Gap';
import {
  fetchTickets,
  getDocument,
  updateTicket,
} from '../services/NetworkUtils';
import {CredentialsContext} from '../context/CredentialsContext';
import colors from '../theme/color';

const Tickets = ({navigation}) => {
  const {theme: mode} = useContext(ThemeContext);
  const {credentials} = useContext(CredentialsContext);

  const [search, setSearch] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ticketImages, setTicketImages] = useState({}); // { ticketId: [urls] }

  const [filterOptions, setFilterOptions] = useState([
    {label: 'All', key: 'ALL', value: 0},
    {label: 'Active', key: 'ACTIVE', value: 0},
    {label: 'Closed', key: 'CLOSED', value: 0},
  ]);

  /** --- Fetch tickets & images --- */
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchTickets(
        credentials.accessToken,
        credentials.property_id,
      );

      const items = response?.data?.items || [];
      setAllTickets(items); // ✅ store all tickets
      applyFilter(selectedFilter, items); // filter immediately

      // Calculate counts
      const allCount = items.length;
      const activeCount = items.filter(
        t => t.status === 'PENDING' || t.status === 'ACTIVE',
      ).length;
      const closedCount = items.filter(t => t.status === 'CLOSED').length;

      setFilterOptions([
        {label: 'All', key: 'ALL', value: allCount},
        {label: 'Active', key: 'ACTIVE', value: activeCount},
        {label: 'Closed', key: 'CLOSED', value: closedCount},
      ]);

      // Fetch image URLs for tickets
      const imagesMap = {};
      for (const ticket of items) {
        if (Array.isArray(ticket.image_document_id_list)) {
          const urls = [];
          for (const docId of ticket.image_document_id_list) {
            try {
              const docRes = await getDocument(
                credentials.accessToken,
                credentials.property_id,
                docId,
              );
              if (docRes?.data?.download_url) {
                urls.push(docRes.data.download_url);
              }
            } catch (err) {
              console.log('Error fetching ticket image:', err);
            }
          }
          imagesMap[ticket.id] = urls;
        }
      }
      setTicketImages(imagesMap);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setAllTickets([]);
      setTickets([]);
      setFilterOptions([
        {label: 'All', key: 'ALL', value: 0},
        {label: 'Active', key: 'ACTIVE', value: 0},
        {label: 'Closed', key: 'CLOSED', value: 0},
      ]);
    } finally {
      setLoading(false);
    }
  }, [credentials, selectedFilter, applyFilter]);

  /** --- Apply Filters --- */
  const applyFilter = useCallback(
    (filterKey, sourceTickets = allTickets) => {
      let filtered = sourceTickets;

      if (filterKey === 'ACTIVE') {
        filtered = sourceTickets.filter(
          t => t.status === 'PENDING' || t.status === 'ACTIVE',
        );
      } else if (filterKey === 'CLOSED') {
        filtered = sourceTickets.filter(t => t.status === 'CLOSED');
      }

      // Search filter
      if (search.trim()) {
        const lower = search.toLowerCase();
        filtered = filtered.filter(
          t =>
            t.id.toString().toLowerCase().includes(lower) ||
            t.issue?.toLowerCase().includes(lower) ||
            t.description?.toLowerCase().includes(lower) ||
            t.raisedBy?.toLowerCase().includes(lower),
        );
      }

      setTickets(filtered);
    },
    [search, allTickets],
  );

  /** --- Re-apply filter when search changes --- */
  useEffect(() => {
    applyFilter(selectedFilter);
  }, [search, selectedFilter, allTickets, applyFilter]);

  useEffect(() => {
    applyFilter(selectedFilter);
  }, [search, selectedFilter, allTickets, applyFilter]);

  /** --- Fetch on mount + navigation focus --- */
  useEffect(() => {
    fetchData();
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation, fetchData]);

  /** --- Close Ticket Handler --- */
  const handleCloseTicket = async ticketId => {
    try {
      await updateTicket(credentials.accessToken, ticketId, {
        status: 'CLOSED',
      });
      fetchData(); // ✅ Refresh tickets
    } catch (err) {
      console.log('Error closing ticket:', err);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Loading tickets...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{padding: 16}}>
            {/* Search Bar */}
            <PaperInput
              mode="flat"
              placeholder="Search Tickets..."
              value={search}
              onChangeText={setSearch}
              style={styles.searchBar}
              left={<PaperInput.Icon icon="magnify" />}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              theme={{
                roundness: 25,
                colors: {background: '#fff', text: '#000', placeholder: '#888'},
              }}
            />

            <Gap size="md" />

            {/* Filters */}
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

            {/* Ticket List */}
            {tickets.map(ticket => (
              <StandardCard
                key={ticket.id}
                style={{marginBottom: 16, padding: 12}}>
                <View style={styles.ticketHeader}>
                  <StandardText style={{fontWeight: 'bold'}}>
                    {ticket.id}
                  </StandardText>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          ticket.status === 'PENDING' ? '#f44336' : '#4caf50',
                      },
                    ]}>
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
                {ticketImages[ticket.id]?.length > 0 && (
                  <ScrollView horizontal style={{marginVertical: 8}}>
                    {ticketImages[ticket.id].map((imgUrl, idx) => (
                      <View key={idx} style={{marginRight: 8}}>
                        <Avatar.Image size={64} source={{uri: imgUrl}} />
                      </View>
                    ))}
                  </ScrollView>
                )}

                <View style={styles.separator} />

                <StandardText fontWeight="bold">
                  Issue: {ticket.issue}
                </StandardText>
                <StandardText>{ticket.description}</StandardText>

                {ticket.status === 'PENDING' && (
                  <View style={styles.closeButtonWrapper}>
                    <Button
                      mode="outlined"
                      onPress={() => handleCloseTicket(ticket.id)}>
                      <StandardText>CLOSE</StandardText>
                    </Button>
                  </View>
                )}
              </StandardCard>
            ))}

            <Gap size="xl" />
            <Gap size="xl" />
          </ScrollView>
        )}

        {/* FAB */}
        <FAB
          icon="plus"
          color="#fff"
          style={styles.fab}
          onPress={() => navigation.navigate('AddTicket')}
        />
      </View>
    </SafeAreaView>
  );
};

/** --- Styles --- */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: 25,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
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
    elevation: 2,
  },
  textWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
    width: '70%',
    alignSelf: 'center',
  },
  closeButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 120,
    right: 30,
    borderRadius: 30,
    backgroundColor: colors.primary,
  },
});

export default Tickets;
