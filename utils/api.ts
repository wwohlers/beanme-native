import User, {NotificationType} from "./models/User";
import http, {ApiResponse} from "./http";
import Group, {PopulatedGroup} from "./models/Group";
import Task from "./models/Task";

const realApi = {
  users: {
    signUp: async function(name: string, phone: string, password: string): Promise<ApiResponse<User>> {
      return http({
        method: "POST",
        uri: `/users/signup`,
        body: { name, phone, password },
        errors: new Map()
      })
    },

    signIn: async function(phone: string, password: string): Promise<ApiResponse<User>> {
      return http({
        method: "POST",
        uri: `/users/signin`,
        body: { phone, password },
        errors: new Map()
      })
    },

    getMe: async function(): Promise<ApiResponse<User>> {
      return http({
        method: "GET",
        uri: `/users`,
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
      })
    },

    getGroup: async function(id: string): Promise<ApiResponse<Group>> {
      return http({
        method: "GET",
        uri: `/groups/${id}`,
        errors: new Map()
      })
    },

    getTasksByGroup: async function(groupId: string): Promise<ApiResponse<Task[]>> {
      return http({
        method: "GET",
        uri: `/groups/${groupId}/tasks`,
        errors: new Map()
      })
    },

    createInvite: async function(phone: string, groupId: string): Promise<ApiResponse<Group>> {
      return http({
        method: "POST",
        uri: `/groups/invite`,
        body: { phone, groupId },
        errors: new Map()
      })
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
        method: "GET",
        uri: `/tasks/${taskId}`,
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
        uri: `/tasks/${taskId}`,
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
          notifications: []
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
          notifications: []
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
          notifications: [
            {
              _id: "TEST_NOTIFICATION_ID",
              type: NotificationType.INVITE,
              description: "You've been invited",
              groupRef: "TEST_GROUP_ID",
              date: Date.now() - 1000,
              viewed: false
            },
            {
              _id: "TEST_NOTIFICATION_ID_1",
              type: NotificationType.INCOMING_TRANSFER,
              description: "Incoming transfer",
              groupRef: "TEST_GROUP_ID",
              date: Date.now() - 1000000,
              viewed: true
            },
            {
              _id: "TEST_NOTIFICATION_ID_2",
              type: NotificationType.OUT_OF_BEANS,
              description: "Out of beans",
              groupRef: "TEST_GROUP_ID",
              date: Date.now() - 10000,
              viewed: true
            },
            {
              _id: "TEST_NOTIFICATION_ID_3",
              type: NotificationType.TASK_CREATED,
              description: "Task created",
              taskRef: "TEST_TASK_ID",
              date: Date.now() - 5000,
              viewed: false
            }
          ]
        }
      }
    }
  },

  groups: {
    createGroup: async function(name: string): Promise<ApiResponse<Group>> {
      return {
        OK: true,
        data: {
          _id: "TEST_GROUP_ID",
          name: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            beans: 8
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
          _id: "TEST_GROUP_ID",
          name: "Test Group",
          users: [
            {
              userId: "TEST_USER_ID",
              beans: 8,
              name: "User 1",
            },
            {
              userId: "TEST_USER_ID_2",
              beans: 10,
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
            _id: "TEST_TASK_ID",
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
          {
            _id: "TEST_TASK_ID_2",
            groupId: "TEST_GROUP_ID",
            creator: "TEST_USER_ID",
            assignee: "TEST_USER_ID",
            description: "Test task 2",
            beanReward: 7,
            completeBy: Date.now() + 24 * 60 * 60 * 1000,
            completed: false,
            commitments: []
          },
          {
            _id: "TEST_TASK_ID_2",
            groupId: "TEST_GROUP_ID",
            creator: "TEST_USER_ID",
            assignee: "TEST_USER_ID",
            description: "Test task 3",
            beanReward: 10,
            completeBy: Date.now() + 48 * 60 * 60 * 1000,
            completed: false,
            commitments: []
          }

        ]
      }
    },

    createInvite: async function(phone: string, groupId: string): Promise<ApiResponse<Group>> {
      return {
        OK: true,
        data: {
          _id: "TEST_GROUP_ID",
          name: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            beans: 8
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
          _id: "TEST_GROUP_ID",
          name: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            beans: 8
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
          _id: "TEST_GROUP_ID",
          name: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            beans: 8
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
          _id: "TEST_GROUP_ID",
          name: "Test Group",
          users: [{
            userId: "TEST_USER_ID",
            beans: 8
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
          _id: "TEST_TASK_ID",
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
          _id: "TEST_TASK_ID",
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
          _id: "TEST_TASK_ID",
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
  }
}

export const Api = mockApi;
