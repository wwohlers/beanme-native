import React from 'react';
import Task from "../../utils/models/Task";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView, StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import {commonStyles} from "../../styles/common";
import Bean from "../drawings/Bean";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import Group, {PopulatedGroup} from "../../utils/models/Group";
import {useSelector} from "react-redux";
import {StoreState} from "../../store/state";
import HBuffer from "../layout/HBuffer";
import Colors from "../../constants/Colors";
import {relativeDate} from "../../utils/format";
import DMSans from "../reusable/fonts/DMSans";
import VBuffer from "../layout/VBuffer";
import Label from "../reusable/fonts/Label";

export default function TaskList(
  { tasks, onTaskSelected, onRefresh, isRefreshing }:
  { tasks: Task[], onTaskSelected: (task: Task) => void, isRefreshing: boolean, onRefresh: () => void}) {
  const groups: PopulatedGroup[] = useSelector<StoreState, PopulatedGroup[]>(state => state.groups);

  const renderTask = (task: Task, i: number) => {
    const group = groups.find(g => g.id === task.groupId);
    if (!group) return null;
    const totalCommittedBeans = task.commitments.reduce((sum, c) => sum + c.amount, 0);
    const user = group.users.find(u => u.userId === task.assignee);
    return (
      <TouchableWithoutFeedback onPress={() => onTaskSelected(task)} key={i}>
        <View style={commonStyles.tile}>
          <DMSans fontSize={18}>{ task.description }</DMSans>
          <VBuffer height={8} />
          <View style={commonStyles.flexRow}>
            <View style={{ width: 24 }}>
              <FontAwesome name={"user"} size={12} color={Colors.light.medium} />
              <HBuffer width={8} />
            </View>
            <DMSans fontSize={14} style={styles.mediumText}>{ user ? user.name : 'No one' }</DMSans>
          </View>
          <VBuffer height={2} />
          <View style={commonStyles.flexRow}>
            <View style={{ width: 24 }}>
              <Bean size={12} color={Colors.light.medium} />
              <HBuffer width={8} />
            </View>
            <DMSans fontSize={14} style={styles.mediumText}>{ totalCommittedBeans } of {task.beanReward}</DMSans>
          </View>
          <VBuffer height={2} />
          <View style={commonStyles.flexRow}>
            <View style={{ width: 24 }}>
              <FontAwesome5 name={"calendar-alt"} size={12} color={Colors.light.medium} />
              <HBuffer width={8} />
            </View>
            <DMSans fontSize={14} style={styles.mediumText}>{ relativeDate(task.completeBy) }</DMSans>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const emptyRender = (
    <Label>No tasks yet</Label>
  )
  return (
    <ScrollView
      contentContainerStyle={{ padding: 8 }}
      style={commonStyles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
      <DMSans fontSize={28}>Tasks</DMSans>
      <VBuffer height={16} />
      { tasks.length === 0 ? emptyRender : tasks.map(renderTask) }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mediumText: {
    color: Colors.light.medium
  }
})

