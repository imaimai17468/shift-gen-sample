import { ShiftTable } from "@/components/common/ShiftTable";
import { TaskTable } from "@/components/common/TaskTable";
import { TaskTimelines } from "@/types/TaskTimelines";
import { UserTimelines } from "@/types/UserTimelines";
import { useState } from "react";
import { genDefaultTaskTimelines } from "@/utils/genDefaultTaskTimelines";
import { genDefaultUserTimelines } from "@/utils/genDefaultUserTimelines";

export default function Home() {
  const [userTimelines, setUserTimelines] = useState<UserTimelines>(
    genDefaultUserTimelines()
  );
  const [taskTimelines, setTaskTimelines] = useState<TaskTimelines>(
    genDefaultTaskTimelines()
  );

  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-bold">Shift-Gen-Sample</h1>
      <div className="flex gap-8">
        <ShiftTable
          userTimelines={userTimelines}
          setUserTimelines={setUserTimelines}
        />
        <TaskTable
          taskTimelines={taskTimelines}
          setTaskTimelines={setTaskTimelines}
        />
      </div>
    </div>
  );
}
