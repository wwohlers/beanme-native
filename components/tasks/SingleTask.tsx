import React, {useEffect, useState} from 'react';
import Task from "../../utils/models/Task";
import {RefreshControl, ScrollView, StyleSheet, Text, View} from "react-native";
import BackContainer from "../layout/BackContainer";
import {commonStyles} from "../../styles/common";
import Bean from "../drawings/Bean";
import Colors from "../../constants/Colors";
import {PopulatedGroup} from "../../utils/models/Group";
import {useSelector} from "react-redux";
import {StoreState} from "../../store/state";
import HBuffer from "../layout/HBuffer";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import VBuffer from "../layout/VBuffer";
import {relativeDate} from "../../utils/format";
import CommitList from "./CommitList";
import FloatingActionButton from "../layout/FloatingActionButton";
import CommitModal from "./CommitModal";
import User from "../../utils/models/User";
import {Api} from "../../utils/api";
import pushToast from "../../utils/toast";
import SingleTaskDeets from "./SingleTaskDeets";

export default function SingleTask(
  { taskId, onBackPressed }:
  { taskId: string, onBackPressed: () => void }
) {
  const [showCommitModal, setShowCommitModal] = useState(false);
  const [task, setTask] = useState(null as Task | null);
  const [loading, setLoading] = useState(false);
  const groups: PopulatedGroup[] = useSelector<StoreState, PopulatedGroup[]>(state => state.groups);
  const thisUser: User = useSelector<StoreState, User>(state => state.user as User);

  useEffect(() => {
    loadTask();
  }, [])

  async function loadTask() {
    setLoading(true);
    const res = await Api.tasks.getTaskById(taskId);
    setLoading(false);
    if (res.OK && res.data) {
      setTask(res.data);
    } else {
      onBackPressed();
      pushToast("error", "An error occurred loading task");
    }
  }

  if (!task) return null;

  const group = groups.find(g => g._id === task.groupId);
  if (!group) return null;
  const totalCommittedBeans = task.commitments.reduce((sum, c) => sum + c.amount, 0);
  const user = group.users.find(u => u.userId === task.assignee);
  const balance = group.users.find(u => u.userId === thisUser._id)?.beans || 0;

  if (!user) return null;

  return (
    <BackContainer onBackPressed={onBackPressed} title={task.description}>
      <ScrollView
        style={commonStyles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadTask} />}
      >
        <SingleTaskDeets task={task} totalCommittedBeans={totalCommittedBeans} username={user.name} />
        <VBuffer height={16} />
        <CommitList commits={task.commitments} group={group} />
        <FloatingActionButton onPress={() => setShowCommitModal(true)} />
        { showCommitModal && <CommitModal
          task={task}
          balance={balance}
          onRequestClose={() => setShowCommitModal(false)}
          taskUpdated={setTask}
        />}
      </ScrollView>
    </BackContainer>
  )
}
