export default interface Notification {
  id: string;
  type: NotificationType;
  description: string;
  viewed: boolean;
  date: number;
  userOwnerId: string;
  groupId?: string;
  taskId?: string;
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
