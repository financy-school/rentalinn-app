import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Appbar} from 'react-native-paper';
import StepIndicator from 'react-native-step-indicator';
import {
  Colors,
  StyledFormArea,
  StyledTextInput,
} from '../../../components/styles';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const stepLabels = ['Class Details', 'Assign Subject & Teachers'];
import {MultiSelect} from 'react-native-element-dropdown';
import {Formik} from 'formik';
const {brand, darkLight, primary} = Colors;

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

export default function AddSubjectScreen({navigation}) {
  const [step, setStep] = useState(0);
  const [academicYear, setAcademicYear] = useState(null);
  const [medium, setMedium] = useState(null);
  const [stream, setStream] = useState(null);
  const [className, setClassName] = useState(null);
  const [numberOfSections, setNumberOfSections] = useState(null);
  const [classTeacher, setClassTeacher] = useState(null);
  const [subjectList, setSubjectList] = useState([]);

  const [classTeacherList, setClassTeacherList] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const medium_placeholder = {
    label: 'Select Medium...',
    value: null,
  };

  const subject_type_placeholder = {
    label: 'Select Type',
    value: null,
  };

  const medium_options = [
    {label: 'English', value: 'English'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Marathi', value: 'Marathi'},
  ];

  const sub_type_options = [
    {label: 'Theory', value: 'Theory'},
    {label: 'Practical', value: 'Practical'},
    {label: 'Theory & Practical', value: 'Theory & Practical'},
    {label: 'Project', value: 'Project'},
    {label: 'Oral', value: 'Oral'},
    {label: 'Co Curricular', value: 'Co Curricular'},
  ];

  useEffect(() => {
    setClassTeacherList([]);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Subject" />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View>
            <Formik
              initialValues={{
                subject_name: '',
                subject_code: '',
                medium: '',
                associated_classes: [],
                assigned_teachers: [],
                subject_type: '',
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
                  <MyTextInput
                    label="Subject Name"
                    icon="email"
                    placeholder="Subject Name"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('subject_name')}
                    onBlur={handleBlur('subject_name')}
                    value={values.subject_name}
                  />

                  <MyTextInput
                    label="Subject Code"
                    icon="email"
                    placeholder="Subject Code"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('subject_code')}
                    onBlur={handleBlur('subject_code')}
                    value={values.subject_code}
                  />

                  <RNPickerSelect
                    placeholder={medium_placeholder}
                    items={medium_options}
                    onValueChange={value => {
                      setFieldValue('medium', value);
                      setMedium(value);
                    }}
                    value={values.medium}
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
                      color: values.medium ? 'black' : 'gray',
                    }}
                    Icon={() => {
                      return (
                        <MaterialCommunityIcons name="menu-down" size={24} />
                      );
                    }}
                  />

                  <RNPickerSelect
                    placeholder={subject_type_placeholder}
                    items={sub_type_options}
                    onValueChange={value => {
                      setFieldValue('subject_type', value);
                    }}
                    value={values.subject_type}
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
                      color: values.subject_type ? 'black' : 'gray',
                    }}
                    Icon={() => {
                      return (
                        <MaterialCommunityIcons name="menu-down" size={24} />
                      );
                    }}
                  />
                </StyledFormArea>
              )}
            </Formik>
          </View>
          <View>
            <TouchableOpacity
              style={styles.addButtonContainer}
              onPress={() => {}}>
              <Text style={styles.addButtonText}>Save</Text>
              <MaterialCommunityIcons
                name="check"
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
      </View>
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
