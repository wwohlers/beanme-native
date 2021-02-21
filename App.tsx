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

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    thunkCrons();
  }, [])

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <AppContent />
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
  const user: User = useSelector<StoreState, User>(state => state.user as User);
  const unreadCount = user.notifications.filter(n => !n.viewed).length;

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
          tabBarBadge: unreadCount
        }}
      />
    </BottomTab.Navigator>
  );
}
