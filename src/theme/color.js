const colors = {
  primary: '#6200EE',
  secondary: '#00C49A',
  accent: '#FFB400',
  backgroundLight: '#F8F9FA',
  backgroundDark: '#212529',
  textPrimary: '#212529',
  textSecondary: '#6C757D',
  success: '#28A745',
  error: '#DC3545',
  warning: '#FFC107',
  info: '#17A2B8',
  white: '#FFFFFF',
  black: '#000000',
  light_black: '#343A40',
  light_gray: '#CED4DA',
};

export default colors;

export const fadedColorOpacity = 0.5;

export const getNameForColor = ({textColor}) => {
  if (textColor === thresholdColor?.red?.textColor) {
    return 'default_red';
  }
  if (textColor === thresholdColor?.green?.textColor) {
    return 'default_green';
  }
  if (textColor === thresholdColor?.orange?.textColor) {
    return 'default_orange';
  }
  return 'default_gray';
};

export const formatRingColor = (type, valueAny) => {
  const value = Number(valueAny);
  let color, textColor;
  const threshold = getThreshold(type);
  const {red, green, orange} = thresholdColor;

  switch (type) {
    case 'locked':
      return {color: '#666666', textColor: '#666666'};
    case 'tir':
      color =
        value < threshold.red
          ? red.color
          : value < threshold?.orange
          ? orange.color
          : green.color;
      textColor =
        value < threshold.red
          ? red.textColor
          : value < threshold?.orange
          ? orange.textColor
          : green.textColor;
      return {color, textColor};

    case 'glucose_variability':
      color = value < 12 ? green.color : value < 15 ? orange.color : red.color;
      textColor =
        value < 12
          ? green.textColor
          : value < 15
          ? orange.textColor
          : red.textColor;

      return {color, textColor};
    case 'movement_index':
      color =
        value < threshold.red
          ? red.color
          : value < threshold.orange
          ? orange.color
          : green.color;
      textColor =
        value < threshold.red
          ? red.textColor
          : value < threshold.orange
          ? orange.textColor
          : green.textColor;
      return {color, textColor};
    case 'sleep_score':
      color =
        value < threshold?.red
          ? red.color
          : value < threshold?.orange
          ? orange.color
          : green.color;
      textColor =
        value < threshold?.red
          ? red.textColor
          : value < threshold?.orange
          ? orange.textColor
          : green.textColor;
      return {color, textColor};
    case 'hrv':
      color = value < 20 ? red.color : value < 60 ? orange.color : green.color;
      textColor =
        value < 20
          ? red.textColor
          : value < 60
          ? orange.textColor
          : green.textColor;
      return {color, textColor};

    case 'readiness':
      color = value < 60 ? red.color : value < 80 ? orange.color : green.color;
      textColor =
        value < 60
          ? red.textColor
          : value < 80
          ? orange.textColor
          : green.textColor;
      return {color, textColor};

    case 'temp':
      color =
        value < 20 || value > 32
          ? red.color
          : value < 30
          ? orange.color
          : green.color;
      textColor =
        value < 20 || value > 32
          ? red.textColor
          : value < 30
          ? orange.textColor
          : green.textColor;
      return {color, textColor};

    case 'sleep_duration':
      // color = value < 50 ? red.color : value < 75 ? orange.color : green.color;
      // textColor = value < 50 ? red.textColor : value < 75 ? orange.textColor : green.textColor;
      color = value < 50 ? red.color : value < 75 ? orange.color : green.color;
      textColor =
        value < 50
          ? red.textColor
          : value < 75
          ? orange.textColor
          : green.textColor;

      // textColor = "#fff"

      return {color, textColor};
    case 'metabolic_score':
      // color = value < 50 ? red.color : value < 75 ? orange.color : green.color;
      // textColor = value < 50 ? red.textColor : value < 75 ? orange.textColor : green.textColor;
      color =
        value < threshold.red
          ? red.color
          : value < threshold.orange
          ? orange.color
          : green.color;
      textColor =
        value < threshold.red
          ? red.textColor
          : value < threshold.orange
          ? orange.textColor
          : green.textColor;

      // textColor = "#fff"

      return {color, textColor};

    case 'awake':
      color = '#ddddff';
      textColor = '#ddddff';

      return {color, textColor};
    case 'rem_sleep':
      color = value < 50 ? red.color : value < 90 ? orange.color : green.color;
      textColor =
        value < 50
          ? red.textColor
          : value < 90
          ? orange.textColor
          : green.textColor;
      return {color, textColor};

    case 'light_sleep':
      color = value < 50 ? red.color : value < 90 ? orange.color : green.color;
      textColor =
        value < 50
          ? red.textColor
          : value < 90
          ? orange.textColor
          : green.textColor;
      return {color, textColor};
    case 'deep_sleep':
      color = value < 50 ? red.color : value < 90 ? orange.color : green.color;
      textColor =
        value < 50
          ? red.textColor
          : value < 90
          ? orange.textColor
          : green.textColor;
      return {color, textColor};
    case 'steps':
      color =
        value < threshold.red
          ? red.color
          : value < threshold.orange
          ? orange.color
          : green.color;
      textColor =
        value < threshold.red
          ? red.textColor
          : value < threshold.orange
          ? orange.textColor
          : green.textColor;
      return {color, textColor};
    default:
      color = '#000000';
      textColor = '#ffffff';
      return {color, textColor};
  }
};

export function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha > 0) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}

export const ringColorFormat =
  'sleep_score' |
  'hrv' |
  'temp' |
  'sleep_duration' |
  'rem_sleep' |
  'deep_sleep' |
  'light_sleep' |
  'awake' |
  'readiness' |
  'steps' |
  'metabolic_score' |
  'movement_index' |
  'heart_rate' |
  'heart_rate_dip' |
  'weekly_hrv_avg' |
  'vo2_max' |
  'rhr';

export const cgmColorFormat =
  'metabolic_score' |
  'glucose' |
  'glucose_variability' |
  'tir' |
  'estimated_hba1c';

export const typeThresholdText =
  'MODERATE' |
  'NEEDS ATTENTION' |
  'OPTIMAL' |
  'Needs Attention' |
  'Moderate' |
  'Optimal';

export const typedefault = 'default' | 'locked';

export const thresholdColor = {
  red: {color: '#FFCFCF', textColor: '#ad0000'},
  orange: {color: '#FFF6D1', textColor: '#F39E09'},
  green: {color: '#CFFFD4', textColor: '#00940F'},
  invalid: {color: '#fff', textColor: '#222'},
};

export const getThreshold = type => {
  switch (type) {
    case 'sleep_duration':
      return {red: 50, orange: 75, green: 100};
    case 'steps':
      return {red: 5000, orange: 10000, green: Number.POSITIVE_INFINITY};
    case 'temp':
      return {red: 20, orange: 30, green: 32};
    case 'readiness':
      return {red: 60, orange: 80, green: 100};
    case 'metabolic_score':
      return {red: 60, orange: 80, green: 100};
    case 'movement_index':
      return {red: 50, orange: 80, green: 100};
    case 'glucose_variability':
      return {red: 100, orange: 15, green: 12};
    case 'tir':
      return {red: 40, orange: 60, green: 100};
    case 'heart_rate':
      return {red: 40, orange: 60, green: 100};
    case 'sleep_score':
      return {red: 50, orange: 75, green: 100};
    case 'vo2_max':

    case 'glucose':

    default:
      return {red: 0, orange: 0, green: 0};
  }
};

export const colorMap = {
  rausche: '#ff385c',
  rausche_faded: '#FFA5B5',
  black: '#222222',
  white: '#ffffff',
  neutral_darker: '#c4c4c6',
  neutral: '#e6e5eb',
  neutral_faded: '#f3f2f8',
};
export const colorNames =
  'rausche' |
  'black' |
  'white' |
  'neutral' |
  'rausche_faded' |
  'neutral_faded' |
  'neutral_darker';
export const colorVals =
  '#ff385c' |
  '#222222' |
  '#ffffff' |
  '#f3f2f8' |
  '#FFA5B5' |
  '#e6e5eb' |
  '#c4c4c6';

export const getColor = color => {
  return colorMap[color];
};

export const typeThresholdColorKey = 'red' | 'orange' | 'green' | 'invalid';
