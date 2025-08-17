import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import {
  ButtonText,
  Colors,
  MsgBox,
  StyledButton,
  StyledFormArea,
  StyledTextInput,
} from '../../../components/styles';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const stepLabels = ['Basic Details', 'Guardian Details'];

import {Formik} from 'formik';
import LinearGradient from 'react-native-linear-gradient';
const {darkLight, primary} = Colors;
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const customStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 30,
  stepStrokeWidth: 5,
  separatorStrokeWidth: 8,
  stepIndicatorFinishedColor: Colors.brand,
  stepIndicatorUnFinishedColor: Colors.light_brand,
  stepIndicatorCurrentColor: Colors.brand,
  separatorFinishedColor: Colors.brand,
  separatorUnFinishedColor: Colors.light_brand,
  stepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: '#ffffff',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: Colors.tertiary,
  stepStrokeCurrentColor: Colors.brand,
  stepStrokeFinishedColor: Colors.brand,
  stepStrokeUnFinishedColor: Colors.light_brand,
  currentStepLabelColor: Colors.darkLight,
  labelColor: Colors.tertiary,
  labelSize: 13,
};

export default function AddStudent({navigation}) {
  const [step, setStep] = useState(0);
  const [classTeacher, setClassTeacher] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [classTeacherList, setClassTeacherList] = useState([]);

  const [showDatepicker, setShowDatepicker] = useState(false);

  const guardian_relationship_options = [
    {label: 'Father', value: 'father'},
    {label: 'Mother', value: 'mother'},
    {label: 'Guardian', value: 'guardian'},
  ];

  const gender_placeholder = {
    label: 'Select Gender...',
    value: null,
  };

  const class_section_placeholder = {
    label: 'Select Class Section...',
    value: null,
  };

  const guardian_relationship_placeholder = {
    label: 'Select Guardian Relationship...',
    value: null,
  };

  const gender_options = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];

  const class_section_options = [
    {label: '1A', value: '1a'},
    {label: '1B', value: '1b'},
    {label: '1C', value: '1c'},
    {label: '2A', value: '2a'},
    {label: '2B', value: '2b'},
    {label: '2C', value: '2c'},
  ];

  const pickImageFromCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        allowsEditing: true,
        aspectRatio: [4, 3],
        quality: 1,
      },
      response => {
        console.log(response);

        if (!response.didCancel) {
          setImage(response.assets[0].uri);
        }
      },
    );
  };

  const pickImageFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        allowsEditing: true,
        aspectRatio: [4, 3],
        quality: 1,
      },
      response => {
        console.log(response);

        if (!response.didCancel) {
          setImage(response.assets[0].uri);
        }
      },
    );
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const onChangeDate = (event, selectedDate, setFieldValue) => {
    if (selectedDate) {
      setShowDatepicker(false);
      const selectedDateIST = moment(selectedDate).utcOffset(330);
      const formattedDate = selectedDateIST.format('DD-MM-YYYY');
      setFieldValue('dob', selectedDate);
      setFieldValue('formattedDob', formattedDate);
    }
  };

  useEffect(() => {
    setClassTeacherList([]);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Students" />
      </Appbar.Header>

      <View style={styles.stepperContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={step}
          labels={stepLabels}
          stepCount={2}
        />
      </View>

      <ScrollView>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            gender: '',
            dob: new Date(),
            formattedDob: '',
            aadhar_number: '',
            admission_number: '',
            roll_number: '',
            sec_class: '',
            email: '',
            guardian_name: '',
            guardian_email: '',
            guardian_phone: '',
            guardian_relationship: '',
            address: '',
            city: '',
          }}
          onSubmit={(values, {setSubmitting}) => {
            if (values.email === '' || values.password === '') {
              handleMessage('Please fill in all fields');
              setSubmitting(false);
            } else {
              handleMessage('Logging in...', true);
              handleLogin(values, setSubmitting);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
            setFieldValue,
          }) => (
            <StyledFormArea>
              <View style={styles.container}>
                {step === 0 && (
                  <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <MyTextInput
                          label="First Name"
                          icon="email"
                          placeholder="First Name"
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          keyboardType="email-address"
                        />
                        <MyTextInput
                          label="Last Name"
                          icon="email"
                          placeholder="Last Name"
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                          keyboardType="email-address"
                        />
                      </View>

                      <RNPickerSelect
                        placeholder={gender_placeholder}
                        items={gender_options}
                        onValueChange={value => {
                          setFieldValue('gender', value);
                        }}
                        value={values.gender}
                        style={{
                          ...styles.pickerSelectStyles,
                          iconContainer: {
                            top: 10,
                            right: 12,
                          },
                        }}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{
                          fontSize: 17,
                          color: values.gender ? 'black' : 'gray',
                        }}
                        Icon={() => {
                          return (
                            <MaterialCommunityIcons
                              name="menu-down"
                              size={24}
                            />
                          );
                        }}
                      />
                      <MyTextInput
                        label="Aadhar Number"
                        icon="email"
                        placeholder="Aadhar Number"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('aadhar_number')}
                        onBlur={handleBlur('aadhar_number')}
                        value={values.aadhar_number}
                      />
                      <MyTextInput
                        label="Admission Number"
                        icon="email"
                        placeholder="Admission Number"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('admission_number')}
                        onBlur={handleBlur('admission_number')}
                        value={values.admission_number}
                      />

                      <MyTextInput
                        label="Roll Number"
                        icon="email"
                        placeholder="Roll Number"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('roll_number')}
                        onBlur={handleBlur('roll_number')}
                        value={values.roll_number}
                      />

                      <RNPickerSelect
                        placeholder={class_section_placeholder}
                        items={class_section_options}
                        onValueChange={value => {
                          setFieldValue('sec_class', value);
                        }}
                        value={values.sec_class}
                        style={{
                          ...styles.pickerSelectStyles,
                          iconContainer: {
                            top: 10,
                            right: 12,
                          },
                        }}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{
                          fontSize: 17,
                          color: values.sec_class ? 'black' : 'gray',
                        }}
                        Icon={() => {
                          return (
                            <MaterialCommunityIcons
                              name="menu-down"
                              size={24}
                            />
                          );
                        }}
                      />

                      <TouchableOpacity onPress={() => setShowDatepicker(true)}>
                        <MyTextInput
                          label="Date of Birth"
                          icon="calendar"
                          placeholder="DD-MM-YYYY"
                          placeholderTextColor={darkLight}
                          onChangeText={handleChange('dob')}
                          onBlur={() => handleBlur('dob')}
                          value={values.formattedDob}
                          isDate={true}
                          editable={false}
                        />
                      </TouchableOpacity>

                      {showDatepicker && (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={values.dob}
                          mode="date"
                          is24Hour={true}
                          display="default"
                          onChange={(event, date) =>
                            onChangeDate(event, date, setFieldValue)
                          }
                        />
                      )}

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          margin: 5,
                        }}>
                        <StyledButton onPress={pickImageFromCamera}>
                          <LinearGradient
                            colors={['#6579BE', '#556BFF']}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 1}}
                            style={{
                              width: '100%',
                              'border-radius': 5,
                              height: 50,
                              borderRadius: 5,
                              padding: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ButtonText>Capture Image</ButtonText>
                          </LinearGradient>
                        </StyledButton>
                        <StyledButton onPress={pickImageFromGallery}>
                          <LinearGradient
                            colors={['#6579BE', '#556BFF']}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 1}}
                            style={{
                              width: '100%',
                              'border-radius': 5,
                              height: 50,
                              borderRadius: 5,
                              padding: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <ButtonText>Pick Image</ButtonText>
                          </LinearGradient>
                        </StyledButton>
                      </View>
                      {image && (
                        <StyledButton onPress={handleUpload}>
                          <ButtonText>Upload</ButtonText>
                        </StyledButton>
                      )}

                      <MsgBox type={messageType}>{message}</MsgBox>
                      {!isSubmitting ? (
                        <StyledButton onPress={nextStep}>
                          <LinearGradient
                            colors={['#6579BE', '#556BFF']}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0.5, y: 1}}
                            style={{
                              flex: 1,
                              width: '100%',
                              'border-radius': 5,
                              height: 50,
                              borderRadius: 5,
                              padding: 15,
                              justifyContent: 'center',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <ButtonText>Next</ButtonText>
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
                          </LinearGradient>
                        </StyledButton>
                      ) : (
                        <StyledButton disabled={true}>
                          <ActivityIndicator size="large" color={primary} />
                        </StyledButton>
                      )}
                    </View>
                  </View>
                )}

                {step === 1 && (
                  <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <View>
                      <MyTextInput
                        label="Guardian Name"
                        icon="email"
                        placeholder="Guardian Name"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('guardian_name')}
                        onBlur={handleBlur('guardian_name')}
                        value={values.guardian_name}
                      />

                      <MyTextInput
                        label="Guardian Email"
                        icon="email"
                        placeholder="Guardian Email"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('guardian_email')}
                        onBlur={handleBlur('guardian_email')}
                        value={values.guardian_email}
                      />

                      <RNPickerSelect
                        placeholder={guardian_relationship_placeholder}
                        items={guardian_relationship_options}
                        onValueChange={value => {
                          setClassTeacher(value);
                        }}
                        value={classTeacher}
                        style={{
                          ...styles.pickerSelectStyles,
                          iconContainer: {
                            top: 10,
                            right: 12,
                          },
                        }}
                        useNativeAndroidPickerStyle={false}
                        textInputProps={{
                          fontSize: 17,
                          color: classTeacher ? 'black' : 'gray',
                        }}
                        Icon={() => {
                          return (
                            <MaterialCommunityIcons
                              name="menu-down"
                              size={24}
                            />
                          );
                        }}
                      />

                      <MyTextInput
                        label="Guardian Phone"
                        icon="email"
                        placeholder="Guardian Phone"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('guardian_phone')}
                        onBlur={handleBlur('guardian_phone')}
                        value={values.guardian_phone}
                      />

                      <MyTextInput
                        label="Address"
                        icon="email"
                        placeholder="Address"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('address')}
                        onBlur={handleBlur('address')}
                        value={values.address}
                      />

                      <MyTextInput
                        label="City"
                        icon="email"
                        placeholder="City"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('city')}
                        onBlur={handleBlur('city')}
                        value={values.city}
                      />

                      <MsgBox type={messageType}>{message}</MsgBox>
                    </View>

                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <TouchableOpacity
                        style={[
                          styles.addButtonContainer,
                          {
                            width: '40%',
                          },
                        ]}
                        onPress={prevStep}>
                        <MaterialCommunityIcons
                          name="arrow-left"
                          size={20}
                          color="#fff"
                          style={{
                            marginRight: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        />
                        <Text style={styles.addButtonText}>Prev</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.addButtonContainer,
                          {
                            width: '40%',
                          },
                        ]}
                        onPress={() => {
                          navigation.goBack();
                        }}>
                        <Text style={styles.addButtonText}>Submit</Text>
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
                    </View>
                  </View>
                )}
              </View>
            </StyledFormArea>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  stepperContainer: {
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.darkLight,
  },
  input: {
    borderWidth: 0,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
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
  pickerSelectStyles: {
    fontSize: 17,
    paddingVertical: 12,
    // paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <StyledTextInput {...props} />
    </View>
  );
};
