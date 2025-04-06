import {View, Text, StyleSheet, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {
  cardShadow,
  screenPadding,
  standardBorderRadius,
} from '../../theme/styleConstant';

const StandardCard = ({children, style}) => {
  const shadow = cardShadow?.shadow;
  const baseStyle = StyleSheet.create({
    base: {
      padding: screenPadding,
      borderWidth: 0.8,
      borderColor: '#ddd',
      borderRadius: standardBorderRadius,
      backgroundColor: '#fff',
      ...shadow,
    },
  });

  return <View style={[baseStyle.base, style ?? {}]}>{children}</View>;
};

export default StandardCard;
