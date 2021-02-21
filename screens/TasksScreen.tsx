import React, {useEffect, useState} from 'react';
import Task from "../utils/models/Task";
import {View} from "../components/Themed";
import {StoreState} from "../store/state";
import {useSelector} from "react-redux";
import User from "../utils/models/User";
import {Api} from "../utils/api";
import TaskList from "../components/tasks/TaskList";
import SingleTask from "../components/tasks/SingleTask";
import {SafeAreaView} from "react-native-safe-area-context";
import Group, {PopulatedGroup} from "../utils/models/Group";
import CreateTaskModal from "../components/tasks/CreateTaskModal";
import {Text} from "react-native";
import FloatingActionButton from "../components/layout/FloatingActionButton";
import {BottomTabParamList} from "../utils/navigation";
import { RouteProp } from "@react-navigation/native";

export default function TasksScreen(
  { route }:
    { route: RouteProp<BottomTabParamList, 'Tasks'> }
) {
  const user = useSelector<StoreState, User>(state => state.user as User);
  const groups = useSelector<StoreState, PopulatedGroup[]>(state => state.groups);
  const [tasks, setTasks] = useState([] as Task[]);
  const [activeTask, setActiveTask] = useState(null as Task | null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [])

  useEffect(() => {
    if (route.params && route.params.taskId && !isRefreshing) {
      const task = tasks.find(g => g.id === route.params.taskId);
      if (task) setActiveTask(task);
    }
  }, [route, isRefreshing])

  if (!groups) {
    return (
      <Text>You haven't joined a group yet!</Text>
    )
  }

  async function loadTasks() {
    setIsRefreshing(true);
    const _tasks: Task[][] = await Promise.all(user.groups.map(g => {
      return new Promise<Task[]>(async (resolve) => {
        const res = await Api.groups.getTasksByGroup(g);
        if (res.OK && res.data) resolve(res.data);
      })
    }))
    setIsRefreshing(false);
    // Flatten and sort
    setTasks(_tasks
      .reduce((arr, _ts) => [...arr, ..._ts], [])
      .sort((a, b) => a.completeBy - b.completeBy)
    );
  }

  return (
    <SafeAreaView>
      { !activeTask && <TaskList
        tasks={tasks}
        onTaskSelected={setActiveTask}
        isRefreshing={isRefreshing}
        onRefresh={loadTasks} /> }
      { activeTask && <SingleTask
        taskId={activeTask.id}
        onBackPressed={() => setActiveTask(null)} /> }
      { showCreateTaskModal && <CreateTaskModal
        onTaskCreated={(task: Task) => setTasks([task, ...tasks])}
        onRequestClose={() => setShowCreateTaskModal(false)} /> }
      { !activeTask && <FloatingActionButton distance={25} onPress={() => setShowCreateTaskModal(true)} /> }
    </SafeAreaView>
  )
}
