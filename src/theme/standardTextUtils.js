import {
  fontColorType,
  fontSizeType,
  fontWeightType,
} from 'utils/types/typeStandardText';

export const fontSizeMap = {
  xs: 10,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
};

export const getFontSize = fontSize => {
  return fontSizeMap[fontSize];
};

export const handleFontWeight = fontWeight => {
  switch (fontWeight) {
    case 'semibold':
      return 'Metropolis-SemiBold';
    case 'bold':
      return 'Metropolis-Bold';
    case 'regular':
      return 'Metropolis-Regular';
    case 'medium':
      return 'Metropolis-Medium';
    case 'thin':
      return 'Metropolis-Thin';
    default:
      return 'Metropolis-Regular';
  }
};

export const fontColorMap = {
  default_red: '#FF385C',
  default_green: '#00940F',
  default_orange: '#F39E09',
  default_gray: '#222',
  faded_gray: '#888',
  default_white: '#fff',
};

export const getFontColor = fontColor => {
  return fontColorMap[fontColor];
};
export const createFontWeight = fontWeight => {
  switch (fontWeight) {
    case 'semibold':
      return '500';
    case 'bold':
      return '600';
    case 'medium':
      return '400';
    default:
      return '300';
  }
};
