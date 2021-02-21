import React, {useState} from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {commonStyles} from "../../styles/common";
import VBuffer from "../layout/VBuffer";
import {Api} from "../../utils/api";
import {store} from "../../store";
import {setToken, setUser} from "../../store/actions";
import pushToast from "../../utils/toast";
import Colors from "../../constants/Colors";
import {loadGroups} from "../../store/thunks";

export default function SignUp() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  async function signUp() {
    const res = await Api.users.signUp(name, phone, password);
    if (res.OK && res.data) {
      store.dispatch(setUser(res.data));
      store.dispatch(setToken(res.data.token));
      await loadGroups();
    } else {
      pushToast("error", "Error creating account");
    }
  }

  return (
    <View>
      <Text style={commonStyles.title}>Create an Account</Text>
      <VBuffer height={8} />
      <Text style={commonStyles.inputLabel}>Name</Text>
      <TextInput style={commonStyles.textInput} onChangeText={setPhone} />
      <VBuffer height={8} />
      <Text style={commonStyles.inputLabel}>Phone</Text>
      <TextInput style={commonStyles.textInput} onChangeText={setPhone} />
      <VBuffer height={8} />
      <Text style={commonStyles.inputLabel}>Password</Text>
      <TextInput style={commonStyles.textInput} onChangeText={setPassword} secureTextEntry={true} />
      <VBuffer height={8} />
      <Text style={commonStyles.inputLabel}>Confirm Password</Text>
      <TextInput style={commonStyles.textInput} onChangeText={setPassword} secureTextEntry={true} />
      <VBuffer height={8} />
      <Button title={"Create Account"} onPress={signUp} color={Colors.light.theme} />
    </View>
  )
}
