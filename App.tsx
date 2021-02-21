import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider, useSelector} from 'react-redux';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store";
import {BottomTabParamList} from "./utils/navigation";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import Colors from "./constants/Colors";
import {FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {StoreState} from "./store/state";
import Auth from "./components/auth/Auth";
import GroupsScreen from "./screens/GroupsScreen";
import TasksScreen from "./screens/TasksScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import {thunkCrons} from "./store/thunks";
import User from "./utils/models/User";
import { useFonts, DMSans_400Regular, DMSans_700Bold } from "@expo-google-fonts/dm-sans";
import Notification from "./utils/models/Notification";
import Toast from 'react-native-toast-message';
import {toastConfig} from "./utils/toast-config";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [fontsLoaded] = useFonts({DMSans_400Regular, DMSans_700Bold})

  useEffect(() => {
    thunkCrons();
  }, [])

  if (!isLoadingComplete || !fontsLoaded) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <AppContent />
            <Toast ref={(ref) => Toast.setRef(ref)} config={toastConfig} />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    );
  }
}

function AppContent() {
  const colorScheme = useColorScheme();
  const user = useSelector<StoreState>(state => state.user);

  return !user ? <Auth /> : (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <BottomTabNavigator />
    </NavigationContainer>
  )
}

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const notifications: Notification[] = useSelector<StoreState, Notification[]>(state => state.notifications as Notification[]);
  const unreadCount = notifications.filter(n => !n.viewed).length;
  const badge = unreadCount ? { tabBarBadge: unreadCount } : {}

  return (
    <BottomTab.Navigator
      initialRouteName="Tasks"
      tabBarOptions={{
        activeTintColor: Colors.light.theme,
        inactiveTintColor: Colors.light.medium,
        showLabel: false,
      }}>
      <BottomTab.Screen
        name="Groups"
        component={GroupsScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="users" color={color} size={20} />,
        }}
      />
      <BottomTab.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="tasks" color={color} size={20} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="bell" color={color} size={20} />,
          tabBarBadgeStyle: { fontFamily: "DMSans_700Bold", fontSize: 12 },
          ...badge
        }}
      />
    </BottomTab.Navigator>
  );
}
