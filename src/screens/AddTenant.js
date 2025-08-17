import React, {useContext, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {TextInput, Button, useTheme, Text, Avatar} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ThemeContext} from '../context/ThemeContext';
import Gap from '../components/Gap/Gap';
import StandardText from '../components/StandardText/StandardText';
import StandardCard from '../components/StandardCard/StandardCard';
import {addTenant} from '../services/NetworkUtils';
import {CredentialsContext} from '../context/CredentialsContext';

const AddTenant = ({navigation}) => {
  const {theme: mode} = useContext(ThemeContext);
  const theme = useTheme();
  const {credentials} = useContext(CredentialsContext);

  const [tenant, setTenant] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    idProofType: '',
    idProofNumber: '',
    roomId: '',
    checkInDate: '',
    checkOutDate: '',
  });

  const handleChange = (key, value) => {
    setTenant({...tenant, [key]: value});
  };

  const handleSubmit = async () => {
    console.log('New Tenant:', tenant);

    try {
      const res = await addTenant(
        credentials.accessToken,
        credentials.property_id,
        tenant,
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error adding tenant:', JSON.stringify(error));
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={{padding: 16}}>
          <Gap size="md" />

          <StandardCard>
            <View style={styles.cardContent}>
              <MaterialCommunityIcons
                name="account-circle"
                size={100}
                color="#888"
              />

              <View style={{flex: 1, marginLeft: 16}}>
                <StandardText fontWeight="bold" size="xl">
                  Add New Tenant
                </StandardText>
              </View>
            </View>
          </StandardCard>

          <Gap size="md" />

          <TextInput
            label="Full Name"
            value={tenant.name}
            onChangeText={text => handleChange('name', text)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Phone Number"
            value={tenant.phoneNumber}
            onChangeText={text => handleChange('phoneNumber', text)}
            mode="outlined"
            keyboardType="phone-pad"
            style={styles.input}
          />

          <TextInput
            label="Email"
            value={tenant.email}
            onChangeText={text => handleChange('email', text)}
            mode="outlined"
            keyboardType="email-address"
            style={styles.input}
          />

          <TextInput
            label="ID Proof Type (e.g., Aadhar, PAN)"
            value={tenant.idProofType}
            onChangeText={text => handleChange('idProofType', text)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="ID Proof Number"
            value={tenant.idProofNumber}
            onChangeText={text => handleChange('idProofNumber', text)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Room ID / Number"
            value={tenant.roomId}
            onChangeText={text => handleChange('roomId', text)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Check-in Date (YYYY-MM-DD)"
            value={tenant.checkInDate}
            onChangeText={text => handleChange('checkInDate', text)}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Check-out Date (YYYY-MM-DD)"
            value={tenant.checkOutDate}
            onChangeText={text => handleChange('checkOutDate', text)}
            mode="outlined"
            style={styles.input}
          />

          <Gap size="lg" />

          <Button
            mode="contained"
            onPress={handleSubmit}
            style={{borderRadius: 5}}>
            <StandardText fontWeight="bold" color="default_white">
              Save Tenant
            </StandardText>
          </Button>

          <Gap size="xxl" />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AddTenant;
