import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {commonStyles} from "../../styles/common";
import Bean from "../drawings/Bean";
import Colors from "../../constants/Colors";
import HBuffer from "../layout/HBuffer";
import VBuffer from "../layout/VBuffer";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {relativeDate} from "../../utils/format";
import Task from "../../utils/models/Task";
import DMSans from "../reusable/fonts/DMSans";
import Label from "../reusable/fonts/Label";

export default function SingleTaskDeets(
  { task, totalCommittedBeans, username }
  : { task: Task, totalCommittedBeans: number, username: string }
  ) {
  return (
    <View style={commonStyles.tile}>
      <View style={commonStyles.flexRow}>
        <Bean size={24} color={Colors.light.theme} />
        <Text>
          <DMSans fontSize={24}>{ totalCommittedBeans } of { task.beanReward }</DMSans>
          <HBuffer width={8} />
          <Label>beans to complete</Label>
        </Text>
      </View>
      <VBuffer height={12} />
      <View style={commonStyles.flexRow}>
        <FontAwesome name={"user"} size={16} color={Colors.light.medium} />
        <HBuffer width={8} />
        <DMSans style={{ color: Colors.light.medium }}>Created by { username }</DMSans>
      </View>
      <VBuffer height={6} />
      <View style={commonStyles.flexRow}>
        <FontAwesome5 name={"calendar-alt"} size={16} color={Colors.light.medium} />
        <HBuffer width={8} />
        <DMSans style={{ color: Colors.light.medium }}>{ relativeDate(task.completeBy) } to fulfill</DMSans>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24
  }
})
