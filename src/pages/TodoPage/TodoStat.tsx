import { useTodoQuery } from "@/query/useTodoQuery";
import { Card } from "primereact/card";
import Counter from "./Counter/Counter";

export default function TodoStat({children}) {
  const { getStat } = useTodoQuery();
  const { data: tasks } = getStat();

  console.log('TodoStat rerender')

  return (
    <Card title="Todo Statistics">
      <ul className="m-0">
        <li>Whole count of tasks : {tasks?.length}</li>
        <li>Done tasks : {tasks?.filter((t) => t.done).length}</li>
        <li>Left tasks : {tasks?.filter((t) => !t.done).length}</li>
      </ul>
      {children}

      {tasks?.length && <Counter key={tasks?.length} initialCount={tasks?.length} />}
    </Card>
  );
}
