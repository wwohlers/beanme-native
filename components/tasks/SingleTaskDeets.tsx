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

export default function SingleTaskDeets(
  { task, totalCommittedBeans, username }
  : { task: Task, totalCommittedBeans: number, username: string }
  ) {
  return (
    <View>
      <View style={commonStyles.flexRow}>
        <Bean size={24} color={Colors.light.theme} />
        <HBuffer width={8} />
        <Text style={styles.bigText}>{ totalCommittedBeans }/{ task.beanReward }</Text>
      </View>
      <VBuffer height={6} />
      <View style={commonStyles.flexRow}>
        <FontAwesome name={"user"} size={16} color={Colors.light.text} />
        <HBuffer width={8} />
        <Text>{ username }</Text>
      </View>
      <VBuffer height={6} />
      <View style={commonStyles.flexRow}>
        <FontAwesome5 name={"calendar-alt"} size={16} color={Colors.light.text} />
        <HBuffer width={8} />
        <Text>{ relativeDate(task.completeBy) }</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 24
  }
})
