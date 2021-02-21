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

export default function GroupUser(
  { user, group }:
  { user: PopulatedGroupUser, group: Group }) {
  const { _id } = useSelector<StoreState, User>(state => state.user as User);
  const [showTransferModal, setShowTransferModal] = useState(false);

  const balance = group.users.find(u => u.userId === _id)?.beans || 0;
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setShowTransferModal(true)}>
        <View style={commonStyles.tile}>
          <Text>{ user.name }</Text>
          <View style={commonStyles.flexRow}>
            <Bean size={12} color={Colors.light.medium} />
            <HBuffer width={2} />
            <Text>{ user.beans }</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      { showTransferModal && <TransferModal
        user={user}
        balance={balance}
        groupId={group._id}
        onRequestClose={() => setShowTransferModal(false)} /> }
    </View>
  )
}
