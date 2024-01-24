import { ShiftTable } from "@/components/common/ShiftTable";
import { TaskTable } from "@/components/common/TaskTable";
import { TaskTimeline } from "@/types/TaskTimeline";
import { UserTimeline } from "@/types/UserTimeline";
import { useState } from "react";
import { genDefaultTaskTimelines } from "@/utils/genDefaultTaskTimelines";
import { genDefaultUserTimelines } from "@/utils/genDefaultUserTimelines";
import { Button, Input } from "@mantine/core";
import { combination } from "@/utils/combination";
import { SHIFT_TIMES } from "@/constants/ShiftTimes";
import { notifications } from "@mantine/notifications";

export default function Home() {
  const [userTimelines, setUserTimelines] = useState<UserTimeline[]>(
    genDefaultUserTimelines()
  );
  const [taskTimelines, setTaskTimelines] = useState<TaskTimeline[]>(
    genDefaultTaskTimelines()
  );
  const [continuousAssign, setContinuousAssign] = useState<number>(3);

  const handleGenerateShift = () => {
    const userNames = userTimelines.map((userTimeline) => userTimeline.user);

    let newUserTimelines: UserTimeline[] = userTimelines.map((userTimeline) => {
      return {
        ...userTimeline,
        timeline: userTimeline.timeline.map((timeline) => {
          return {
            ...timeline,
            task: null,
          };
        }),
      };
    });

    SHIFT_TIMES.forEach((_, index) => {
      let noTaskUsers = [...userNames];
      taskTimelines.forEach((taskTimeline) => {
        const taskName = taskTimeline.task;
        const requiredPersonnel =
          taskTimeline.timeline[index].required_personnel;

        if (requiredPersonnel === 0 || noTaskUsers.length === 0) {
          return;
        }

        const combinations = combination(noTaskUsers, requiredPersonnel);

        const combinationUsers = combinations.filter((combination) => {
          const continuousAssignCount = combination.some((user) => {
            const userTimelineIndex = newUserTimelines.findIndex(
              (userTimeline) => userTimeline.user === user
            );
            const userTimeline = newUserTimelines[userTimelineIndex];
            const continuousAssignCount = userTimeline.timeline
              .slice(index - continuousAssign, index)
              .filter((timeline) => timeline.task === taskName).length;
            return continuousAssignCount >= continuousAssign;
          });
          return !continuousAssignCount;
        })[0];

        if (!combinationUsers) {
          notifications.show({
            color: "red",
            title: "割り当てエラー",
            message: `連続割り当て可能数の制約によって、${SHIFT_TIMES[index]}で${taskName}を割り当てられませんでした`,
          });
          return;
        }

        combinationUsers.forEach((user) => {
          console.log(user);
          const userTimelineIndex = newUserTimelines.findIndex(
            (userTimeline) => userTimeline.user === user
          );
          newUserTimelines[userTimelineIndex].timeline[index].task = taskName;
        });
        combinationUsers.forEach((user) => {
          const userIndex = noTaskUsers.findIndex((noTaskUser) => {
            return noTaskUser === user;
          });
          noTaskUsers.splice(userIndex, 1);
        });
      });
    });

    setUserTimelines(newUserTimelines);
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <div className="flex gap-4">
        <h1 className="text-2xl font-bold">Shift-Gen-Sample</h1>
        <Button onClick={handleGenerateShift}>Generate Shift</Button>
      </div>
      <div className="flex gap-4 items-center">
        <p>連続割り当て可能数</p>
        <Input
          value={continuousAssign}
          onChange={(event) => {
            setContinuousAssign(Number(event.currentTarget.value));
          }}
        />
      </div>
      <div className="flex gap-8">
        <ShiftTable
          userTimelines={userTimelines}
          setUserTimelines={setUserTimelines}
        />
        <TaskTable
          taskTimelines={taskTimelines}
          setTaskTimelines={setTaskTimelines}
          userLength={userTimelines.length}
        />
      </div>
    </div>
  );
}
