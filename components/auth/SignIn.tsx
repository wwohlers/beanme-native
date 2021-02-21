import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {commonStyles} from "../../styles/common";
import Colors from "../../constants/Colors";
import VBuffer from "../layout/VBuffer";
import {Api} from "../../utils/api";
import {store} from "../../store";
import {setToken, setUser} from "../../store/actions";
import pushToast from "../../utils/toast";
import {loadGroups, updateUser} from "../../store/thunks";
import DMSans from "../reusable/fonts/DMSans";
import Label from "../reusable/fonts/Label";
import BeanButton from "../reusable/BeanButton";
import {formatPhone} from "../../utils/format";

export default function SignIn() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signIn() {
    setLoading(true);
    const res = await Api.users.signIn(formatPhone(phone), password);
    setLoading(false);
    if (res.OK && res.data) {
      store.dispatch(setToken(res.data.access_token));
      await updateUser();
    } else {
      pushToast("error", "Error signing in");
    }
  }

  return (
    <View>
      <DMSans fontSize={28}>Sign in</DMSans>

      <VBuffer height={16} />
      <Label>Phone</Label>
      <VBuffer height={4} />
      <TextInput style={commonStyles.textInput} onChangeText={setPhone} />

      <VBuffer height={16} />
      <Label>Password</Label>
      <VBuffer height={4} />
      <TextInput style={commonStyles.textInput} onChangeText={setPassword} secureTextEntry={true} />

      <VBuffer height={16} />
      <BeanButton
        title={"Sign In"}
        onPress={signIn}
        disabled={!phone || !password}
        loading={loading} />
    </View>
  )
}
