import React, {useState} from 'react';
import {Button, Modal, Switch, Text, TextInput, View} from "react-native";
import BackContainer from "../layout/BackContainer";
import {commonStyles} from "../../styles/common";
import VBuffer from "../layout/VBuffer";
import Colors from "../../constants/Colors";
import {Api} from "../../utils/api";
import RelativeTimePicker from "../reusable/RelativeTimePicker";
import Task from "../../utils/models/Task";
import pushToast from "../../utils/toast";
import GroupPicker from "../reusable/GroupPicker";

export default function CreateTaskModal(
  { onRequestClose, onTaskCreated }:
  { onRequestClose: () => void, onTaskCreated: (task: Task) => void }
) {
  const [groupId, setGroupId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [relativeDuration, setRelativeDuration] = useState(0);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleInterval, setScheduleInterval] = useState(0);
  const [loading, setLoading] = useState(false);

  const rewardChanged = (input: string) => {
    if (!isNaN(parseInt(input))) {
      setAmount(parseInt(input));
    }
  }

  const validSchedule = !isScheduled || scheduleInterval;
  const formValid = !loading && groupId && description && amount && relativeDuration && validSchedule;

  async function submit() {
    if (formValid) {
      setLoading(true);
      const completeBy = Date.now() + relativeDuration;
      const res = await Api.tasks.createTask(groupId, description, amount, completeBy);
      if (res.OK && res.data) {
        if (isScheduled) {
          await Api.groups.scheduleTask(res.data._id, scheduleInterval);
          if (!res.OK) {
            pushToast("error", "An error occurred scheduling your task");
          }
        }
        setLoading(false);
        onTaskCreated(res.data);
        onRequestClose();
      } else {
        pushToast("error", "An error occurred creating your task");
      }
    }
  }

  return (
    <Modal visible={true} animationType={"slide"} presentationStyle={"pageSheet"}>
      <BackContainer onBackPressed={onRequestClose} title={"Create a Task"}>
        <Text style={commonStyles.inputLabel}>Group</Text>
        <GroupPicker onGroupSelected={setGroupId} />
        <VBuffer height={8} />

        <Text style={commonStyles.inputLabel}>Description</Text>
        <TextInput style={commonStyles.textInput} onChangeText={setDescription} />
        <VBuffer height={8} />

        <Text style={commonStyles.inputLabel}>Reward</Text>
        <TextInput style={commonStyles.textInput} onChangeText={rewardChanged} keyboardType={"numeric"} />
        <VBuffer height={8} />

        <Text style={commonStyles.inputLabel}>Complete Within</Text>
        <RelativeTimePicker onChange={setRelativeDuration} />
        <VBuffer height={8} />

        <Text style={commonStyles.inputLabel}>Scheduled</Text>
        <Switch
          onValueChange={setIsScheduled}
          value={isScheduled}
          thumbColor={Colors.light.medium}
          trackColor={{ false: Colors.light.borders, true: Colors.light.medium }}
        />
        <VBuffer height={8} />

        {
          isScheduled && (
            <View>
              <Text style={commonStyles.inputLabel}>Repeat Every</Text>
              <RelativeTimePicker onChange={setScheduleInterval} />
              <VBuffer height={8} />
            </View>
          )
        }

        <Button
          title={"Create"}
          onPress={submit}
          color={Colors.light.theme}
          disabled={!formValid} />
      </BackContainer>
    </Modal>
  )
}
