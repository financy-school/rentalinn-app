import React, {useContext, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Checkbox,
  Divider,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {CredentialsContext} from '../context/CredentialsContext';
import {createRoom} from '../services/NetworkUtils';
import StandardCard from '../components/StandardCard/StandardCard';
import Gap from '../components/Gap/Gap';

const AddRoomSchema = Yup.object().shape({
  name: Yup.string().required('Room name is required'),
  description: Yup.string(),
  area: Yup.number()
    .typeError('Area must be a number')
    .positive('Area must be positive')
    .required('Area is required'),
  rentAmount: Yup.number()
    .typeError('Rent must be a number')
    .positive('Rent must be positive')
    .required('Rent amount is required'),
  securityDeposit: Yup.number()
    .typeError('Security deposit must be a number')
    .min(0, 'Security deposit cannot be negative'),
  floorNumber: Yup.number()
    .typeError('Floor number must be a number')
    .integer('Floor number must be an integer'),
  bedroomCount: Yup.number()
    .typeError('Bedroom count must be a number')
    .integer('Bedroom count must be an integer')
    .min(0, 'Bedroom count cannot be negative'),
  bathroomCount: Yup.number()
    .typeError('Bathroom count must be a number')
    .min(0, 'Bathroom count cannot be negative'),
  amenities: Yup.string(),
});

const AddRoom = ({navigation}) => {
  const {credentials} = useContext(CredentialsContext);
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    name: '',
    description: '',
    area: '',
    rentAmount: '',
    securityDeposit: '',
    isAvailable: true,
    floorNumber: '',
    bedroomCount: '',
    bathroomCount: '',
    isFurnished: false,
    amenities: '',
  };

  const handleAddRoom = async (values, {resetForm}) => {
    setLoading(true);
    setError('');

    try {
      // Convert string inputs to numbers
      const roomData = {
        ...values,
        area: parseFloat(values.area),
        rentAmount: parseFloat(values.rentAmount),
        securityDeposit: parseFloat(values.securityDeposit || 0),
        floorNumber: values.floorNumber ? parseInt(values.floorNumber) : null,
        bedroomCount: values.bedroomCount
          ? parseInt(values.bedroomCount)
          : null,
        bathroomCount: values.bathroomCount
          ? parseInt(values.bathroomCount)
          : null,
      };

      await createRoom(
        credentials.accessToken,
        credentials.property_id,
        roomData,
      );

      resetForm();
      // Navigate back to rooms screen with a refresh flag
      navigation.navigate('Rooms', {refresh: true});
    } catch (err) {
      console.error('Failed to add room:', err);

      let errorMessage = 'Failed to add room. Please try again.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage =
          typeof err.response.data.message === 'string'
            ? err.response.data.message
            : err.response.data.message.join(', ');
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <StandardCard>
          <Text style={styles.heading}>Add New Room</Text>
          <Divider style={styles.divider} />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Formik
            initialValues={initialValues}
            validationSchema={AddRoomSchema}
            onSubmit={handleAddRoom}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              touched,
            }) => (
              <View>
                <TextInput
                  label="Room Name*"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  error={touched.name && errors.name}
                  style={styles.input}
                  mode="outlined"
                />
                {touched.name && errors.name && (
                  <HelperText type="error">{errors.name}</HelperText>
                )}

                <TextInput
                  label="Description"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  multiline
                  numberOfLines={3}
                  style={styles.input}
                  mode="outlined"
                />

                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <TextInput
                      label="Area (sqft)*"
                      value={values.area}
                      onChangeText={handleChange('area')}
                      onBlur={handleBlur('area')}
                      error={touched.area && errors.area}
                      keyboardType="numeric"
                      style={styles.input}
                      mode="outlined"
                    />
                    {touched.area && errors.area && (
                      <HelperText type="error">{errors.area}</HelperText>
                    )}
                  </View>

                  <View style={styles.halfInput}>
                    <TextInput
                      label="Floor Number"
                      value={values.floorNumber}
                      onChangeText={handleChange('floorNumber')}
                      onBlur={handleBlur('floorNumber')}
                      error={touched.floorNumber && errors.floorNumber}
                      keyboardType="numeric"
                      style={styles.input}
                      mode="outlined"
                    />
                    {touched.floorNumber && errors.floorNumber && (
                      <HelperText type="error">{errors.floorNumber}</HelperText>
                    )}
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <TextInput
                      label="Rent Amount ($)*"
                      value={values.rentAmount}
                      onChangeText={handleChange('rentAmount')}
                      onBlur={handleBlur('rentAmount')}
                      error={touched.rentAmount && errors.rentAmount}
                      keyboardType="numeric"
                      style={styles.input}
                      mode="outlined"
                    />
                    {touched.rentAmount && errors.rentAmount && (
                      <HelperText type="error">{errors.rentAmount}</HelperText>
                    )}
                  </View>

                  <View style={styles.halfInput}>
                    <TextInput
                      label="Security Deposit ($)"
                      value={values.securityDeposit}
                      onChangeText={handleChange('securityDeposit')}
                      onBlur={handleBlur('securityDeposit')}
                      error={touched.securityDeposit && errors.securityDeposit}
                      keyboardType="numeric"
                      style={styles.input}
                      mode="outlined"
                    />
                    {touched.securityDeposit && errors.securityDeposit && (
                      <HelperText type="error">
                        {errors.securityDeposit}
                      </HelperText>
                    )}
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={styles.halfInput}>
                    <TextInput
                      label="Bedroom Count"
                      value={values.bedroomCount}
                      onChangeText={handleChange('bedroomCount')}
                      onBlur={handleBlur('bedroomCount')}
                      error={touched.bedroomCount && errors.bedroomCount}
                      keyboardType="numeric"
                      style={styles.input}
                      mode="outlined"
                    />
                    {touched.bedroomCount && errors.bedroomCount && (
                      <HelperText type="error">
                        {errors.bedroomCount}
                      </HelperText>
                    )}
                  </View>

                  <View style={styles.halfInput}>
                    <TextInput
                      label="Bathroom Count"
                      value={values.bathroomCount}
                      onChangeText={handleChange('bathroomCount')}
                      onBlur={handleBlur('bathroomCount')}
                      error={touched.bathroomCount && errors.bathroomCount}
                      keyboardType="numeric"
                      style={styles.input}
                      mode="outlined"
                    />
                    {touched.bathroomCount && errors.bathroomCount && (
                      <HelperText type="error">
                        {errors.bathroomCount}
                      </HelperText>
                    )}
                  </View>
                </View>

                <TextInput
                  label="Amenities"
                  value={values.amenities}
                  onChangeText={handleChange('amenities')}
                  onBlur={handleBlur('amenities')}
                  placeholder="e.g., WiFi, AC, Water Heater (separate by commas)"
                  style={styles.input}
                  mode="outlined"
                />

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={values.isFurnished ? 'checked' : 'unchecked'}
                    onPress={() =>
                      setFieldValue('isFurnished', !values.isFurnished)
                    }
                    color={theme.colors.primary}
                  />
                  <Text style={styles.checkboxLabel}>Furnished Room</Text>
                </View>

                <View style={styles.checkboxContainer}>
                  <Checkbox
                    status={values.isAvailable ? 'checked' : 'unchecked'}
                    onPress={() =>
                      setFieldValue('isAvailable', !values.isAvailable)
                    }
                    color={theme.colors.primary}
                  />
                  <Text style={styles.checkboxLabel}>Available for Rent</Text>
                </View>

                <Gap size="md" />

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading}
                  style={styles.button}>
                  Add Room
                </Button>

                <Button
                  mode="outlined"
                  onPress={() => navigation.goBack()}
                  style={styles.button}
                  disabled={loading}>
                  Cancel
                </Button>
              </View>
            )}
          </Formik>
        </StandardCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  scrollView: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  divider: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    marginVertical: 8,
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 16,
  },
});

export default AddRoom;
