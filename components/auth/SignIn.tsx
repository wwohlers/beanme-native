import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {commonStyles} from "../../styles/common";
import Colors from "../../constants/Colors";
import VBuffer from "../layout/VBuffer";
import {Api} from "../../utils/api";
import {store} from "../../store";
import {setToken, setUser} from "../../store/actions";
import pushToast from "../../utils/toast";
import {loadGroups} from "../../store/thunks";

export default function SignIn() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  async function signIn() {
    const res = await Api.users.signIn(phone, password);
    if (res.OK && res.data) {
      store.dispatch(setUser(res.data));
      store.dispatch(setToken(res.data.token));
      await loadGroups();
    } else {
      pushToast("error", "Error signing in");
    }
  }

  return (
    <View>
      <Text style={commonStyles.title}>Sign In</Text>
      <VBuffer height={8} />
      <Text style={commonStyles.inputLabel}>Phone</Text>
      <TextInput style={commonStyles.textInput} onChangeText={setPhone} />
      <VBuffer height={8} />
      <Text style={commonStyles.inputLabel}>Password</Text>
      <TextInput style={commonStyles.textInput} onChangeText={setPassword} secureTextEntry={true} />
      <VBuffer height={8} />
      <Button title={"Sign In"} onPress={signIn} color={Colors.light.theme} />
    </View>
  )
}
