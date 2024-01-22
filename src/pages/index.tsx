import { ShiftTable } from "@/components/common/ShiftTable";
import { TaskTable } from "@/components/common/TaskTable";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Shift-Gen-Sample</h1>
      <div className="flex gap-4">
        <div>
          <h2 className="text-xl">Shift Table</h2>
          <ShiftTable />
        </div>
        <div>
          <h2 className="text-xl">Task Table</h2>
          <TaskTable />
        </div>
      </div>
    </div>
  );
}
