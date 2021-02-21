export default interface Task {
  id: string;
  groupId: string;
  creator: string;
  assignee: string;
  description: string;
  beanReward: number;
  completeBy: number;
  fulfilled: boolean;
  commitments: Commitment[];
}

export interface Commitment {
  userId: string;
  amountPaid: number;
  date: number;
}
