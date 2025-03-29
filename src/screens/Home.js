import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import {CredentialsContext} from '../components/CredentialsContext';
import KeyBoardAvoidingWrapper from '../components/KeyBoardAvoidingWrapper';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
const windowWidth = Dimensions.get('window').width;
const itemsWidth = (windowWidth - 20) / 2;
const sliderWidth = Dimensions.get('window').width - 10;
const itemWidth = sliderWidth;

const Home = () => {
  const navigation = useNavigation();
  const {storedCredentials, setStoredCredentials} =
    useContext(CredentialsContext);
  const {
    id,
    first_name,
    last_name,
    email,
    phone_number,
    address,
    role,
    password,
    onboarding_status,
    school,
  } = storedCredentials;

  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Animatable.Text
          style={styles.loadingText}
          animation="fadeIn"
          iterationCount="infinite"
          direction="alternate">
          Loading...
        </Animatable.Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <MaterialCommunityIcons name="menu" size={35} color="#ffffff" />
              </TouchableOpacity>
              <View style={{marginLeft: 20}}>
                <Text style={styles.headerTitle}>
                  Good Morning {first_name}
                </Text>
                <Text style={styles.headerText}>Welcome to RentalInn</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => console.log('Notifications')}>
              <Ionicons name="notifications-circle" size={45} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ffffff',
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5168B6',
  },
  carouselContainer: {
    marginTop: 20,
  },
  carouselContentContainer: {
    alignItems: 'center',
  },
  carouselItem: {
    width: itemWidth,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  carouselItemText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paginationContainer: {
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  carouselItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },

  box: {
    height: 100,
    marginTop: 5,
    padding: 20,
    borderRadius: 5,
  },

  container: {
    // padding: 5,
    backgroundColor: '#5168B6',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#5168B6',
    height: 70,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5168B6',
  },
  gridContainer: {
    backgroundColor: '#5168B6',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#5168B6',
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 55,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#000000',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: '#5168B6',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5168B6',
  },
  statIncrease: {
    fontSize: 14,
    color: 'green',
    fontWeight: 'bold',
  },
  statDecrease: {
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },

  statLabel: {
    fontSize: 14,
    color: '#555',
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  quickActionBox: {
    width: 45,
    height: 45,

    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
