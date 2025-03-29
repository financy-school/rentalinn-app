import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import {Colors} from '../../../components/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ClassScreen({navigation}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  console.log('Navigation', navigation);

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#fff'}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Class'} color="#000" />
      </Appbar.Header>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.heading}>Add Classes</Text>
          <Text style={styles.description}>
            Ensure the class is created under the correct academic session.
          </Text>

          <View style={styles.content}>
            <Image
              source={require('../../../assets/not_found.png')}
              style={styles.image}
            />

            <Text style={styles.infoText}>
              Organize students and subjects efficiently by creating a class.
              Add sections, assign teachers, and set up subjects in just a few
              steps!
            </Text>
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.addButtonContainer}
          onPress={() => {
            console.log('Add Class  Button Pressed');
            navigation.navigate('AddClassScreen');
          }}>
          <MaterialCommunityIcons
            name="plus"
            size={20}
            color="#fff"
            style={{
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
          <Text style={styles.addButtonText}>Add Classes</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 100, // To prevent overlap with the fixed button
  },
  heading: {
    fontSize: 20,
    color: Colors.brand,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    color: Colors.darkLight,
  },
  content: {
    marginTop: 20,
    padding: 10,
    height: '100%',
  },
  image: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    opacity: 0.5,
  },
  infoText: {
    fontSize: 12,
    color: Colors.primary,
    marginVertical: 10,
    textAlign: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: Colors.brand,
    padding: 15,
    borderRadius: 5,
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
