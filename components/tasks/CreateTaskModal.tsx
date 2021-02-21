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
import Label from "../reusable/fonts/Label";
import BeanButton from "../reusable/BeanButton";

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
          await Api.groups.scheduleTask(groupId, res.data.id, scheduleInterval);
          if (!res.OK) {
            pushToast("error", "An error occurred scheduling your task");
          }
        }
        setLoading(false);
        onTaskCreated(res.data);
      } else {
        pushToast("error", "An error occurred creating your task");
      }
      onRequestClose();
    }
  }

  return (
    <Modal visible={true} animationType={"slide"} presentationStyle={"pageSheet"}>
      <BackContainer onBackPressed={onRequestClose} title={"Create a Task"}>
        <Label>Group</Label>
        <VBuffer height={4} />
        <GroupPicker onGroupSelected={setGroupId} />
        <VBuffer height={16} />

        <Label>Description</Label>
        <VBuffer height={4} />
        <TextInput style={commonStyles.textInput} onChangeText={setDescription} placeholder={"Dishes"} />
        <VBuffer height={16} />

        <Label>Reward (beans)</Label>
        <VBuffer height={4} />
        <TextInput
          style={commonStyles.textInput}
          placeholder={"8"}
          onChangeText={rewardChanged}
          keyboardType={"numeric"} />
        <VBuffer height={16} />

        <Label>Complete Within</Label>
        <VBuffer height={4} />
        <RelativeTimePicker onChange={(dur: number) => console.log(dur)} />
        <VBuffer height={16} />

        <View style={{...commonStyles.flexRow, justifyContent: "space-between" }}>
          <Label>Repeat</Label>
          <Switch
            onValueChange={setIsScheduled}
            value={isScheduled}
            thumbColor={Colors.light.medium}
            trackColor={{ false: Colors.light.borders, true: Colors.light.medium }}
          />
        </View>

        {
          isScheduled && (
            <View>
              <RelativeTimePicker onChange={setScheduleInterval} />
            </View>
          )
        }

        <VBuffer height={16} />
        <BeanButton
          title={"Create"}
          onPress={submit}
          disabled={!formValid} />
      </BackContainer>
    </Modal>
  )
}
