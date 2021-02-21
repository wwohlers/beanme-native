import React, {useState} from "react";
import {TouchableWithoutFeedback, View, Text, TextInput} from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {commonStyles} from "../../styles/common";
import VBuffer from "../layout/VBuffer";
import {SafeAreaView} from "react-native-safe-area-context";

export default function Auth() {
  type AuthMode = "SignIn" | "SignUp";
  const [mode, setMode] = useState("SignIn" as AuthMode);

  const alternateMode = () => {
    mode === "SignIn" ? setMode("SignUp") : setMode("SignIn");
  }
  const switchModeText = mode === "SignIn" ? "Don't have an account?" : "Already have an account?";
  return (
    <SafeAreaView>
      <View style={commonStyles.container}>
        { !!(mode === "SignIn") && <SignIn /> }
        { !!(mode === "SignUp") && <SignUp /> }
        <VBuffer height={16} />
        <TouchableWithoutFeedback onPress={alternateMode}>
          <Text>{ switchModeText }</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  )
}
