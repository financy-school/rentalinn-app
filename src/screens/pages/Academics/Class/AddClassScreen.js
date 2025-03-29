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
import {Colors} from '../../../components/styles';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const stepLabels = ['Class Details', 'Assign Subject & Teachers'];
import {MultiSelect} from 'react-native-element-dropdown';

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

export default function AddClassScreen({navigation}) {
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

  const subject_options = [
    {label: 'Math', value: 'math'},
    {label: 'Science', value: 'science'},
    {label: 'English', value: 'english'},
    {label: 'History', value: 'history'},
  ];

  const placeholder = {
    label: 'Select an option...',
    value: null,
  };

  const medium_placeholder = {
    label: 'Select Medium...',
    value: null,
  };

  const section_placeholder = {
    label: 'Select Sections...',
    value: null,
  };

  const stream_placeholder = {
    label: 'Select Stream...',
    value: null,
  };

  const subject_placeholder = {
    label: 'Select Subject...',
    value: null,
  };

  const class_teacher_placeholder = {
    label: 'Select Class Teacher...',
    value: null,
  };

  const stream_options = [
    {label: 'Science', value: 'Science'},
    {label: 'Commerce', value: 'Commerce'},
    {label: 'Arts', value: 'Arts'},
  ];

  const options = [
    {label: '2024-25', value: '2024-25'},
    {label: '2025-26', value: '2025-26'},
    {label: '2026-27', value: '2026-27'},
  ];

  const medium_options = [
    {label: 'English', value: 'English'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'Marathi', value: 'Marathi'},
  ];

  const section_options = [
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
  ];

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  useEffect(() => {
    setClassTeacherList([]);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Add Class" />
      </Appbar.Header>

      <View style={styles.stepperContainer}>
        <StepIndicator
          customStyles={customStyles}
          currentPosition={step}
          labels={stepLabels}
          stepCount={2}
        />
      </View>

      <View style={styles.container}>
        {step === 0 && (
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <Text>Class Name</Text>
              <TextInput
                placeholder="Class Name"
                style={styles.input}
                onChangeText={text => setClassName(text)}
                value={className}
              />
              <Text>Academic Year:</Text>
              <RNPickerSelect
                placeholder={placeholder}
                items={options}
                onValueChange={value => {
                  setAcademicYear(value);
                }}
                value={academicYear}
              />

              <Text>Medium of Instruction:</Text>
              <RNPickerSelect
                placeholder={medium_placeholder}
                items={medium_options}
                onValueChange={value => {
                  setMedium(value);
                }}
                value={medium}
              />

              <Text>Number of Sections:</Text>
              <RNPickerSelect
                placeholder={section_placeholder}
                items={section_options}
                onValueChange={value => {
                  setNumberOfSections(value);
                }}
                value={numberOfSections}
              />
            </View>

            <View>
              <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={nextStep}>
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
            </View>
          </View>
        )}

        {step === 1 && (
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
              <Text>Subjects:</Text>

              <MultiSelect
                style={{
                  marginBottom: 10,
                  borderWidth: 1,
                  padding: 10,
                  borderColor: 'lightgray',
                  borderRadius: 5,
                  marginTop: 5,
                }}
                data={subject_options}
                labelField="label"
                valueField="value"
                placeholder="Select Subjects"
                value={selectedSubjects}
                onChange={item => setSelectedSubjects(item)}
                selectedStyle={{
                  backgroundColor: 'lightgray',
                  color: 'black',
                  borderRadius: 5,
                }}
              />

              <Text>Assign Class Teacher:</Text>
              <RNPickerSelect
                placeholder={class_teacher_placeholder}
                items={classTeacherList}
                onValueChange={value => {
                  setClassTeacher(value);
                }}
                value={classTeacher}
              />
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
            </View>
          </View>
        )}
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
});
