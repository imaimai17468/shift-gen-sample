import { Task } from "@/constants/DefaultTasks";

export type TaskTimelines = {
  task: Task;
  timeline: {
    time: string;
    required_personnel: number;
  }[];
}[];
