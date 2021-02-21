import React, {useEffect, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {updateUser} from "../store/thunks";
import User from "../utils/models/User";
import {useSelector} from "react-redux";
import {StoreState} from "../store/state";
import {commonStyles} from "../styles/common";
import SingleNotification from "../components/notifications/SingleNotification";
import {BottomTabNavigationProp} from "@react-navigation/bottom-tabs";
import {BottomTabParamList} from "../utils/navigation";
import Notification from "../utils/models/Notification";
import DMSans from "../components/reusable/fonts/DMSans";
import VBuffer from "../components/layout/VBuffer";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {View} from "../components/Themed";
import {store} from "../store";
import {signOut} from "../store/actions";
import {Api} from "../utils/api";

export default function NotificationsScreen(
  { navigation }:
    { navigation: BottomTabNavigationProp<BottomTabParamList> }
) {
  const notifications: Notification[] = useSelector<StoreState, Notification[]>(state => state.notifications as Notification[]);
  const unviewedNotifications = notifications.filter(n => !n.viewed);

  const [loading, setLoading] = useState(false);
  /*
   * Because User updates every 10 seconds (and therefore notifications), Notifications will
   *  always be marked as Viewed within 10 seconds of them opening up. This may be inconvenient
   *  for the user because they'll only have 10 seconds to know which notifications are
   *  read/unread. Thus, we'll keep track of which notifications were originally unread when
   *  they first opened the screen.
   */
  const [originallyUnviewed, setOriginallyUnviewed] = useState(unviewedNotifications.map(n => n.id));

  useEffect(() => {
    Api.notifications.markNotificationsRead();
  }, [])

  async function reload() {
    setLoading(true);
    await updateUser();
    setOriginallyUnviewed(unviewedNotifications.map(n => n.id));
    setLoading(false);
  }

  async function _signOut() {
    store.dispatch(signOut());
  }

  const sortByDate = (b: Notification, a: Notification) => a.date - b.date;
  const sortedUnviewedNotifications = unviewedNotifications.sort(sortByDate);
  const sortedViewedNotifications = notifications.filter(n => n.viewed).sort(sortByDate);
  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ padding: 8 }}
        style={commonStyles.container}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}>
        <DMSans fontSize={28}>Notifications ({ unviewedNotifications.length })</DMSans>
        <VBuffer height={16} />
        {
          sortedUnviewedNotifications.map(n => <SingleNotification
            notification={n}
            navigation={navigation} key={n.id} />)
        }
        {
          sortedViewedNotifications.map(n => <SingleNotification notification={{
            ...n,
            viewed: !originallyUnviewed.includes(n.id)
          }} key={n.id} navigation={navigation} />)
        }
        <TouchableWithoutFeedback onPress={_signOut}>
          <View style={styles.topRight}>
            <MaterialCommunityIcons
              name={"logout"} size={28}
              color={Colors.light.text} />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = {
  topRight: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#F0F0F0"
  }
}
