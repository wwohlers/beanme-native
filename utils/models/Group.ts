export default interface Group {
  id: string;
  groupName: string;
  users: GroupUser[];
  scheduledTasks: ScheduledTask[];
  invites: string[];
}

export interface GroupUser {
  userId: string;
  numBeans: number;
}

export interface PopulatedGroupUser {
  userId: string;
  name: string;
  numBeans: number;
}

export interface ScheduledTask {
  taskId: string;
  interval: number;
}

export interface PopulatedGroup extends Group {
  users: PopulatedGroupUser[];
}
