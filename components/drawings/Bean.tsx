import React from 'react';
import {View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";

export default function Bean({ size, color }: { size: number, color: string }) {
  return (
    <View style={{ height: size }}>
      <FontAwesome name={"circle"} size={size} color={color} />
    </View>
  )
}
