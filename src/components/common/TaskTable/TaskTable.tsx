import { TimeTable } from "../TimeTable";
import { useState, useMemo } from "react";
import { genDefaultTaskTimelines } from "../../../utils/genDefaultTaskTimelines";
import { TaskTimelines } from "@/types/TaskTimelines";
import { SHIFT_TIMES } from "@/constants/ShiftTimes";
import { Table } from "@mantine/core";

export const TaskTable = () => {
  const [taskTimelines, setTaskTimelines] = useState<TaskTimelines>(
    genDefaultTaskTimelines()
  );
  const TaskNames = useMemo(() => {
    return taskTimelines.map((timeline) => timeline.task);
  }, [taskTimelines]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Tasks</h2>
      <div className="flex gap-2">
        <TimeTable />
        <Table>
          <Table.Thead>
            <Table.Tr>
              {TaskNames.map((TaskName) => (
                <Table.Th key={TaskName} className="whitespace-nowrap">
                  {TaskName}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {SHIFT_TIMES.map((time, index) => (
              <Table.Tr key={time}>
                {taskTimelines.map((timeline) => (
                  <Table.Td
                    key={timeline.task}
                    className="whitespace-nowrap text-center"
                  >
                    {timeline.timeline[index].required_personnel}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};
