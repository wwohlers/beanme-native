import React from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {commonStyles} from "../../styles/common";
import Bean from "../drawings/Bean";
import Colors from "../../constants/Colors";
import HBuffer from "../layout/HBuffer";
import VBuffer from "../layout/VBuffer";
import {FontAwesome, FontAwesome5, Ionicons} from "@expo/vector-icons";
import {relativeDate} from "../../utils/format";
import Task from "../../utils/models/Task";
import DMSans from "../reusable/fonts/DMSans";
import Label from "../reusable/fonts/Label";

export default function SingleTaskDeets(
  { task, totalCommittedBeans, username, groupName }
  : { task: Task, totalCommittedBeans: number, username: string, groupName: string }
  ) {
  const fulfilled = task.fulfilled || totalCommittedBeans >= task.beanReward;
  const expired = Date.now() > task.completeBy;
  return (
    <View style={commonStyles.tile}>
      {
        !fulfilled && (
          <View style={commonStyles.flexRow}>
            <Bean size={24} color={Colors.light.theme} />
            <Text>
              <DMSans fontSize={24}>{ totalCommittedBeans } of { task.beanReward }</DMSans>
              <HBuffer width={8} />
              <Label>beans to fulfill</Label>
            </Text>
          </View>
        )
      }
      {
        fulfilled && (
          <View style={commonStyles.flexRow}>
            <Ionicons name="checkmark" color={Colors.light.text} size={24} />
            <HBuffer width={4} />
            <DMSans fontSize={20}>{ task.beanReward } beans fulfilled</DMSans>
          </View>
        )
      }
      <VBuffer height={12} />
      <View style={commonStyles.flexRow}>
        <View style={{ width: 24 }}>
          <FontAwesome5 name={"users"} size={12} color={Colors.light.medium} />
          <HBuffer width={8} />
        </View>
        <DMSans style={{ color: Colors.light.medium }}>{ groupName }</DMSans>
      </View>
      <VBuffer height={6} />
      <View style={commonStyles.flexRow}>
        <View style={{ width: 24 }}>
          <FontAwesome name={"user"} size={16} color={Colors.light.medium} />
          <HBuffer width={8} />
        </View>
        <DMSans style={{ color: Colors.light.medium }}>Created by { username }</DMSans>
      </View>
      <VBuffer height={6} />
      <View style={commonStyles.flexRow}>
        <View style={{ width: 24 }}>
          <FontAwesome5
            name={"calendar-alt"}
            size={16}
            color={expired ? Colors.light.error : Colors.light.medium} />
          <HBuffer width={8} />
        </View>
        <DMSans style={{ color: expired ? Colors.light.error : Colors.light.medium }}>
          { expired ? `Expired` : `${relativeDate(task.completeBy)} to fulfill` }
        </DMSans>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24
  }
})
