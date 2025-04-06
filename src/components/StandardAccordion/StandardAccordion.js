import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import React, {ReactNode, useCallback, useRef, useState} from 'react';
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
import {IconButton, useTheme} from 'react-native-paper';
const AnimatedBtn = Animated.createAnimatedComponent(TouchableHighlight);

const StandardAccordion = ({heading, icon, content}) => {
  const [expanded, setExpanded] = useState(false);
  const rotate = useSharedValue('0deg');
  const expandHeight = useSharedValue(0);
  const [contentHeight, setContentHeight] = useState(0);
  const toggleAccordion = () => {
    setExpanded(p => !p);
  };

  const styles = StyleSheet.create({
    dropDownIcon: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 30,
      width: 30,
      borderRadius: 30,
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
  );
};

export default StandardAccordion;
