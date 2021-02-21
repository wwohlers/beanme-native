import React from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {commonStyles} from "../../styles/common";
import {relativeDate} from "../../utils/format";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {BottomTabParamList} from "../../utils/navigation";
import {Api} from "../../utils/api";
import {updateUser} from "../../store/thunks";
import pushToast from "../../utils/toast";
import Notification, {NotificationType} from "../../utils/models/Notification";
import DMSans from "../reusable/fonts/DMSans";
import Label from "../reusable/fonts/Label";
import HBuffer from "../layout/HBuffer";

export default function SingleNotification(
  { notification, navigation }:
    { notification: Notification, navigation: BottomTabNavigationProp<BottomTabParamList> }
) {
  const acceptInvite = async (n: Notification) => {
    const groupId = n.groupRef;
    if (groupId) {
      const res = await Api.groups.acceptInvite(groupId);
      if (res.OK && res.data) {
        await updateUser();
        navigation.navigate("Groups", { groupId });
      } else {
        pushToast("error", "An error occurred accepting your invite");
      }
    } else {
      pushToast("error", "An error occurred accepting your invite");
    }
  }

  const navigateTask = (n: Notification) => navigation.navigate("Tasks", {taskId: n.taskRef});
  const navigateGroup = (n: Notification) => navigation.navigate("Groups", { groupId: n.groupRef });

  const handlerMap = new Map<NotificationType, (n: Notification) => void>([
    [NotificationType.INVITE, acceptInvite],
    [NotificationType.TASK_CREATED, navigateTask],
    [NotificationType.TASK_FULFILLED, navigateTask],
    [NotificationType.OUT_OF_BEANS, navigateGroup],
    [NotificationType.INCOMING_TRANSFER, navigateGroup],
    [NotificationType.USER_JOINED, navigateGroup]
  ])

  const fontWeight = !notification.viewed ? 700 : 400;
  const handler = handlerMap.get(notification.type);
  return (
    <TouchableWithoutFeedback onPress={() => handler ? handler(notification) : null }>
      <View style={commonStyles.tile}>
        <DMSans fontWeight={fontWeight} fontSize={16}>
          { notification.description }
          <HBuffer width={10} />
          <Label>{ relativeDate(notification.date) }</Label>
        </DMSans>
      </View>
    </TouchableWithoutFeedback>
  )
}
