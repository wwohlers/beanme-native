import React, {useState} from 'react';
import User from "../../utils/models/User";
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {commonStyles} from "../../styles/common";
import Group, {PopulatedGroupUser} from "../../utils/models/Group";
import Bean from "../drawings/Bean";
import HBuffer from "../layout/HBuffer";
import TransferModal from "./TransferModal";
import {useSelector} from "react-redux";
import {StoreState} from "../../store/state";
import Colors from "../../constants/Colors";
import DMSans from "../reusable/fonts/DMSans";
import VBuffer from "../layout/VBuffer";
import Label from "../reusable/fonts/Label";

export default function GroupUser(
  { user, group }:
  { user: PopulatedGroupUser, group: Group }) {
  const { id } = useSelector<StoreState, User>(state => state.user as User);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const balance = group.users.find(u => u.userId === id)?.numBeans || 0;
  const me = id === user.userId;
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => !me ? setShowTransferModal(true) : null}>
        <View style={commonStyles.tile}>
          {
            me ? <DMSans fontSize={18} fontWeight={700}>Me</DMSans> : <DMSans fontSize={18}>{ user.name }</DMSans>
          }
          <VBuffer height={12} />
          <View style={commonStyles.flexRow}>
            <Bean size={12} color={Colors.light.theme} />
            <HBuffer width={4} />
            <DMSans fontSize={14}>{ user.numBeans }</DMSans>
          </View>
        </View>
      </TouchableWithoutFeedback>
      { showTransferModal && <TransferModal
        user={user}
        balance={balance}
        groupId={group.id}
        onRequestClose={() => setShowTransferModal(false)} /> }
    </View>
  )
}
