export default interface Notification {
  id: string;
  type: NotificationType;
  description: string;
  viewed: boolean;
  date: number;
  userOwnerId: string;
  groupRef?: string;
  taskRef?: string;
  userTopicId?: string;
}

export enum NotificationType {
  INVITE = "INVITE",
  TASK_CREATED = "TASK_CREATED",
  TASK_FULFILLED = "TASK_FULFILLED",
  OUT_OF_BEANS = "OUT_OF_BEANS",
  INCOMING_TRANSFER = "INCOMING_TRANSFER",
  USER_JOINED = "USER_JOINED"
}
