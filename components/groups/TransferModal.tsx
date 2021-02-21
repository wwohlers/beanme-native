import React, {useState} from 'react';
import {PopulatedGroupUser} from "../../utils/models/Group";
import {Button, Modal, Text, TextInput, View} from "react-native";
import BackContainer from "../layout/BackContainer";
import {commonStyles} from "../../styles/common";
import VBuffer from "../layout/VBuffer";
import {Api} from "../../utils/api";
import pushToast from "../../utils/toast";
import Colors from "../../constants/Colors";
import {store} from "../../store";
import {patchGroup} from "../../store/actions";
import Label from "../reusable/fonts/Label";
import BeanButton from "../reusable/BeanButton";
import DMSans from "../reusable/fonts/DMSans";

export default function TransferModal(
  { user, balance, groupId, onRequestClose }:
    { user: PopulatedGroupUser, balance: number, groupId: string, onRequestClose: () => void }
  ) {
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const insufficientBeans = amount > balance;

  async function submit() {
    if (amount && !insufficientBeans && !loading) {
      setLoading(true);
      const res = await Api.groups.transfer(groupId, user.userId, amount);
      if (res.OK && res.data) {
        setLoading(false);
        store.dispatch(patchGroup(res.data));
      } else {
        pushToast("error", "An error occurred transferring beans");
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
      <BackContainer onBackPressed={onRequestClose} title={`Send Beans to ${user.name}`}>
        <Label>Amount</Label>
        <VBuffer height={4} />
        <TextInput style={commonStyles.textInput} onChangeText={onTextChanged} keyboardType={"numeric"} placeholder={"14"} />
        <VBuffer height={16} />
        { insufficientBeans && insufficientBeansText }
        <BeanButton title={"Send"} onPress={submit} disabled={insufficientBeans || loading} />
      </BackContainer>
    </Modal>
  )
}
