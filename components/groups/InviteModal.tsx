import React, {useState} from 'react';
import {Button, Modal, Text, TextInput} from "react-native";
import {commonStyles} from "../../styles/common";
import Colors from "../../constants/Colors";
import {Api} from "../../utils/api";
import BackContainer from "../layout/BackContainer";
import VBuffer from "../layout/VBuffer";
import pushToast from "../../utils/toast";
import Label from "../reusable/fonts/Label";
import BeanButton from "../reusable/BeanButton";
import {formatPhone} from "../../utils/format";

export default function InviteModal({ onCloseRequest, groupId }: { groupId: string, onCloseRequest: () => void }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!phone) return;
    setLoading(true);
    const res = await Api.groups.createInvite(formatPhone(phone), groupId);
    if (res.OK) {
      setLoading(false);
    } else {
      pushToast("error", "An error occurred inviting your friend");
    }
    onCloseRequest();
  }

  return (
    <Modal visible={true} presentationStyle={"pageSheet"} animationType={"slide"}>
      <BackContainer onBackPressed={onCloseRequest} title={"Invite a Friend"}>
        <Label>Phone</Label>
        <VBuffer height={4} />
        <TextInput style={commonStyles.textInput} onChangeText={setPhone} placeholder={"305-228-5497"} />
        <VBuffer height={16} />
        <BeanButton title={"Invite"} onPress={submit} disabled={loading} />
      </BackContainer>
    </Modal>
  )
}
