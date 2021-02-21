import Toast from 'react-native-toast-message';
import {StyleSheet, Text, View} from "react-native";
import Colors from "../constants/Colors";
import React from 'react';
import DMSans from "../components/reusable/fonts/DMSans";

export const toastConfig = {
  success: (
    { text1, ...rest }:
      { text1: string }
  ) => (
    <View style={{...styles.toast, backgroundColor: Colors.light.success}}>
      <DMSans fontWeight={700} style={{ color: Colors.light.background }}>{text1}</DMSans>
    </View>
  ),
  error: (
    { text1, ...rest }:
      { text1: string }
  ) => (
    <View style={{...styles.toast, backgroundColor: Colors.light.error}}>
      <DMSans fontWeight={700} style={{ color: Colors.light.background }}>{text1}</DMSans>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    width: "90%",
    borderRadius: 4,
    padding: 16,
    alignItems: "center"
  }
})
