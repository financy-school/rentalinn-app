import React from 'react';
import {SvgUri} from 'react-native-svg';
import {Url} from 'url';
import {iconSizeType} from 'utils/types/typeStandardText';
import {getFontSize} from '../../theme/standardTextUtils';
import {IconButton, useTheme} from 'react-native-paper';

const StandardSvg = ({icon, size}) => {
  const theme = useTheme();
  const height = getFontSize(size);
  const width = height;
  //   return <SvgUri uri={icon} height={height} width={width}></SvgUri>;
  return (
    <IconButton
      icon={'chevron-down'}
      iconColor={'#000'}
      style={{
        backgroundColor: theme.colors.light_gray,

        padding: 0,

        borderRadius: 20,
        elevation: 2,
      }}
      size={20}
    />
  );
};

export default StandardSvg;
