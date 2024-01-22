import { User } from "@/constants/DefaultUsers";
import { Task } from "@/constants/DefaultTasks";

export type UserTimelines = {
  user: User;
  timeline: {
    time: string;
    task: Task | null;
  }[];
}[];
