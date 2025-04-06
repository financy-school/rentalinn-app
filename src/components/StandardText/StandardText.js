import {StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';
import {Text} from 'react-native-paper';
import {
  createFontWeight,
  getFontColor,
  getFontSize,
  handleFontWeight,
} from '../../theme/standardTextUtils';

const StandardText = ({
  size = 'md',
  children,
  color = 'default_gray',
  italic = false,
  bold = false,
  fontWeight,
  textAlign = 'left',
  ...props
}) => {
  const fontSize = getFontSize(size);
  const LINE_HEIGHT_RATIO = 1.5;
  const lineHeight = fontSize * LINE_HEIGHT_RATIO;
  const paddingTop = fontSize - lineHeight;
  const baseStyle = StyleSheet.create({
    base: {
      fontFamily: handleFontWeight(fontWeight),
      color: getFontColor(color),
      fontWeight: createFontWeight(fontWeight),
      fontStyle: italic ? 'italic' : 'normal',
      fontSize: fontSize,
      lineHeight: lineHeight,
      letterSpacing: -0.2,
      paddingTop: paddingTop,
      textAlign: textAlign,
    },
  });

  return (
    <Text {...props} style={[baseStyle.base, props.style]}>
      {children}
    </Text>
  );
};

export default StandardText;
