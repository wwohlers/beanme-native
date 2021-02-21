import React, {useState} from 'react';
import Task from "../../utils/models/Task";
import {Api} from "../../utils/api";
import pushToast from "../../utils/toast";
import {Button, Modal, Text, TextInput} from "react-native";
import {commonStyles} from "../../styles/common";
import BackContainer from "../layout/BackContainer";
import VBuffer from "../layout/VBuffer";
import Colors from "../../constants/Colors";
import Label from "../reusable/fonts/Label";
import BeanButton from "../reusable/BeanButton";
import DMSans from "../reusable/fonts/DMSans";

export default function CommitModal(
  { task, balance, onRequestClose, taskUpdated }:
    {task: Task, balance: number, onRequestClose: () => void, taskUpdated: (task: Task) => void }
) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const insufficientBeans = amount > balance;

  async function submit() {
    if (amount && !insufficientBeans && !loading) {
      setLoading(true);
      const res = await Api.tasks.commit(task.id, amount);
      if (res.OK && res.data) {
        setLoading(false);
        taskUpdated(res.data);
      } else {
        pushToast("error", "An error occurred committing beans");
      }
      onRequestClose();
    }
  }

  const onTextChanged = (amount: string) => {
    if (!isNaN(parseInt(amount))) {
      setAmount(parseInt(amount));
    } else if (amount === '') {
      setAmount(0);
    }
  }
  const insufficientBeansText = <DMSans style={commonStyles.error}>Insufficient beans</DMSans>
  return (
    <Modal visible={true} animationType={"slide"} presentationStyle={"pageSheet"}>
      <BackContainer onBackPressed={onRequestClose} title={`Commit to ${task.description}`}>
        <Label>Amount</Label>
        <VBuffer height={4} />
        <TextInput style={commonStyles.textInput} onChangeText={onTextChanged} keyboardType={"numeric"} />
        <VBuffer height={16} />
        { insufficientBeans && insufficientBeansText }
        <BeanButton title={"Send"} onPress={submit} disabled={insufficientBeans || loading} />
      </BackContainer>
    </Modal>
  )
}
