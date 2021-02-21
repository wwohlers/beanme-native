import {PopulatedGroup} from "../utils/models/Group";
import {Api} from "../utils/api";
import {setGroups, setUser, signOut} from "./actions";
import {store} from "./index";
import pushToast from "../utils/toast";

export async function thunkCrons() {
  setInterval(() => {
    updateUser();
  }, 10000)
}

export async function updateUser() {
  const user = store.getState().user;
  if (user) {
    const res = await Api.users.getMe();
    if (res.OK && res.data) {
      store.dispatch(setUser(res.data));
      await loadGroups();
    } else {
      pushToast("error", "Please sign in again");
      store.dispatch(signOut());
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
