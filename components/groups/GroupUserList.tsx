import React, {useEffect, useState} from 'react';
import Group, {PopulatedGroup, PopulatedGroupUser} from "../../utils/models/Group";
import User from "../../utils/models/User";
import {Api} from "../../utils/api";
import {ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import GroupUser from "./GroupUser";
import FloatingActionButton from "../layout/FloatingActionButton";
import InviteModal from "./InviteModal";

export default function GroupUserList({ group }: { group: PopulatedGroup }) {
  const [showInviteModal, setShowInviteModal] = useState(false);

  const sortedUsers = group.users.sort((a, b) => b.beans - a.beans);
  return (
    <ScrollView>
      { sortedUsers.map((user, i) => <GroupUser user={user} group={group} key={i} />) }
      <FloatingActionButton onPress={() => setShowInviteModal(true)} />
      { showInviteModal && <InviteModal groupId={group._id} onCloseRequest={() => setShowInviteModal(false)} /> }
    </ScrollView>
  )
}
