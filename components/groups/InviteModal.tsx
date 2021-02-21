import React, {useState} from 'react';
import {Button, Modal, Text, TextInput} from "react-native";
import {commonStyles} from "../../styles/common";
import Colors from "../../constants/Colors";
import {Api} from "../../utils/api";
import BackContainer from "../layout/BackContainer";
import VBuffer from "../layout/VBuffer";
import pushToast from "../../utils/toast";

export default function InviteModal({ onCloseRequest, groupId }: { groupId: string, onCloseRequest: () => void }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!phone) return;
    setLoading(true);
    const res = await Api.groups.createInvite(phone, groupId);
    if (res.OK) {
      setLoading(false);
      onCloseRequest();
    } else {
      pushToast("error", "An error occurred inviting your friend");
    }
  }

  return (
    <Modal visible={true} presentationStyle={"pageSheet"} animationType={"slide"}>
      <BackContainer onBackPressed={onCloseRequest} title={"Invite a Friend"}>
        <Text style={commonStyles.inputLabel}>Phone</Text>
        <TextInput style={commonStyles.textInput} onChangeText={setPhone} />
        <VBuffer height={8} />
        <Button title={"Invite"} onPress={submit} color={Colors.light.theme} disabled={loading} />
      </BackContainer>
    </Modal>
  )
}
