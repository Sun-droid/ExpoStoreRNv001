import React from 'react';
import {Text as RNText} from 'react-native';
import type {
  TextProps as RNTextProps,
  TextStyle as RNTextStyle,
} from 'react-native';

import {color} from '../../theme';

type VariantNames = 'default' | 'header' | 'label';

const baseStyle: RNTextStyle = {
  color: color.text,
  fontSize: 14,
};

const variants: Record<VariantNames, RNTextStyle> = {
  default: baseStyle,
  header: {
    ...baseStyle,
    fontSize: 24,
    fontWeight: '600',
  },
  label: {
    ...baseStyle,
    marginBottom: 8,
  },
};

interface Props extends RNTextProps {
  children?: React.ReactNode;
  style?: RNTextStyle | RNTextStyle[];
  variant?: VariantNames;
}

export const Text = ({children, style, variant, ...rest}: Props) => {
  let variantStyle: RNTextStyle;
  if (variant) {
    variantStyle = variants[variant];
  } else {
    variantStyle = variants.default;
  }

  const styles = {...variantStyle, ...style};

  return (
    <RNText {...rest} style={styles}>
      {children}
    </RNText>
  );
};
