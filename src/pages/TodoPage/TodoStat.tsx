import { useTodoQuery } from "@/query/useTodoQuery";
import { Card } from "primereact/card";
import Counter from "./Counter/Counter";
import { TodoProvider } from "@/query/TodoProvider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function TodoStat({children}) {
  const { getStat } = useTodoQuery();
  const { data: tasks } = getStat();
  const { isTaskPageComponent, setTaskPageComponent } = TodoProvider.useTodoContext;

  console.log('TodoStat rerender',isTaskPageComponent, children)

  return (
    <Card title="Todo Statistics">
      <ul className="m-0">
        <li>Whole count of tasks : {tasks?.length}</li>
        <li>Done tasks : {tasks?.filter((t) => t.done).length}</li>
        <li>Left tasks : {tasks?.filter((t) => !t.done).length}</li>
      </ul>
      {children}

      {tasks?.length && <Counter key={tasks?.length} initialCount={tasks?.length} />}

       <FormControlLabel control={<Switch defaultChecked={isTaskPageComponent}  onChange={(e)=>setTaskPageComponent(e.target.checked)}  />} label="isTaskPageComponent" />
    </Card>
  );
}
