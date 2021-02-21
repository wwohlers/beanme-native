import React from 'react';
import {View} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import Colors from "../../constants/Colors";

export default function Bean({ size, color }: { size: number, color?: string }) {
  const positions = Array.from({ length: size * 2 }, (_, x: number) => x * 0.5);
  const midpoint = size / 2;
  const beanAtX = (x: number) => {
    const circleDiameter = size - Math.abs((midpoint - x) / 2);
    return (
      <View style={{
        position: "absolute",
        left: x - (circleDiameter / 2) + size / 4,
        height: size,
        justifyContent: "center" }} key={x}>
        <FontAwesome name={"circle"} size={circleDiameter} color={Colors.light.bean} />
      </View>
    )
  }

  return (
    <View style={{ height: size, width: size * 2 }}>
      {
        positions.map(beanAtX)
      }
    </View>
  )
}
