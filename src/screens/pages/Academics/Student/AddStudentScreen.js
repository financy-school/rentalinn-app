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

export default function AddStudentScreen({navigation}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#fff'}}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Students'} color="#000" />
      </Appbar.Header>

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.heading}>
                How would you like to add students?
              </Text>
              <Text style={styles.description}>
                Choose an option to proceed. You can add students individually
                or upload a list for bulk entry.
              </Text>

              <TouchableOpacity
                style={styles.content}
                onPress={() => {
                  navigation.navigate('AddStudent');
                }}>
                <View
                  style={{
                    backgroundColor: Colors.brand,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}>
                  <MaterialCommunityIcons
                    name="account-plus"
                    size={30}
                    color={Colors.secondary}
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </View>
                <Text style={styles.infoText}>Add students individually</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.content}
                onPress={() => {
                  navigation.navigate('AddStudent');
                }}>
                <View
                  style={{
                    backgroundColor: Colors.brand,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                  }}>
                  <MaterialCommunityIcons
                    name="file-upload"
                    size={30}
                    color={Colors.secondary}
                    style={{
                      alignSelf: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                </View>
                <Text style={styles.infoText}>Upload Students List</Text>
              </TouchableOpacity>
            </View>
            {/* <View>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={() => {
                  navigation.navigate('AddStudent');
                }}>
                <Text style={styles.addButtonText}>Next</Text>
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={20}
                  color="#fff"
                  style={{
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 18,
    color: Colors.brand,
    marginVertical: 10,
    textAlign: 'center',
    marginLeft: 30,
    fontWeight: 'bold',
  },
  addButtonContainer: {
    justifyContent: 'flex-end',
    backgroundColor: Colors.brand,
    padding: 15,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
