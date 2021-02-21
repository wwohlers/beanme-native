import User from "../utils/models/User";
import Group, {PopulatedGroup} from "../utils/models/Group";
import Task from "../utils/models/Task";

export interface StoreState {
  user: User | null;
  token: string | null;
  groups: PopulatedGroup[];
}

const initialState = {
  user: null,
  token: null,
  groups: []
}

const actionMap: {[key: string]: (state: StoreState, payload: any) => Partial<StoreState>} = {
  setUser: (state: StoreState, user: User | null) => {
    return { user }
  },

  setToken: (state: StoreState, token: string | null) => {
    return { token }
  },

  signOut: (state: StoreState) => {
    return {
      user: null,
      token: null
    }
  },

  setGroups: (state: StoreState, groups: PopulatedGroup[]) => {
    return { groups }
  },

  addGroup: (state: StoreState, group: PopulatedGroup) => {
    return { groups: [ ...state.groups, group ]};
  },

  patchGroup: (state: StoreState, group: Group) => {
    const existingGroup = state.groups.find(g => g._id === group._id);
    if (existingGroup) {
      return {
        groups: state.groups.map(g => {
          if (g._id === group._id) return updateKeepPopulated(group, existingGroup);
          else return g;
        })
      }
    } else return state;
  }
}

function updateKeepPopulated(group: Group, populatedGroup: PopulatedGroup): PopulatedGroup {
  return {
    ...group,
    users: group.users
      .filter(u => populatedGroup.users.some(_u => _u.userId === u.userId))
      .map(u => {
        return {
          userId: u.userId,
          beans: u.beans,
          name: populatedGroup.users.find(_u => _u.userId === u.userId)?.name as string
        }
      })
  }
}

export default (state: StoreState = initialState, action: any) => {
  const actionFunction = actionMap[action.type];
  if (!actionFunction) return state;
  return { ...state, ...actionFunction(state, action.payload) };
}
