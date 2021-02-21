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
        onRequestClose();
      } else {
        pushToast("error", "An error occurred transferring beans");
      }
    }
  }

  const onTextChanged = (amount: string) => {
    if (!isNaN(parseInt(amount))) {
      setAmount(parseInt(amount));
    } else if (amount === '') {
      setAmount(0);
    }
  }
  const insufficientBeansText = <Text style={commonStyles.error}>Insufficient beans</Text>
  return (
    <Modal visible={true} animationType={"slide"} presentationStyle={"pageSheet"}>
      <BackContainer onBackPressed={onRequestClose} title={`Send Beans to ${user.name}`}>
        <Text style={commonStyles.inputLabel}>Amount</Text>
        <TextInput style={commonStyles.textInput} onChangeText={onTextChanged} keyboardType={"numeric"} />
        <VBuffer height={8} />
        { insufficientBeans && insufficientBeansText }
        <Button title={"Send"} onPress={submit} disabled={insufficientBeans || loading} color={Colors.light.theme} />
      </BackContainer>
    </Modal>
  )
}
