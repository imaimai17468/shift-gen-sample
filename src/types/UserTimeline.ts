import { User } from "@/constants/DefaultUsers";
import { Task } from "@/constants/DefaultTasks";

export type UserTimeline = {
  user: User;
  timeline: {
    time: string;
    task: Task;
  }[];
}[];
