import React from 'react';
import {Commitment} from "../../utils/models/Task";
import {StyleSheet, Text, View} from "react-native";
import {commonStyles} from "../../styles/common";
import {PopulatedGroup} from "../../utils/models/Group";
import Bean from "../drawings/Bean";
import Colors from "../../constants/Colors";
import HBuffer from "../layout/HBuffer";
import {relativeDate} from "../../utils/format";

export default function SingleCommit({ commit, group }: { commit: Commitment, group: PopulatedGroup }) {
  const user = group.users.find(u => u.userId === commit.userId);
  return (
    <View style={commonStyles.tile}>
      <View style={styles.flexRow}>
        <Text>{ user ? user.name : '' } committed</Text>
        <HBuffer width={4} />
        <View style={commonStyles.flexRow}>
          <Bean size={16} color={Colors.light.theme} />
          <HBuffer width={4} />
          <Text style={styles.mediumText}>{ commit.amount }</Text>
        </View>
        <HBuffer width={4} />
        <Text style={commonStyles.label}>{ relativeDate(commit.date) }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    ...commonStyles.flexRow,
    alignItems: "flex-end"
  },

  mediumText: {
    fontSize: 16
  },

  smallText: {
    fontSize: 12
  }
})
