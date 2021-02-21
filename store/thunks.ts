import {PopulatedGroup} from "../utils/models/Group";
import {Api} from "../utils/api";
import {setGroups, setNotifications, setUser, signOut} from "./actions";
import {store} from "./index";
import pushToast from "../utils/toast";

export async function thunkCrons() {
  setInterval(() => {
    updateUser();
  }, 10000)
}

export async function updateUser() {
  const token = store.getState().token;
  if (token) {
    const res = await Api.users.getMe();
    if (res.OK && res.data) {
      store.dispatch(setUser(res.data));
      await loadGroups();
      await getNotifications();
    }
  }
}

export async function getNotifications() {
  const user = store.getState().user;
  if (user) {
    const res = await Api.notifications.getNotifications();
    if (res.OK && res.data) {
      store.dispatch(setNotifications(res.data));
    }
  }
}

export async function loadGroups() {
  const user = store.getState().user;
  if (user) {
    const _groups = await Promise.all(user.groups.map(g => {
      return new Promise<PopulatedGroup>(async (resolve, reject) => {
        const res = await Api.groups.getGroup(g);
        if (res.OK) resolve(res.data as PopulatedGroup);
        reject();
      })
    }))
    store.dispatch(setGroups(_groups));
  }
}
