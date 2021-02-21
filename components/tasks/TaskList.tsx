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

export default function TaskList(
  { tasks, onTaskSelected, onRefresh, isRefreshing }:
  { tasks: Task[], onTaskSelected: (task: Task) => void, isRefreshing: boolean, onRefresh: () => void}) {
  const groups: PopulatedGroup[] = useSelector<StoreState, PopulatedGroup[]>(state => state.groups);

  const renderTask = (task: Task, i: number) => {
    const group = groups.find(g => g._id === task.groupId);
    if (!group) return null;
    const totalCommittedBeans = task.commitments.reduce((sum, c) => sum + c.amount, 0);
    const user = group.users.find(u => u.userId === task.assignee);
    return (
      <TouchableWithoutFeedback onPress={() => onTaskSelected(task)} key={i}>
        <View style={commonStyles.tile}>
          <Text style={styles.taskTitle}>{ task.description }</Text>
          <View style={commonStyles.flexRow}>
            <FontAwesome name={"user"} size={12} color={Colors.light.medium} />
            <HBuffer width={4} />
            <Text style={styles.mediumText}>{ user ? user.name : 'No one' }</Text>
          </View>
          <View style={commonStyles.flexRow}>
            <Bean size={12} color={Colors.light.medium} />
            <HBuffer width={4} />
            <Text style={styles.mediumText}>{ totalCommittedBeans }/{task.beanReward}</Text>
          </View>
          <View style={commonStyles.flexRow}>
            <FontAwesome5 name={"calendar-alt"} size={12} color={Colors.light.medium} />
            <HBuffer width={4} />
            <Text style={styles.mediumText}>{ relativeDate(task.completeBy) }</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <ScrollView
      style={commonStyles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}>
      <Text style={commonStyles.title}>Tasks</Text>
      { tasks.map(renderTask) }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  taskTitle: {
    fontSize: 16,
    marginBottom: 4
  },

  mediumText: {
    fontSize: 14,
    color: Colors.light.medium
  }
})

