import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import DMSans from "./fonts/DMSans";
import Colors from "../../constants/Colors";

export default function BeanButton(
  { title, onPress, disabled }:
    { title: string, onPress: () => void, disabled: boolean }
) {
  const extraStyles = disabled ? { backgroundColor: Colors.light.medium } : {}
  const extraTextStyles = disabled ? { color: Colors.light.borders } : {}
  return (
    <TouchableWithoutFeedback onPress={() => disabled ? null : onPress()}>
      <View style={{...styles.buttonWrapper, ...extraStyles}}>
        <DMSans
          style={{...styles.buttonText, ...extraTextStyles}}
          fontWeight={700}
          fontSize={16}>{ title }</DMSans>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colors.light.theme,
    width: "100%",
    paddingVertical: 8,
    borderRadius: 2,
    justifyContent: "center",
  },

  buttonText: {
    alignSelf: "center",
    textTransform: "uppercase",
    color: Colors.light.background
  }
})
