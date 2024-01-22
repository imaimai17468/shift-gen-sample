import { TimeTable } from "../TimeTable";
import { useState, useMemo } from "react";
import { genDefaultTaskTimelines } from "../../../utils/genDefaultTaskTimelines";
import { TaskTimelines } from "@/types/TaskTimelines";
import { SHIFT_TIMES } from "@/constants/ShiftTimes";
import { Button, Table, Input } from "@mantine/core";

export const TaskTable = () => {
  const [taskTimelines, setTaskTimelines] = useState<TaskTimelines>(
    genDefaultTaskTimelines()
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <h2 className="text-xl">Tasks</h2>
        <Button
          onClick={() => {
            setTaskTimelines((prev) => [
              ...prev,
              {
                task: `task${prev.length + 1}`,
                timeline: SHIFT_TIMES.map((time) => ({
                  required_personnel: 0,
                  time,
                })),
              },
            ]);
          }}
        >
          Add Task
        </Button>
      </div>
      <div className="flex gap-2">
        <TimeTable />
        <Table>
          <Table.Thead>
            <Table.Tr>
              {taskTimelines.map((timeline, index) => (
                <Table.Th key={index} className="whitespace-nowrap">
                  <Input
                    size="xs"
                    className="w-24"
                    value={timeline.task}
                    onChange={(event) => {
                      const newTask = event.currentTarget.value;
                      setTaskTimelines((prev) => {
                        return prev.map((timeline, timelineIndex) => {
                          if (timelineIndex === index) {
                            return {
                              ...timeline,
                              task: newTask,
                            };
                          }
                          return timeline;
                        });
                      });
                    }}
                  />
                </Table.Th>
              ))}
              <Table.Th className="whitespace-nowrap">合計</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {SHIFT_TIMES.map((time, index) => (
              <Table.Tr key={time}>
                {taskTimelines.map((timeline) => (
                  <Table.Td key={timeline.task} className="whitespace-nowrap">
                    {timeline.timeline[index].required_personnel}
                  </Table.Td>
                ))}
                <Table.Td className="whitespace-nowrap">
                  {taskTimelines.reduce(
                    (acc, cur) =>
                      acc + cur.timeline[index].required_personnel,
                    0
                  )}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};
