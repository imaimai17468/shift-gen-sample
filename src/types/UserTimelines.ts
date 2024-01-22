import { Task } from "@/constants/DefaultTasks";

export type UserTimelines = {
  user: string;
  timeline: {
    time: string;
    task: Task | null;
  }[];
}[];
