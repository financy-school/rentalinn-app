import React, {useState, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  TextInput as PaperInput,
  Button,
  useTheme,
  Text,
} from 'react-native-paper';
import {CredentialsContext} from '../context/CredentialsContext';
import {createTicket} from '../services/NetworkUtils';
import StandardText from '../components/StandardText/StandardText';

const AddTicket = ({navigation}) => {
  const theme = useTheme();
  const {credentials} = useContext(CredentialsContext);
  const [form, setForm] = useState({
    issue: '',
    description: '',
    raisedBy: '',
    roomId: '',
    userId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        ...form,
        propertyId: credentials.property_id,
        status: 'PENDING',
        userId: parseInt(form.userId, 10),
        roomId: parseInt(form.roomId, 10),
      };
      await createTicket(credentials.accessToken, payload);
      setSuccess('Ticket created successfully!');
      setForm({issue: '', description: '', raisedBy: '', roomId: ''});
      // Optionally navigate back or to tickets list
      // navigation.goBack();
    } catch (err) {
      console.log(err);
      setError('Failed to create ticket.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StandardText fontWeight="bold" size="xl" style={{marginBottom: 20}}>
        Create New Ticket
      </StandardText>
      <PaperInput
        label="Issue"
        value={form.issue}
        onChangeText={text => handleChange('issue', text)}
        style={styles.input}
      />
      <PaperInput
        label="Description"
        value={form.description}
        onChangeText={text => handleChange('description', text)}
        style={styles.input}
        multiline
      />
      <PaperInput
        label="Raised By"
        value={form.raisedBy}
        onChangeText={text => handleChange('raisedBy', text)}
        style={styles.input}
      />

      <PaperInput
        label="User ID"
        value={form.userId}
        onChangeText={text => handleChange('userId', text)}
        style={styles.input}
      />

      <PaperInput
        label="Room ID"
        value={form.roomId}
        onChangeText={text => handleChange('roomId', text)}
        style={styles.input}
      />
      {error ? (
        <Text style={{color: 'red', marginBottom: 10}}>{error}</Text>
      ) : null}
      {success ? (
        <Text style={{color: 'green', marginBottom: 10}}>{success}</Text>
      ) : null}
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        style={{marginTop: 20}}>
        Create Ticket
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
  },
});

export default AddTicket;
