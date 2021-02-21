import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import DMSans from "./fonts/DMSans";
import Colors from "../../constants/Colors";
import HBuffer from "../layout/HBuffer";

export default function BeanButton(
  { title, onPress, disabled, loading }:
    { title: string, onPress: () => void, disabled?: boolean, loading?: boolean }
) {
  const extraStyles = disabled ? { backgroundColor: Colors.light.medium } : {}
  const extraTextStyles = disabled ? { color: Colors.light.borders } : {}
  return (
    <TouchableOpacity onPress={() => (disabled || loading) ? null : onPress()}>
      <View style={{...styles.buttonWrapper, ...extraStyles}}>
        { loading && <ActivityIndicator color={Colors.light.background} size={18} /> }
        <HBuffer width={8} />
        <DMSans
          style={{...styles.buttonText, ...extraTextStyles}}
          fontWeight={700}
          fontSize={16}>{ title }</DMSans>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    backgroundColor: Colors.light.theme,
    width: "100%",
    paddingVertical: 10,
    borderRadius: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  buttonText: {
    alignSelf: "center",
    textTransform: "uppercase",
    color: Colors.light.background
  }
})
