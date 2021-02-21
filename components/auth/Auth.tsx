import React, {useState} from "react";
import {TouchableWithoutFeedback, View, Text, TextInput} from "react-native";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import {commonStyles} from "../../styles/common";
import VBuffer from "../layout/VBuffer";
import {SafeAreaView} from "react-native-safe-area-context";
import Label from "../reusable/fonts/Label";
import DMSans from "../reusable/fonts/DMSans";
import Colors from "../../constants/Colors";

export default function Auth() {
  type AuthMode = "SignIn" | "SignUp";
  const [mode, setMode] = useState("SignUp" as AuthMode);

  const alternateMode = () => {
    mode === "SignIn" ? setMode("SignUp") : setMode("SignIn");
  }
  const switchModeText = mode === "SignIn" ? "Don't have an account?" : "Already have an account?";
  return (
    <SafeAreaView>
      <View style={commonStyles.container}>
        <View style={{ padding: 8 }}>
          { !!(mode === "SignIn") && <SignIn /> }
          { !!(mode === "SignUp") && <SignUp /> }
          <VBuffer height={24} />
          <TouchableWithoutFeedback onPress={alternateMode}>
            <View>
              <DMSans
                fontWeight={700}
                fontSize={13}
                style={{ textTransform: "uppercase", color: Colors.light.medium }}>
                { switchModeText }
              </DMSans>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  )
}
