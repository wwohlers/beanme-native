import React, {useState} from 'react';
import {RefreshControl, ScrollView, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {updateUser} from "../store/thunks";
import User, {Notification} from "../utils/models/User";
import {useSelector} from "react-redux";
import {StoreState} from "../store/state";
import {commonStyles} from "../styles/common";
import SingleNotification from "../components/notifications/SingleNotification";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {BottomTabParamList} from "../utils/navigation";

export default function NotificationsScreen(
  { navigation }:
    { navigation: BottomTabNavigationProp<BottomTabParamList> }
) {
  const user: User = useSelector<StoreState, User>(state => state.user as User);
  const unviewedNotifications = user.notifications.filter(n => !n.viewed);

  const [loading, setLoading] = useState(false);
  /*
   * Because User updates every 10 seconds (and therefore notifications), Notifications will
   *  always be marked as Viewed within 10 seconds of them opening up. This may be inconvenient
   *  for the user because they'll only have 10 seconds to know which notifications are
   *  read/unread. Thus, we'll keep track of which notifications were originally unread when
   *  they first opened the screen.
   */
  const [originallyUnviewed, setOriginallyUnviewed] = useState(unviewedNotifications.map(n => n._id));

  async function reload() {
    setLoading(true);
    await updateUser();
    setOriginallyUnviewed(unviewedNotifications.map(n => n._id));
    setLoading(false);
  }

  const sortByDate = (b: Notification, a: Notification) => a.date - b.date;
  const sortedUnviewedNotifications = unviewedNotifications.sort(sortByDate);
  const sortedViewedNotifications = user.notifications.filter(n => n.viewed).sort(sortByDate);
  return (
    <SafeAreaView>
      <ScrollView
        style={commonStyles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}>
        <Text style={commonStyles.title}>Notifications ({ unviewedNotifications.length })</Text>
        {
          sortedUnviewedNotifications.map(n => <SingleNotification
            notification={n}
            navigation={navigation} />)
        }
        {
          sortedViewedNotifications.map(n => <SingleNotification notification={{
            ...n,
            viewed: !originallyUnviewed.includes(n._id)
          }} key={n._id} navigation={navigation} />)
        }
      </ScrollView>
    </SafeAreaView>
  )
}
