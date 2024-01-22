import { TimeTable } from "../TimeTable";
import { UserTimelines } from "@/types/UserTimelines";
import { genDefaultUserTimelines } from "@/utils/genDefaultUserTimelines";
import { useState, useMemo } from "react";
import { Table } from "@mantine/core";
import { SHIFT_TIMES } from "@/constants/ShiftTimes";
import { Button } from "@mantine/core";

export const ShiftTable = () => {
  const [userTimelines, setUserTimelines] = useState<UserTimelines>(
    genDefaultUserTimelines()
  );

  const userNames = useMemo(() => {
    return userTimelines.map((timeline) => timeline.user);
  }, [userTimelines]);

  const userNoTaskCount = useMemo(() => {
    return userTimelines.map((timeline) => {
      return timeline.timeline.filter((t) => t.task === null).length;
    });
  }, [userTimelines]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-4">
        <h2 className="text-xl">Shifts</h2>
        <Button
          onClick={() => {
            setUserTimelines((prev) => [
              ...prev,
              {
                user: `user${prev.length + 1}`,
                timeline: SHIFT_TIMES.map((time) => ({
                  task: null,
                  time,
                })),
              },
            ]);
          }}
        >
          add User
        </Button>
      </div>
      <div className="flex gap-2 items-start">
        <TimeTable />
        <Table>
          <Table.Thead>
            <Table.Tr>
              {userNames.map((userName) => (
                <Table.Th key={userName} className="whitespace-nowrap">
                  {userName}
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {SHIFT_TIMES.map((time, index) => (
              <Table.Tr key={time}>
                {userTimelines.map((timeline) => (
                  <Table.Td key={timeline.user} className="whitespace-nowrap">
                    {timeline.timeline[index].task || "なし"}
                  </Table.Td>
                ))}
              </Table.Tr>
            ))}
            <Table.Tr>
              {userNoTaskCount.map((count, index) => (
                <Table.Td key={index} className="whitespace-nowrap">
                  休:{count}
                </Table.Td>
              ))}
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};
