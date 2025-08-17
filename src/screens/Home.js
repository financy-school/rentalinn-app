import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Appbar, Avatar, Button, Card, Text} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CircularIconsWithText from '../components/cards/CircularIcon';
import {ThemeContext} from '../context/ThemeContext';
import StandardAccordion from '../components/StandardAccordion/StandardAccordion';
import StandardText from '../components/StandardText/StandardText';
import StandardCard from '../components/StandardCard/StandardCard';
import Gap from '../components/Gap/Gap';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AddTenant from '../components/cards/AddTenant';
import SendAnnouncement from '../components/cards/SendAnnouncement';
import RecordPayment from '../components/cards/RecordPayment';
import AddRoom from '../components/cards/AddRoom';
import Contacts from '../components/cards/Contacts';
import {CredentialsContext} from '../context/CredentialsContext';
import {analyticsDashBoard} from '../services/NetworkUtils';
import colors from '../theme/color';

const Home = ({navigation}) => {
  const {theme: mode, toggleTheme} = useContext(ThemeContext);
  const {credentials} = useContext(CredentialsContext);
  const [selectedAction, setSelectedAction] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);

  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleQuickActionPress = useCallback(action => {
    setSelectedAction(action);
    bottomSheetModalRef.current?.present();
  }, []);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await analyticsDashBoard(credentials.accessToken);
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };
    fetchAnalyticsData();
  }, [credentials.accessToken]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.background,
            padding: 15,
          }}>
          <Appbar.Header style={{backgroundColor: 'transparent'}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Avatar.Icon
                size={40}
                icon="menu"
                style={{backgroundColor: colors.white}}
                color={colors.primary}
              />
            </TouchableOpacity>

            <View style={{flex: 1, marginLeft: 10}}>
              <StandardText size="md">Welcome</StandardText>
              <StandardText size="lg" fontWeight="bold">
                {credentials?.firstName} {credentials?.lastName}
              </StandardText>
            </View>

            <TouchableOpacity onPress={handlePresentModalPress}>
              <Avatar.Icon
                size={40}
                icon="bell"
                style={{backgroundColor: colors.light_black}}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme} style={{marginLeft: 10}}>
              <Avatar.Icon
                size={40}
                icon="theme-light-dark"
                style={{backgroundColor: colors.white}}
                color={colors.primary}
              />
            </TouchableOpacity>
          </Appbar.Header>

          <ScrollView>
            <Gap size="md" />
            <StandardAccordion
              heading="Tenants"
              icon={
                <MaterialCommunityIcons
                  name="home"
                  size={20}
                  color={colors.primary}
                />
              }
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
            />

            <View
              style={{paddingHorizontal: 15, marginTop: 10, marginBottom: 10}}>
              <StandardText size="lg" fontWeight="bold">
                Quick Actions
              </StandardText>
            </View>

            <CircularIconsWithText onActionPress={handleQuickActionPress} />

            <Gap size="lg" />
            <StandardCard style={{elevation: 2}}>
              <StandardText size="lg" fontWeight="bold" textAlign="center">
                Rent Details
              </StandardText>
              <View
                style={{
                  backgroundColor: colors.white,
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 10,
                  shadowColor: colors.primary,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}>
                {/* Paid vs Not Paid row */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    Paid
                  </StandardText>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    Not Paid
                  </StandardText>
                </View>
                {/* Stats row */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    {analyticsData?.incomeStats?.actualIncome || 0}
                  </StandardText>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    {analyticsData?.incomeStats?.overdueIncome || 0}
                  </StandardText>
                </View>

                {/* Remind Button */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <StandardText textAlign="center" size="md" style={{flex: 1}}>
                    On-time: {analyticsData?.tenantStats?.totalTenants || 0}
                  </StandardText>
                  <Button
                    mode="contained"
                    buttonColor={colors.white}
                    onPress={() => {}}
                    style={{
                      borderRadius: 5,
                      borderColor: colors.black,
                      borderWidth: 1,
                    }}>
                    <MaterialCommunityIcons
                      name="whatsapp"
                      size={20}
                      color={colors.black}
                    />
                    <StandardText
                      textAlign="center"
                      size="md"
                      style={{flex: 1}}>
                      REMIND TO PAY
                    </StandardText>
                  </Button>
                </View>

                {/* View Button */}
                <View>
                  <Button
                    mode="contained"
                    buttonColor={colors.primary}
                    style={{
                      width: '45%',
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                      borderRadius: 5,
                    }}
                    onPress={() => navigation.navigate('Settings')}>
                    <StandardText color="default_white">VIEW</StandardText>
                  </Button>
                </View>
              </View>
            </StandardCard>

            {/* Other Stats Card */}
            <Gap size="lg" />
            <StandardCard style={{elevation: 2}}>
              <StandardText size="lg" fontWeight="bold" textAlign="center">
                Other Stats
              </StandardText>
              <View
                style={{
                  backgroundColor: colors.white,
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 10,
                  shadowColor: colors.primary,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}>
                {/* Example row */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    Vacant Beds
                  </StandardText>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    Notice Period
                  </StandardText>
                </View>

                {/* Stats row */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    {analyticsData?.occupancyStats?.vacantRooms || 0} /{' '}
                    {analyticsData?.occupancyStats?.totalRooms || 0}
                  </StandardText>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    {analyticsData?.tenantStats?.longTermTenants || 0} /{' '}
                    {analyticsData?.tenantStats?.totalTenants || 0}
                  </StandardText>
                </View>

                {/* Action Buttons */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Button
                    mode="contained"
                    buttonColor={colors.white}
                    style={{
                      width: '45%',
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                      borderRadius: 5,
                      borderColor: colors.black,
                      borderWidth: 1,
                    }}>
                    <StandardText>VIEW</StandardText>
                  </Button>
                  <Button
                    mode="contained"
                    buttonColor={colors.white}
                    style={{
                      width: '45%',
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                      borderRadius: 5,
                      borderColor: colors.black,
                      borderWidth: 1,
                    }}>
                    <StandardText>VIEW</StandardText>
                  </Button>
                </View>
              </View>
            </StandardCard>
            <Gap size="lg" />
            <Gap size="lg" />
            <Gap size="lg" />
            <Gap size="lg" />
          </ScrollView>
        </View>

        {/* Bottom Sheet */}
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={['90%']}>
          <BottomSheetView style={styles.contentContainer}>
            {selectedAction?.label === 'Add Tenant' && (
              <AddTenant handleClosePress={handleClosePress} />
            )}
            {selectedAction?.label === 'Announce' && (
              <SendAnnouncement handleClosePress={handleClosePress} />
            )}
            {selectedAction?.label === 'Payments' && (
              <RecordPayment handleClosePress={handleClosePress} />
            )}
            {selectedAction?.label === 'Add Room' && (
              <AddRoom handleClosePress={handleClosePress} />
            )}
            {selectedAction?.label === 'Contacts' && (
              <Contacts handleClosePress={handleClosePress} />
            )}
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;
