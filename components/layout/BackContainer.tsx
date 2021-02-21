import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {commonStyles} from "../../styles/common";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import DMSans from "../reusable/fonts/DMSans";
import HBuffer from "./HBuffer";

export default function BackContainer(
  { onBackPressed, title, children }: { onBackPressed: () => void, title: string, children: React.ReactNode }
  ) {
  return (
    <View>
      <View style={styles.titleBar}>
        <TouchableWithoutFeedback onPress={onBackPressed}>
          <Ionicons name="arrow-back" size={20} />
        </TouchableWithoutFeedback>
        <HBuffer width={8} />
        <DMSans fontSize={18}>{ title }</DMSans>
      </View>
      <View style={commonStyles.container}>
        { children }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  titleBar: {
    ...commonStyles.flexRow,
    paddingVertical: 14,
    paddingHorizontal: "5%",
    borderColor: Colors.light.borders,
    borderBottomWidth: 1,
    backgroundColor: "#FFF"
  }
})
