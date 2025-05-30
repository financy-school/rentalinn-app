import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import StandardCard from '../StandardCard/StandardCard';

import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import StandardText from '../StandardText/StandardText';
import Gap from '../Gap/Gap';
import StandardSvg from '../StandardSvg/StandardSvg';
import {fadedColorOpacity, hexToRgba} from '../../theme/color';
import {getIconForType} from '../../theme/iconsUtil';
import {Button, IconButton, useTheme} from 'react-native-paper';
import {Modal} from 'react-native';
const AnimatedBtn = Animated.createAnimatedComponent(TouchableHighlight);

import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from 'react-native-ui-datepicker';

import dayjs from 'dayjs';
import {ThemeContext} from '../../context/ThemeContext';

const StandardAccordion = ({heading, icon, content}) => {
  const {theme: mode, toggleTheme} = useContext(ThemeContext);
  const theme = useTheme();

  const [expanded, setExpanded] = useState(false);
  const rotate = useSharedValue('0deg');
  const expandHeight = useSharedValue(0);

  const [contentHeight, setContentHeight] = useState(0);
  const toggleAccordion = () => {
    setExpanded(p => !p);
  };

  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedRange, setSelectedRange] = useState({
    startDate: null,
    endDate: null,
  });

  const defaultStyles = useDefaultStyles();

  const calendarStyles = {
    ...defaultStyles,
    container: {
      ...defaultStyles.container,
      backgroundColor: mode === 'dark' ? '#121212' : '#fff',
    },
    headerContent: {
      ...defaultStyles.headerContent,
      backgroundColor: mode === 'dark' ? '#1e1e1e' : '#fff',
    },
    monthTitleText: {
      ...defaultStyles.monthTitleText,
      color: mode === 'dark' ? '#ffffff' : '#000000',
    },
    weekDayLabelText: {
      ...defaultStyles.weekDayLabelText,
      color: mode === 'dark' ? '#bbbbbb' : '#666666',
    },
    dateText: {
      ...defaultStyles.dateText,
      color: mode === 'dark' ? '#ffffff' : '#000000',
    },
    selectedDateContainer: {
      ...defaultStyles.selectedDateContainer,
      backgroundColor: mode === 'dark' ? '#333333' : theme.colors.primary,
    },
    selectedDateText: {
      ...defaultStyles.selectedDateText,
      color: '#fff',
    },
  };

  const styles = StyleSheet.create({
    dropDownIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 30,
      borderRadius: 30,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'center',
      padding: 20,
    },
    calendarContainer: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
    },
  });

  const rotateStyle = useAnimatedStyle(() => {
    rotate.value = expanded ? '180deg' : '0deg';
    return {
      transform: [
        {
          rotate: withSpring(rotate.value, {
            duration: 2000,
            dampingRatio: 0.5,
            stiffness: 100,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 2,
          }),
        },
      ],
    };
  });
  const expandStyle = useAnimatedStyle(() => {
    expandHeight.value = expanded ? contentHeight : 0;
    return {
      height: withTiming(expandHeight.value),
    };
  });

  const onContentSizeChange = (width, height) => {
    setContentHeight(height);
    expandHeight.value = withTiming(height);
  };
  return (
    <View style={{position: 'relative'}}>
      <View
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          backgroundColor: theme.colors.background,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          paddingHorizontal: 8,
          paddingVertical: 4,
          flexDirection: 'row',
          alignItems: 'center',
          zIndex: 10,
        }}>
        <StandardText size="sm" style={{marginRight: 6}}>
          {selectedRange.startDate && selectedRange.endDate
            ? `${dayjs(selectedRange.startDate).format('MMM DD')} - ${dayjs(
                selectedRange.endDate,
              ).format('MMM DD')}`
            : 'Select date'}
        </StandardText>
        <IconButton
          icon="calendar"
          size={20}
          onPress={() => setCalendarVisible(true)}
          style={{margin: 0}}
        />
      </View>

      <Modal
        visible={calendarVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCalendarVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            <DateTimePicker
              mode="range"
              onChange={range => {
                setSelectedRange({
                  startDate: dayjs(range.startDate),
                  endDate: dayjs(range.endDate),
                });
              }}
              styles={calendarStyles}
              startDate={selectedRange.startDate}
              endDate={selectedRange.endDate}
              locale="en"
            />
            <Gap size="sm" />
            {/* Button for cancel and done */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                mode="outlined"
                buttonColor={theme.colors.white}
                textColor={theme.colors.black}
                style={{
                  width: '45%',
                  alignSelf: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setCalendarVisible(false);
                  setSelectedRange({
                    startDate: null,
                    endDate: null,
                  });
                }}>
                Cancel
              </Button>
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
                  setCalendarVisible(false);
                  // Handle the selected range here
                  console.log('Selected Range:', selectedRange);
                }}>
                Done
              </Button>
            </View>
          </View>
        </View>
      </Modal>
      <StandardCard>
        <StandardText fontWeight="bold" size="lg">
          REVENUE
        </StandardText>
        <StandardText fontWeight="bold" size="2xl">
          ₹ 52365
        </StandardText>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <StandardText size="sm" color="faded_gray">
            +0.6%
          </StandardText>
          <IconButton
            icon={'arrow-up'}
            iconColor={'#5fbc6e'}
            style={{
              padding: 0,
              borderRadius: 20,
              elevation: 2,
            }}
            size={20}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <StandardText>From last month</StandardText>
            <AnimatedBtn
              underlayColor={hexToRgba('#ff385c', fadedColorOpacity)}
              onPress={toggleAccordion}
              style={[styles.dropDownIcon, rotateStyle]}>
              <StandardSvg icon={getIconForType('Dropdown')} size={'sm'} />
            </AnimatedBtn>
          </View>
        </View>
        <Animated.ScrollView
          style={[expandStyle]}
          onContentSizeChange={onContentSizeChange}>
          <Gap size="sm" />
          <StandardText size="sm">{content}</StandardText>
        </Animated.ScrollView>
      </StandardCard>
    </View>
  );
};

export default StandardAccordion;
