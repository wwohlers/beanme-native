import React from 'react';
import Group from "../../utils/models/Group";
import {StyleSheet, Text, View} from "react-native";
import {commonStyles} from "../../styles/common";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import HBuffer from "../layout/HBuffer";
import DMSans from "../reusable/fonts/DMSans";
import Label from "../reusable/fonts/Label";
import VBuffer from "../layout/VBuffer";

export default function GroupListItem(
  {group, onBackPressed}:
    { group: Group, onBackPressed: () => void }
  ) {
  return (
    <View style={commonStyles.tile}>
      <DMSans style={styles.tileTitle} fontSize={18}>{ group.groupName }</DMSans>
      <VBuffer height={8} />
      <View style={commonStyles.flexRow}>
        <FontAwesome5 name={"users"} size={12} color={Colors.light.medium} />
        <HBuffer width={4} />
        <Label>{ group.users.length }</Label>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tileTitle: {
    marginBottom: 4
  },

  userCountLabel: {
    fontSize: 12,
    color: Colors.light.medium
  }
})
