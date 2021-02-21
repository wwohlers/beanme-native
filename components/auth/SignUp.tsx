import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {commonStyles} from "../../styles/common";
import VBuffer from "../layout/VBuffer";
import {Api} from "../../utils/api";
import {store} from "../../store";
import {setToken, setUser} from "../../store/actions";
import pushToast from "../../utils/toast";
import Colors from "../../constants/Colors";
import {loadGroups, updateUser} from "../../store/thunks";
import DMSans from "../reusable/fonts/DMSans";
import Label from "../reusable/fonts/Label";
import BeanButton from "../reusable/BeanButton";
import {formatPhone} from "../../utils/format";

export default function SignUp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function valid() {
    return name && phone && password && confPassword === password;
  }

  async function signUp() {
    setLoading(true);
    const res = await Api.users.signUp(name, formatPhone(phone), password);
    setLoading(false);
    if (res.OK && res.data) {
      store.dispatch(setToken(res.data.access_token));
      store.dispatch(setUser(res.data.user));
    } else {
      pushToast("error", "Error creating account");
    }
  }

  return (
    <View>
      <DMSans fontSize={28}>Create an account</DMSans>

      <VBuffer height={16} />
      <Label>Name</Label>
      <VBuffer height={4} />
      <TextInput style={commonStyles.textInput} onChangeText={setName} />

      <VBuffer height={16} />
      <Label>Phone</Label>
      <VBuffer height={4} />
      <TextInput style={commonStyles.textInput} onChangeText={setPhone} />

      <VBuffer height={16} />
      <Label>Password</Label>
      <VBuffer height={4} />
      <TextInput style={commonStyles.textInput} onChangeText={setPassword} secureTextEntry={true} />

      <VBuffer height={16} />
      <Label>Confirm Password</Label>
      <VBuffer height={4} />
      <TextInput style={commonStyles.textInput} onChangeText={setConfPassword} secureTextEntry={true} />

      <VBuffer height={16} />
      <BeanButton title={"Create Account"} onPress={signUp} disabled={!valid()} loading={loading} />
    </View>
  )
}
