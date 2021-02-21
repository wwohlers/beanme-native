import React from 'react';
import {TouchableWithoutFeedback, View} from "react-native";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function FloatingActionButton(
  { onPress, distance }: { onPress: () => void, distance?: number }
  ) {
  const extraStyles = distance ? { top: distance, right: distance } : {};
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ ...styles.button, ...extraStyles }}>
        <AntDesign name={"plus"} size={24} color={Colors.light.background} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = {
  button: {
    backgroundColor: Colors.light.theme,
    width: 48,
    height: 48,
    borderRadius: 24,
    position: "absolute",
    top: 4,
    right: 4,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4
  }
}
