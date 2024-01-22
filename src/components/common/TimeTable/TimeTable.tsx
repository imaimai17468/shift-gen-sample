import { SHIFT_TIMES } from "@/constants/ShiftTimes";
import { Table } from "@mantine/core";
import { useMemo } from "react";

export const TimeTable = () => {
  const rows = useMemo(() => {
    return SHIFT_TIMES.map((time) => (
      <Table.Tr key={time}>
        <Table.Td className="text-center h-12">{time}</Table.Td>
      </Table.Tr>
    ));
  }, []);

  return (
    <div className="w-32">
      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="h-12">Time</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};
