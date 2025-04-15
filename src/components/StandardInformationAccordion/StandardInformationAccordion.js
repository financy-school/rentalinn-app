import {View, StyleSheet, TouchableHighlight} from 'react-native';
import React, {useContext, useState} from 'react';
import StandardCard from '../StandardCard/StandardCard';
import StandardText from '../StandardText/StandardText';
import Gap from '../Gap/Gap';
import StandardSvg from '../StandardSvg/StandardSvg';
import {fadedColorOpacity, hexToRgba} from '../../theme/color';
import {getIconForType} from '../../theme/iconsUtil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ThemeContext} from '../../context/ThemeContext';

const AnimatedBtn = Animated.createAnimatedComponent(TouchableHighlight);
const AnimatedView = Animated.createAnimatedComponent(View);

const StandardInformationAccordion = ({heading, icon, content}) => {
  const {theme: mode} = useContext(ThemeContext);

  const [expanded, setExpanded] = useState(false);
  const [measured, setMeasured] = useState(false);
  const contentHeight = useSharedValue(0);
  const expandHeight = useSharedValue(0);
  const rotate = useSharedValue('0deg');

  const toggleAccordion = () => {
    setExpanded(prev => {
      const next = !prev;
      rotate.value = withTiming(next ? '180deg' : '0deg');
      expandHeight.value = withTiming(next ? contentHeight.value : 0, {
        duration: 300,
      });
      return next;
    });
  };

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{rotate: rotate.value}],
  }));

  const expandStyle = useAnimatedStyle(() => ({
    height: expandHeight.value,
    overflow: 'hidden',
  }));

  const onContentLayout = event => {
    const height = event.nativeEvent.layout.height;
    console.log('Content Height:', height);
    if (!measured && height > 0) {
      contentHeight.value = height;
      setMeasured(true);
    }
  };

  return (
    <View style={{position: 'relative'}}>
      <StandardCard>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headingContainer}>
            {icon && (
              <View style={styles.iconWrapper}>
                <MaterialCommunityIcons
                  name={icon}
                  size={35}
                  color={mode === 'dark' ? '#fff' : '#000'}
                />
              </View>
            )}
            <StandardText fontWeight="bold" size="lg">
              {heading}
            </StandardText>
          </View>

          <AnimatedBtn
            underlayColor={hexToRgba('#ff385c', fadedColorOpacity)}
            onPress={toggleAccordion}
            style={[styles.dropDownIcon, rotateStyle]}>
            <StandardSvg icon={getIconForType('Dropdown')} size="sm" />
          </AnimatedBtn>
        </View>

        {/* Animated Content */}
        <AnimatedView style={[expandStyle, styles.animatedContent]}>
          <View style={{paddingBottom: 8}}>
            <Gap size="sm" />
            {content}
          </View>
        </AnimatedView>

        {/* Hidden Measurer */}
        {!measured && (
          <View style={styles.hiddenMeasure} onLayout={onContentLayout}>
            {content}
          </View>
        )}
      </StandardCard>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    marginRight: 8,
  },
  dropDownIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenMeasure: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    left: -9999,
  },
  animatedContent: {
    overflow: 'hidden',
  },
});

export default StandardInformationAccordion;
