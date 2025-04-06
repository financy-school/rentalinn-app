import {Platform, StyleSheet} from 'react-native';
import {getColor} from './color';

export const screenPadding = 16;
export const totalHorizontalPadding = screenPadding * 2;
export const cardPadding = 16;
export const roundnessToSizeMap = {
  full: 100,
  xl: 32,
  lg: 24,
  md: 16,
  sm: 12,
  xs: 8,
};

export const standardBorderRadius = 8;

export const cardShadow = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: getColor('black'),
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 0,
      },
      android: {
        shadowColor: getColor('black'),
        elevation: 6,
        shadowOffset: {width: 0, height: 10},
        zIndex: 0,
      },
    }),
  },
});
