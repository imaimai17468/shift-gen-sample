import { TimeTable } from "../TimeTable";
import { UserTimelines } from "@/types/UserTimelines";
import { genDefaultUserTimelines } from "@/utils/genDefaultUserTimelines";
import { useState, useMemo } from "react";
import { Table } from "@mantine/core";
import { SHIFT_TIMES } from "@/constants/ShiftTimes";

export const ShiftTable = () => {
  const [userTimelines, setUserTimelines] = useState<UserTimelines>(
    genDefaultUserTimelines()
  );

  const userNames = useMemo(() => {
    return userTimelines.map((timeline) => timeline.user);
  }, [userTimelines]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl">Shifts</h2>
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
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};
