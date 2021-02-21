import User from "./models/User";
import http, {ApiResponse} from "./http";
import Group, {PopulatedGroup} from "./models/Group";
import Task from "./models/Task";
import Notification, {NotificationType} from "./models/Notification";

interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

const realApi = {
  users: {
    signUp: async function(name: string, phone: string, password: string): Promise<ApiResponse<AuthResponse>> {
      return http({
        method: "POST",
        uri: `/auth/signup`,
        body: { name, phone, password },
        errors: new Map()
      })
    },

    signIn: async function(phone: string, password: string): Promise<ApiResponse<AuthResponse>> {
      return http({
        method: "POST",
        uri: `/auth/login`,
        body: { phone, password },
        errors: new Map()
      })
    },

    getMe: async function(): Promise<ApiResponse<User>> {
      return http({
        method: "GET",
        uri: `/user`,
        errors: new Map()
      })
    }
  },

  groups: {
    createGroup: async function(name: string): Promise<ApiResponse<Group>> {
      return http({
        method: "POST",
        uri: `/groups/create`,
        body: { name },
        errors: new Map()
      }, true)
    },

    getGroup: async function(groupId: string): Promise<ApiResponse<Group>> {
      return http({
        method: "POST",
        uri: `/groups`,
        body: { groupId },
        errors: new Map()
      })
    },

    getTasksByGroup: async function(groupId: string): Promise<ApiResponse<Task[]>> {
      return http({
        method: "POST",
        uri: `/groups/tasks`,
        body: { groupId },
        errors: new Map()
      })
    },

    createInvite: async function(phone: string, groupId: string): Promise<ApiResponse<Group>> {
      return http({
        method: "POST",
        uri: `/groups/invite`,
        body: { phone, groupId },
        errors: new Map()
      }, true)
    },

    acceptInvite: async function(groupId: string): Promise<ApiResponse<Group>> {
      return http({
        method: "POST",
        uri: `/groups/accept-invite`,
        body: { groupId },
        errors: new Map()
      })
    },

    scheduleTask: async function(groupId: string, taskId: string, interval: number): Promise<ApiResponse<Group>> {
      return http({
        method: "POST",
        uri: `/groups/schedule-task`,
        body: { groupId, taskId, interval },
        errors: new Map()
      })
    },

    transfer: async function(groupId: string, targetUser: string, amount: number): Promise<ApiResponse<Group>> {
      return http({
        method: "POST",
        uri: `/groups/transfer`,
        body: { groupId, targetUser, amount },
        errors: new Map()
      })
    }
  },

  tasks: {
    getTaskById: async function(taskId: string): Promise<ApiResponse<Task>> {
      return http({
        method: "POST",
        uri: `/tasks`,
        body: { taskId },
        errors: new Map()
      })
    },

    createTask: async function(groupId: string, description: string, beanReward: number, completeBy: number): Promise<ApiResponse<Task>> {
      return http({
        method: "POST",
        uri: `/tasks/make`,
        body: { groupId, description, beanReward, completeBy },
        errors: new Map()
      })
    },

    commit: async function(taskId: string, amount: number): Promise<ApiResponse<Task>> {
      return http({
        method: "POST",
        uri: `/tasks/commit`,
        body: { taskId, amount },
        errors: new Map()
      })
    },

    deleteTask: async function(taskId: string): Promise<ApiResponse<void>> {
      return http({
        method: "DELETE",
        uri: `/tasks`,
        body: { taskId },
        errors: new Map<number, string>()
      })
    }
  },

  notifications: {
    getNotifications(): Promise<ApiResponse<Notification[]>> {
      return http({
        method: "GET",
        uri: `/notifications`,
        errors: new Map<number, string>()
      })
    },

    markNotificationsRead(): Promise<ApiResponse<void>> {
      return http({
        method: "POST",
        uri: `/notifications`,
        errors: new Map<number, string>()
      })
    }
  }
}

const mockApi = {
  users: {
    signUp: async function(name: string, phone: string, password: string): Promise<ApiResponse<User>> {
      return {
        OK: true,
        data: {
          _id: "TEST_USER_ID",
          name: "Test User Name",
          phone: "8452745678",
          password: "as;ldfjas;hger;gjh",
          token: "ABCDEF",
          groups: ["TEST_GROUP_ID"],
        }
      }
    },

    signIn: async function(phone: string, password: string): Promise<ApiResponse<User>> {
      return {
        OK: true,
        data: {
          _id: "TEST_USER_ID",
          name: "Test User Name",
          phone: "8452745678",
          password: "as;ldfjas;hger;gjh",
          token: "ABCDEF",
          groups: ["TEST_GROUP_ID"],
        }
      }
    },

    getMe: async function(): Promise<ApiResponse<User>> {
      return {
        OK: true,
        data: {
          _id: "TEST_USER_ID",
          name: "Test User Name",
          phone: "8452745678",
          password: "as;ldfjas;hger;gjh",
          token: "ABCDEF",
          groups: ["TEST_GROUP_ID"],
        }
      }
    }
  },

  groups: {
    createGroup: async function(name: string): Promise<ApiResponse<Group>> {
      return {
        OK: true,
        data: {
          id: "TEST_GROUP_ID",
          groupName: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            numBeans: 8
          }],
          scheduledTasks: [],
          invites: []
        }
      }
    },

    getGroup: async function(id: string): Promise<ApiResponse<PopulatedGroup>> {
      return {
        OK: true,
        data: {
          id: "TEST_GROUP_ID",
          groupName: "Test Group",
          users: [
            {
              userId: "TEST_USER_ID",
              numBeans: 8,
              name: "User 1",
            },
            {
              userId: "TEST_USER_ID_2",
              numBeans: 10,
              name: "User 2"
            }
          ],
          scheduledTasks: [],
          invites: []
        }
      }
    },

    getTasksByGroup: async function(groupId: string): Promise<ApiResponse<Task[]>> {
      return {
        OK: true,
        data: [
          {
            id: "TEST_TASK_ID",
            groupId: "TEST_GROUP_ID",
            creator: "TEST_USER_ID",
            assignee: "TEST_USER_ID",
            description: "Test task",
            beanReward: 4,
            completeBy: Date.now() + 60 * 60 * 1000,
            completed: false,
            commitments: [{
              userId: "TEST_USER_ID",
              amount: 2,
              date: Date.now() - 1000
            }]
          },
        ]
      }
    },

    createInvite: async function(phone: string, groupId: string): Promise<ApiResponse<Group>> {
      return {
        OK: true,
        data: {
          id: "TEST_GROUP_ID",
          groupName: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            numBeans: 8
          }],
          scheduledTasks: [],
          invites: []
        }
      }
    },

    acceptInvite: async function(groupId: string): Promise<ApiResponse<Group>> {
      return {
        OK: true,
        data: {
          id: "TEST_GROUP_ID",
          groupName: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            numBeans: 8
          }],
          scheduledTasks: [],
          invites: []
        }
      }
    },

    scheduleTask: async function(taskId: string, interval: number): Promise<ApiResponse<Group>> {
      return {
        OK: true,
        data: {
          id: "TEST_GROUP_ID",
          groupName: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            numBeans: 8
          }],
          scheduledTasks: [],
          invites: []
        }
      }
    },

    transfer: async function(groupId: string, targetUser: string, amount: number): Promise<ApiResponse<Group>> {
      return {
        OK: true,
        data: {
          id: "TEST_GROUP_ID",
          groupName: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            numBeans: 8
          }],
          scheduledTasks: [],
          invites: []
        }
      }
    }
  },

  tasks: {
    getTaskById: async function(taskId: string): Promise<ApiResponse<Task>> {
      return {
        OK: true,
        data: {
          id: "TEST_TASK_ID",
          groupId: "TEST_GROUP_ID",
          creator: "TEST_USER_ID",
          assignee: "TEST_USER_ID",
          description: "Test Task",
          beanReward: 5,
          completeBy: Date.now() + 60 * 60 * 1000,
          completed: false,
          commitments: []
        }
      }
    },

    createTask: async function(groupId: string, description: string, beanReward: number, completeBy: number): Promise<ApiResponse<Task>> {
      return {
        OK: true,
        data: {
          id: "TEST_TASK_ID",
          groupId: "TEST_GROUP_ID",
          creator: "TEST_USER_ID",
          assignee: "TEST_USER_ID",
          description: "Test Task",
          beanReward: 5,
          completeBy: Date.now() + 60 * 60 * 1000,
          completed: false,
          commitments: []
        }
      }
    },

    commit: async function(taskId: string, amount: number): Promise<ApiResponse<Task>> {
      return {
        OK: true,
        data: {
          id: "TEST_TASK_ID",
          groupId: "TEST_GROUP_ID",
          creator: "TEST_USER_ID",
          assignee: "TEST_USER_ID",
          description: "Test Task",
          beanReward: 5,
          completeBy: Date.now() + 60 * 60 * 1000,
          completed: false,
          commitments: []
        }
      }
    },

    deleteTask: async function(taskId: string): Promise<ApiResponse<void>> {
      return {
        OK: true,
      }
    }
  },

  notifications: {
    getNotifications: async function(): Promise<ApiResponse<Notification[]>> {
      return {
        OK: true,
        data: [
          {
            id: "TEST_NOTIFICATION_ID",
            type: NotificationType.INVITE,
            description: "You've been invited",
            groupRef: "TEST_GROUP_ID",
            date: Date.now() - 1000,
            userOwnerId: "TEST_USER_ID",
            viewed: false
          },
          {
            id: "TEST_NOTIFICATION_ID_1",
            type: NotificationType.INCOMING_TRANSFER,
            description: "Incoming transfer",
            groupRef: "TEST_GROUP_ID",
            date: Date.now() - 1000000,
            userOwnerId: "TEST_USER_ID",
            viewed: true
          },
          {
            id: "TEST_NOTIFICATION_ID_2",
            type: NotificationType.OUT_OF_BEANS,
            description: "Out of beans",
            groupRef: "TEST_GROUP_ID",
            date: Date.now() - 10000,
            userOwnerId: "TEST_USER_ID",
            viewed: true
          },
          {
            id: "TEST_NOTIFICATION_ID_3",
            type: NotificationType.TASK_CREATED,
            description: "Task created",
            taskRef: "TEST_TASK_ID",
            date: Date.now() - 5000,
            userOwnerId: "TEST_USER_ID",
            viewed: false
          }
        ]
      }
    }
  }
}

export const Api = realApi;
