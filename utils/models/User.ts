export default interface User {
  _id: string;
  name: string;
  phone: string;
  password: string;
  token: string;
  groups: string[];
  notifications: Notification[];
}

export interface Notification {
  _id: string;
  type: NotificationType;
  description: string;
  viewed: boolean;
  date: number;
  groupRef?: string;
  taskRef?: string;
  userRef?: string;
}

export enum NotificationType {
  INVITE = "INVITE",
  TASK_CREATED = "TASK_CREATED",
  TASK_FULFILLED = "TASK_FULFILLED",
  OUT_OF_BEANS = "OUT_OF_BEANS",
  INCOMING_TRANSFER = "INCOMING_TRANSFER",
  USER_JOINED = "USER_JOINED"
}
