import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {commonStyles} from "../../styles/common";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function BackContainer(
  { onBackPressed, title, children }: { onBackPressed: () => void, title: string, children: React.ReactNode }
  ) {
  return (
    <View>
      <View style={styles.titleBar}>
        <TouchableWithoutFeedback onPress={onBackPressed}>
          <Ionicons name="chevron-back" size={16} />
        </TouchableWithoutFeedback>
        <Text>{ title }</Text>
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
    paddingVertical: 8,
    paddingHorizontal: "5%",
    borderColor: Colors.light.borders,
    borderBottomWidth: 1,
  }
})
