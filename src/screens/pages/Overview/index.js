import {Formik} from 'formik';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Overview = ({navigation}) => {
  const [messageType, setMessageType] = useState();
  const [message, setMessage] = useState();
  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#000',
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

export default Overview;
