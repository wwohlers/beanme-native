import User from "../utils/models/User";
import Group, {PopulatedGroup} from "../utils/models/Group";
import Notification from "../utils/models/Notification";

const f = (type: string, payload: any = null) => {
  return { type, payload }
};

// Auth
export const setUser = (user: User | null) => f('setUser', user);
export const setToken = (token: string | null) => f('setToken', token);
export const signOut = () => f('signOut');

// Groups
export const setGroups = (groups: PopulatedGroup[] | null) => f('setGroups', groups);
export const addGroup = (group: PopulatedGroup) => f('addGroup', group);
export const patchGroup = (group: Group) => f('patchGroup', group);

// Notifications
export const setNotifications = (notifications: Notification[]) => f('setNotifications', notifications);
