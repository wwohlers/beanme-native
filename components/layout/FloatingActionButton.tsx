import React from 'react';
import {TouchableWithoutFeedback, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function FloatingActionButton(
  { onPress, distance }: { onPress: () => void, distance?: number }
  ) {
  const extraStyles = distance ? { top: distance, right: distance } : {};
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ ...styles.button, ...extraStyles }}>
        <MaterialCommunityIcons name={"plus"} size={24} color={Colors.light.background} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = {
  button: {
    backgroundColor: Colors.light.theme,
    width: 40,
    height: 40,
    borderRadius: 20,
    position: "absolute",
    top: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  }
}
