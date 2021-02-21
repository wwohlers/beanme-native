import React, {useState} from 'react';
import {Button, Modal, Text, TextInput} from "react-native";
import BackContainer from "../layout/BackContainer";
import {commonStyles} from "../../styles/common";
import VBuffer from "../layout/VBuffer";
import Colors from "../../constants/Colors";
import {Api} from "../../utils/api";
import {store} from "../../store";
import {updateUser} from "../../store/thunks";
import pushToast from "../../utils/toast";
import Label from "../reusable/fonts/Label";
import BeanButton from "../reusable/BeanButton";

export default function CreateGroupModal(
  { onRequestClose } : { onRequestClose: () => void }
) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (name) {
      setLoading(true);
      const res = await Api.groups.createGroup(name);
      if (res.OK && res.data) {
        updateUser();
        onRequestClose();
      } else {
        pushToast("error", "An error occurred creating your group");
      }
    }
  }

  return (
    <Modal visible={true} presentationStyle={"pageSheet"} animationType={"slide"}>
      <BackContainer onBackPressed={onRequestClose} title={"Create a Group"}>
        <Label>Group Name</Label>
        <VBuffer height={2} />
        <TextInput style={commonStyles.textInput} onChangeText={setName} />
        <VBuffer height={10} />
        <BeanButton
          title={"Send"}
          onPress={submit}
          disabled={loading || !name} />
      </BackContainer>
    </Modal>
  )
}
