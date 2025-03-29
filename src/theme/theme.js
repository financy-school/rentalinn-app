import {MD3LightTheme, MD3DarkTheme} from 'react-native-paper';
import colors from './color';

const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    background: colors.backgroundLight,
    text: colors.textPrimary,
    // Add other custom color mappings here
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: colors.backgroundDark,
    text: colors.textSecondary,
    // Add other custom color mappings here
  },
};

export {lightTheme, darkTheme};
