import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from "react-native";

const fontWeights = {
  400: {
    fontFamily: "DMSans_400Regular",
  },
  700: {
    fontFamily: "DMSans_700Bold"
  }
}

export default function DMSans(
  { fontWeight, fontSize, style, children }:
    { fontWeight?: keyof typeof fontWeights, fontSize?: number, style?: any, children: React.ReactNode }
) {
  return (
    <Text style={{ ...style, ...fontWeights[fontWeight || 400], fontSize }}>{ children }</Text>
  )
}
