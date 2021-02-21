import React from 'react';
import {Commitment} from "../../utils/models/Task";
import {StyleSheet, Text, View} from "react-native";
import {commonStyles} from "../../styles/common";
import {PopulatedGroup} from "../../utils/models/Group";
import Bean from "../drawings/Bean";
import Colors from "../../constants/Colors";
import HBuffer from "../layout/HBuffer";
import {relativeDate} from "../../utils/format";
import DMSans from "../reusable/fonts/DMSans";
import Label from "../reusable/fonts/Label";

export default function SingleCommit({ commit, group }: { commit: Commitment, group: PopulatedGroup }) {
  const user = group.users.find(u => u.userId === commit.userId);
  return (
    <View style={commonStyles.tile}>
      <View style={styles.flexRow}>
        <DMSans>{ user ? user.name : '' } committed</DMSans>
        <HBuffer width={5} />
        <View style={commonStyles.flexRow}>
          <DMSans fontSize={16}>{ commit.amountPaid }</DMSans>
          <HBuffer width={5} />
          <Bean size={12} color={Colors.light.theme} />
        </View>
        <HBuffer width={4} />
        <Label>{ relativeDate(commit.date) }</Label>
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
