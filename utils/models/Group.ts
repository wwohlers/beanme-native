export default interface Group {
  _id: string;
  name: string;
  users: GroupUser[];
  scheduledTasks: ScheduledTask[];
  invites: string[];
}

export interface GroupUser {
  userId: string;
  beans: number;
}

export interface PopulatedGroupUser {
  userId: string;
  name: string;
  beans: number;
}

export interface ScheduledTask {
  taskId: string;
  interval: number;
}

export interface PopulatedGroup extends Group {
  users: PopulatedGroupUser[];
}
