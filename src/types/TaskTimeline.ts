import { Task } from "@/constants/DefaultTasks";

export type TaskTimeline = {
  task: Task;
  timeline: {
    time: string;
    required_personnel: number;
  }[];
}[];
