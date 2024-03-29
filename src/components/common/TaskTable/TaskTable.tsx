import { TimeTable } from "../TimeTable";
import { useState, useMemo } from "react";
import { genDefaultTaskTimelines } from "../../../utils/genDefaultTaskTimelines";
import { TaskTimeline } from "@/types/TaskTimeline";
import { SHIFT_TIMES } from "@/constants/ShiftTimes";
import { Button, Table, Input } from "@mantine/core";
import clsx from "clsx";

type Props = {
  taskTimelines: TaskTimeline[];
  setTaskTimelines: React.Dispatch<React.SetStateAction<TaskTimeline[]>>;
  userLength: number;
};

export const TaskTable = ({
  taskTimelines,
  setTaskTimelines,
  userLength,
}: Props) => {
  const taskNames = useMemo(() => {
    return taskTimelines.map((timeline) => timeline.task);
  }, [taskTimelines]);

  const eachTimeRequiredPersonnel = useMemo(() => {
    return SHIFT_TIMES.map((time) => {
      return taskTimelines.reduce((acc, cur) => {
        return (
          acc + cur.timeline.find((t) => t.time === time)!.required_personnel
        );
      }, 0);
    });
  }, [taskTimelines]);

  const overErrorVisible = useMemo(() => {
    return eachTimeRequiredPersonnel.some((personnel) => {
      return personnel > userLength;
    });
  }, [eachTimeRequiredPersonnel, userLength]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
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
        {overErrorVisible && <div className="text-sm text-red-500">人員不足の時間帯があります</div>}
      </div>
      <div className="flex gap-2">
        <TimeTable />
        <Table>
          <Table.Thead>
            <Table.Tr>
              {taskNames.map((task, index) => (
                <Table.Th key={index} className="whitespace-nowrap h-12">
                  <Input
                    size="xs"
                    className="w-24"
                    value={task}
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
              <Table.Th className="whitespace-nowrap h-12">合計</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {SHIFT_TIMES.map((time, index) => (
              <Table.Tr key={time}>
                {taskTimelines.map((timeline) => (
                  <Table.Td key={timeline.task} className="whitespace-nowrap">
                    <Input
                      size="xs"
                      className="w-24"
                      type="number"
                      min={0}
                      value={
                        timeline.timeline.find((t) => t.time === time)!
                          .required_personnel
                      }
                      onChange={(event) => {
                        const newRequiredPersonnel = Number(
                          event.currentTarget.value
                        );
                        setTaskTimelines((prev) => {
                          return prev.map((prevTimeline) => {
                            if (prevTimeline.task === timeline.task) {
                              return {
                                ...prevTimeline,
                                timeline: prevTimeline.timeline.map(
                                  (prevTimeline) => {
                                    if (prevTimeline.time === time) {
                                      return {
                                        ...prevTimeline,
                                        required_personnel:
                                          newRequiredPersonnel,
                                      };
                                    }
                                    return prevTimeline;
                                  }
                                ),
                              };
                            }
                            return prevTimeline;
                          });
                        });
                      }}
                    />
                  </Table.Td>
                ))}
                <Table.Td
                  className={clsx(
                    "whitespace-nowrap",
                    eachTimeRequiredPersonnel[index] > userLength &&
                      "text-red-500"
                  )}
                >
                  {eachTimeRequiredPersonnel[index]}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};
