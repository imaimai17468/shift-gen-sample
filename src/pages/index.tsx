import { ShiftTable } from "@/components/common/ShiftTable";
import { TaskTable } from "@/components/common/TaskTable";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 p-4">
      <h1 className="text-2xl font-bold">Shift-Gen-Sample</h1>
      <div className="flex gap-8">
        <ShiftTable />
        <TaskTable />
      </div>
    </div>
  );
}
