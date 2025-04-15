import React, {useCallback, useContext, useRef, useState} from 'react';
import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import {Appbar, Avatar, Button, Card, Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RevenueCard from '../components/cards/RevenueCard';
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

const Home = ({navigation}) => {
  const {theme: mode, toggleTheme} = useContext(ThemeContext);
  const theme = useTheme();
  const [selectedAction, setSelectedAction] = useState(null);

  const bottomSheetModalRef = useRef(null);

  // callbacks
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

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
            padding: 15,
          }}>
          <Appbar.Header style={{backgroundColor: 'transparent'}}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Avatar.Icon
                size={40}
                icon="menu"
                style={{backgroundColor: theme.colors.white}}
                color={theme.colors.primary}
              />
            </TouchableOpacity>

            <View style={{flex: 1, marginLeft: 10}}>
              <StandardText size="md">Welcome</StandardText>
              <StandardText size="lg" fontWeight="bold">
                John Doe
              </StandardText>
            </View>

            <TouchableOpacity
              onPress={() => {
                // navigation.navigate('Notifications');
                handlePresentModalPress();
              }}>
              <Avatar.Icon
                size={40}
                icon="bell"
                style={{backgroundColor: theme.colors.light_black}}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleTheme} style={{marginLeft: 10}}>
              <Avatar.Icon
                size={40}
                icon="theme-light-dark"
                style={{backgroundColor: theme.colors.white}}
                color={theme.colors.primary}
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
                  color={theme.colors.primary}
                />
              }
              content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            />

            <View
              style={{
                paddingHorizontal: 15,
                marginTop: 10,
                marginBottom: 10,
              }}>
              <StandardText size="lg" fontWeight="bold">
                Quick Actions
              </StandardText>
            </View>

            <CircularIconsWithText onActionPress={handleQuickActionPress} />

            <Gap size="lg" />
            <StandardCard
              style={{
                elevation: 2,
              }}>
              <StandardText size="lg" fontWeight="bold" textAlign="center">
                Rent Details
              </StandardText>
              <View
                style={{
                  backgroundColor: theme.colors.white,
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 10,
                  shadowColor: theme.colors.primary,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}>
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
                    125
                  </StandardText>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    12
                  </StandardText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <StandardText textAlign="center" size="md" style={{flex: 1}}>
                    Tenants
                  </StandardText>
                  <StandardText textAlign="center" size="md" style={{flex: 1}}>
                    Tenants
                  </StandardText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <StandardText textAlign="center" size="md" style={{flex: 1}}>
                    On-time: 56
                  </StandardText>
                  <Button
                    mode="contained"
                    buttonColor={theme.colors.white}
                    onPress={() => {}}
                    style={{
                      borderRadius: 5,
                      borderColor: theme.colors.black,
                      borderWidth: 1,
                    }}>
                    <MaterialCommunityIcons
                      name="whatsapp"
                      size={20}
                      color={theme.colors.black}
                    />
                    <StandardText
                      textAlign="center"
                      size="md"
                      style={{flex: 1}}>
                      REMIND TO PAY
                    </StandardText>
                  </Button>
                </View>
                <View>
                  <Button
                    mode="contained"
                    buttonColor={theme.colors.black}
                    style={{
                      width: '45%',
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                      borderRadius: 5,
                    }}
                    onPress={() => {
                      navigation.navigate('Settings');
                    }}>
                    <StandardText color="default_white">VIEW</StandardText>
                  </Button>
                </View>
              </View>
            </StandardCard>

            <Gap size="lg" />
            <StandardCard
              style={{
                elevation: 2,
              }}>
              <StandardText size="lg" fontWeight="bold" textAlign="center">
                Other Stats
              </StandardText>
              <View
                style={{
                  backgroundColor: theme.colors.white,
                  padding: 15,
                  borderRadius: 10,
                  marginTop: 10,
                  shadowColor: theme.colors.primary,
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}>
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
                    12 / 125
                  </StandardText>
                  <StandardText
                    textAlign="center"
                    size="md"
                    fontWeight="bold"
                    style={{flex: 1}}>
                    2 / 12
                  </StandardText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <StandardText textAlign="center" size="md" style={{flex: 1}}>
                    Beds
                  </StandardText>
                  <StandardText textAlign="center" size="md" style={{flex: 1}}>
                    Tenants
                  </StandardText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: 10,
                    alignItems: 'center',
                  }}>
                  <Button
                    mode="contained"
                    buttonColor={theme.colors.white}
                    style={{
                      width: '45%',
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                      borderRadius: 5,
                      borderColor: theme.colors.black,
                      borderWidth: 1,
                    }}
                    onPress={() => {}}>
                    <StandardText>VIEW</StandardText>
                  </Button>
                  <Button
                    mode="contained"
                    buttonColor={theme.colors.white}
                    style={{
                      width: '45%',
                      alignSelf: 'center',
                      marginTop: 10,
                      marginBottom: 10,
                      borderRadius: 5,
                      borderColor: theme.colors.black,
                      borderWidth: 1,
                    }}
                    onPress={() => {}}>
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
        <BottomSheetModal ref={bottomSheetModalRef} snapPoints={['90%']}>
          <BottomSheetView style={styles.contentContainer}>
            {console.log('Selected Action:', selectedAction)}
            {selectedAction && selectedAction.label === 'Add Tenant' && (
              <AddTenant handleClosePress={handleClosePress} />
            )}
            {selectedAction && selectedAction.label === 'Announce' && (
              <SendAnnouncement handleClosePress={handleClosePress} />
            )}
            {selectedAction && selectedAction.label === 'Payments' && (
              <RecordPayment handleClosePress={handleClosePress} />
            )}
            {selectedAction && selectedAction.label === 'Add Room' && (
              <AddRoom handleClosePress={handleClosePress} />
            )}
            {selectedAction && selectedAction.label === 'Contacts' && (
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
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;
