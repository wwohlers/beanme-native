import React, {useEffect, useState} from 'react';
import Group, {PopulatedGroup, PopulatedGroupUser} from "../../utils/models/Group";
import User from "../../utils/models/User";
import {Api} from "../../utils/api";
import {ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import GroupUser from "./GroupUser";
import FloatingActionButton from "../layout/FloatingActionButton";
import InviteModal from "./InviteModal";
import BeanButton from "../reusable/BeanButton";
import VBuffer from "../layout/VBuffer";

export default function GroupUserList({ group }: { group: PopulatedGroup }) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const sortedUsers = group.users.sort((a, b) => b.numBeans - a.numBeans);
  return (
    <ScrollView>
      <BeanButton title={"Invite"} onPress={() => setShowInviteModal(true)} />
      <VBuffer height={16} />
      { sortedUsers.map((user, i) => <GroupUser user={user} group={group} key={i} />) }
      { showInviteModal && <InviteModal groupId={group.id} onCloseRequest={() => setShowInviteModal(false)} /> }
    </ScrollView>
  )
}
