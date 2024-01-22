import { TaskTimelines } from "@/types/TaskTimelines";
import { DEFAULT_TASKS } from "@/constants/DefaultTasks";
import { SHIFT_TIMES } from "@/constants/ShiftTimes";

export const genDefaultTaskTimelines = (): TaskTimelines => {
  return DEFAULT_TASKS.map((task) => {
    return {
      task,
      timeline: SHIFT_TIMES.map((time) => {
        return {
          time,
          required_personnel: 0,
        };
      }),
    };
  });
};
