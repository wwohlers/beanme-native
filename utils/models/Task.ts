export default interface Task {
  _id: string;
  groupId: string;
  creator: string;
  assignee: string;
  description: string;
  beanReward: number;
  completeBy: number;
  completed: boolean;
  commitments: Commitment[];
}

export interface Commitment {
  userId: string;
  amount: number;
  date: number;
}
