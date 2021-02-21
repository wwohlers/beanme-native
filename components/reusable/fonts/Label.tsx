import React from 'react';
import DMSans from "./DMSans";
import Colors from "../../../constants/Colors";

export default function Label(
  { children }:
    { children: React.ReactNode }
) {
  return <DMSans style={{ color: Colors.light.medium, textTransform: "uppercase" }} fontSize={13}>{ children }</DMSans>
}
