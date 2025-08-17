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
import StandardInformationAccordion from '../components/StandardInformationAccordion/StandardInformationAccordion';
import colors from '../theme/color';
const screenWidth = Dimensions.get('window').width;
const TenantDetails = ({navigation, route}) => {
  const {theme: mode} = useContext(ThemeContext);
  const theme = useTheme();
  const {bed} = route.params;

  const [menuVisible, setMenuVisible] = useState(false);
  const [anchorBedId, setAnchorBedId] = useState(null);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}>
      <Gap size="xxl" />

      <View
        style={{
          height: 200,
          width: '100%',
          backgroundColor: colors.primary,
        }}></View>
      <View style={{paddingHorizontal: 15, marginTop: -140}}>
        <StandardCard key={1} style={{marginTop: 40}}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('TenantDetails', {});
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <MaterialCommunityIcons
                name="account-circle"
                size={120}
                style={{
                  marginRight: 12,
                  marginTop: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#E0E0E0',
                  color: '#888',
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
                      Sumit Gupta
                    </StandardText>
                  </View>

                  <Menu
                    visible={menuVisible && anchorBedId === 1}
                    onDismiss={() => {
                      setMenuVisible(false);
                      setAnchorBedId(null);
                    }}
                    anchor={
                      <TouchableOpacity
                        onPress={() => {
                          setMenuVisible(true);
                          setAnchorBedId(1);
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
                  <MaterialCommunityIcons name="bed" size={20} color="#333" />
                  <StandardText style={{marginLeft: 6}}>
                    Room: <Text style={{fontWeight: 'bold'}}>ROOM 1</Text>
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
                    Under Notice: <Text style={{fontWeight: 'bold'}}>Yes</Text>
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
                    Joined: <Text style={{fontWeight: 'bold'}}>2025-01-23</Text>
                  </StandardText>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </StandardCard>
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

      <ScrollView style={{paddingHorizontal: 15, paddingTop: 10}}>
        <StandardInformationAccordion
          icon={'account'}
          heading="Personal Details"
          content={
            <View style={styles.container}>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Name</StandardText>
                <StandardText fontWeight="bold">: Priya Kapoor</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Relation</StandardText>
                <StandardText fontWeight="bold">: Sister</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Occupation</StandardText>
                <StandardText fontWeight="bold">: Designer</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Address</StandardText>
                <StandardText fontWeight="bold">
                  : 631/56, Indira Nagar, Delhi
                </StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Mobile Number</StandardText>
                <StandardText fontWeight="bold">: 9526325418</StandardText>
              </View>
            </View>
          }
        />
        <Gap size="md" />
        <StandardInformationAccordion
          icon={'family-tree'}
          heading="Parents Details"
          content={
            <View style={styles.container}>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Name</StandardText>
                <StandardText fontWeight="bold">: Priya Kapoor</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Relation</StandardText>
                <StandardText fontWeight="bold">: Sister</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Occupation</StandardText>
                <StandardText fontWeight="bold">: Designer</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Address</StandardText>
                <StandardText fontWeight="bold">
                  : 631/56, Indira Nagar, Delhi
                </StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Mobile Number</StandardText>
                <StandardText fontWeight="bold">: 9526325418</StandardText>
              </View>
            </View>
          }
        />
        <Gap size="md" />
        <StandardInformationAccordion
          icon={'ambulance'}
          heading="Emergency Contact"
          content={
            <View style={styles.container}>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Name</StandardText>
                <StandardText fontWeight="bold">: Priya Kapoor</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Relation</StandardText>
                <StandardText fontWeight="bold">: Sister</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Occupation</StandardText>
                <StandardText fontWeight="bold">: Designer</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Address</StandardText>
                <StandardText fontWeight="bold">
                  : 631/56, Indira Nagar, Delhi
                </StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Mobile Number</StandardText>
                <StandardText fontWeight="bold">: 9526325418</StandardText>
              </View>
            </View>
          }
        />
        <Gap size="md" />
        <StandardInformationAccordion
          icon={'home'}
          heading="Renting Details"
          content={
            <View style={styles.container}>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Name</StandardText>
                <StandardText fontWeight="bold">: Priya Kapoor</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Relation</StandardText>
                <StandardText fontWeight="bold">: Sister</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Occupation</StandardText>
                <StandardText fontWeight="bold">: Designer</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Address</StandardText>
                <StandardText fontWeight="bold">
                  : 631/56, Indira Nagar, Delhi
                </StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Mobile Number</StandardText>
                <StandardText fontWeight="bold">: 9526325418</StandardText>
              </View>
            </View>
          }
        />

        <Gap size="md" />
        <StandardInformationAccordion
          icon={'credit-card'}
          heading="Payment Details"
          content={
            <View style={styles.container}>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Name</StandardText>
                <StandardText fontWeight="bold">: Priya Kapoor</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Relation</StandardText>
                <StandardText fontWeight="bold">: Sister</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Occupation</StandardText>
                <StandardText fontWeight="bold">: Designer</StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Address</StandardText>
                <StandardText fontWeight="bold">
                  : 631/56, Indira Nagar, Delhi
                </StandardText>
              </View>
              <View style={styles.row}>
                <StandardText fontWeight="bold">Mobile Number</StandardText>
                <StandardText fontWeight="bold">: 9526325418</StandardText>
              </View>
            </View>
          }
        />
        <Gap size="md" />
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

        {/* KYC Documents along wiht status as verified and pending */}
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <StandardText fontWeight="bold" size="lg">
              KYC Documents
            </StandardText>
            <Chip style={styles.verifiedChip} textStyle={{color: 'green'}}>
              Verified
            </Chip>
          </View>

          <View style={styles.cardRow}>
            <View style={styles.card}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Sample_PVC_Aadhar_Card_back.jpg',
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <View style={styles.card}>
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/3/31/A_sample_of_Permanent_Account_Number_%28PAN%29_Card.jpg',
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        <Gap size="md" />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            mode="outlined"
            textColor={colors.black}
            style={{width: '45%', borderRadius: 5}}
            onPress={() => {}}>
            <StandardText fontWeight="bold">Edit</StandardText>
          </Button>
          <Button
            mode="contained"
            style={{width: '45%', borderRadius: 5}}
            onPress={() => {}}>
            <StandardText fontWeight="bold" color="default_white">
              Record Payment
            </StandardText>
          </Button>
        </View>

        <Gap size="xxl" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  verifiedChip: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: screenWidth / 2 - 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
  },
  button: {
    borderRadius: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4, // Adjust vertical spacing between rows as needed
    paddingHorizontal: 8, // Add some horizontal padding
    backgroundColor: '#f9f9f9', // Light background color for rows
    borderRadius: 8, // Rounded corners for the rows
    marginBottom: 4, // Adjust vertical spacing between rows as needed
  },
  label: {
    fontWeight: 'bold', // Make the labels bold like in the screenshot
    width: 120, // Adjust the width to align the colons properly
    marginRight: 8, // Add some space between the label and the colon
    color: '#555', // Adjust the label color to match the screenshot
    fontSize: 16, // Adjust the font size as needed
  },
  value: {
    flex: 1, // Allow the value to take up the remaining space
    color: '#a75e09', // Adjust the value color to match the screenshot
    fontSize: 16, // Adjust the font size as needed
  },
});

export default TenantDetails;
