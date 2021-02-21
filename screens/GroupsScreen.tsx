import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, TouchableWithoutFeedback, View} from "react-native";
import {commonStyles} from "../styles/common";
import Group, {PopulatedGroup} from "../utils/models/Group";
import {useSelector} from "react-redux";
import {StoreState} from "../store/state";
import User from "../utils/models/User";
import GroupListItem from "../components/groups/GroupListItem";
import BackContainer from "../components/layout/BackContainer";
import GroupUserList from "../components/groups/GroupUserList";
import FloatingActionButton from "../components/layout/FloatingActionButton";
import CreateGroupModal from "../components/groups/CreateGroupModal";
import { RouteProp } from "@react-navigation/native";
import {BottomTabParamList} from "../utils/navigation";

export default function GroupsScreen(
  { route }:
    { route: RouteProp<BottomTabParamList, 'Groups'> }
) {
  const user: User = useSelector<StoreState, User>(state => state.user as User);
  const groups: PopulatedGroup[] = useSelector<StoreState, PopulatedGroup[]>(state => state.groups);
  const [activeGroup, setActiveGroup] = useState(null as PopulatedGroup | null);
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);

  useEffect(() => {
    if (route.params && route.params.groupId) {
      const group = groups.find(g => g._id === route.params.groupId);
      if (group) setActiveGroup(group);
    }
  }, [route])

  function renderGroup(g: PopulatedGroup, i: number) {
    const onPress = () => setActiveGroup(g);
    const onBackPressed = () => setActiveGroup(null);
    return (
      <TouchableWithoutFeedback key={i} onPress={onPress}>
        <View>
          <GroupListItem group={g} onBackPressed={onBackPressed} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  const noActiveGroupRender = (
    <ScrollView style={commonStyles.container}>
      <Text style={commonStyles.title}>Groups</Text>
      { groups.map(renderGroup) }
      <FloatingActionButton onPress={() => setShowCreateGroupModal(true)} />
      { showCreateGroupModal && <CreateGroupModal onRequestClose={() => setShowCreateGroupModal(false)} /> }
    </ScrollView>
  )
  const activeGroupRender = (group: PopulatedGroup) => (
    <BackContainer onBackPressed={() => setActiveGroup(null)} title={group.name}>
      <GroupUserList group={group} />
    </BackContainer>
  )
  return (
    <SafeAreaView>
      { !activeGroup && noActiveGroupRender }
      { activeGroup && activeGroupRender(activeGroup) }
    </SafeAreaView>
  )
}
