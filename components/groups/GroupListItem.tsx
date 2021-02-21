import React from 'react';
import Group from "../../utils/models/Group";
import {StyleSheet, Text, View} from "react-native";
import {commonStyles} from "../../styles/common";
import {FontAwesome5} from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import HBuffer from "../layout/HBuffer";
import DMSans from "../reusable/fonts/DMSans";

export default function GroupListItem(
  {group, onBackPressed}:
    { group: Group, onBackPressed: () => void }
  ) {
  return (
    <View style={commonStyles.tile}>
      <DMSans style={styles.tileTitle} fontSize={16}>{ group.name }</DMSans>
      <View style={commonStyles.flexRow}>
        <FontAwesome5 name={"users"} size={12} color={Colors.light.medium} />
        <HBuffer width={2} />
        <Text style={styles.userCountLabel}>{ group.users.length }</Text>
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
