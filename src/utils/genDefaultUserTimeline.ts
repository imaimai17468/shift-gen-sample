import { UserTimeline } from "@/types/UserTimeline";
import { DEFAULT_USERS } from "@/constants/DefaultUsers";
import { SHIFT_TIMES } from "@/constants/ShiftTimes";

export const genDefaultUserTimeline = (): UserTimeline => {
  return DEFAULT_USERS.map((user) => {
    return {
      user,
      timeline: SHIFT_TIMES.map((time) => {
        return {
          time,
          task: null,
        };
      }),
    };
  });
};
