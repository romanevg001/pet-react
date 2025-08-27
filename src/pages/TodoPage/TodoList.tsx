import { PaginatorComponent } from "./PaginatorComponent";
import { TaskColumnsEnum } from "@/models/todo.model";
import { useTodoQuery } from "@/query/useTodoQuery";
import { Checkbox } from "primereact/checkbox";
import { TodoPageCtx } from "./TodoPage";
import { use, useContext } from "react";

export default function TodoList() {
    const todoPageCtx = use(TodoPageCtx);
    const {getTodo, deleteTask , editTask} = useTodoQuery();
    const {  data: tasks } = getTodo();
    const { mutate:mDeleteTask   } = deleteTask();
    const { mutate:meditTask   } = editTask();


return (<>
    {todoPageCtx.val}
    <table className="w-full">
            <tbody>
                {tasks && tasks?.data?.map((item) =><tr key={item.id}>
                    <td>
                       <Checkbox inputId={item.id} onChange={()=>{ item.done = !item.done; meditTask(item)}} checked={item.done} />
                    </td>
                    { TaskColumnsEnum.arraylike().map(([position,key])=>(
                      <td key={key}  className=" p-2">
                        {
                           (TaskColumnsEnum[key] == TaskColumnsEnum.start || TaskColumnsEnum[key] == TaskColumnsEnum.end) ? (new Intl.DateTimeFormat("ru",{ dateStyle: "full"}).format(item[key])) : item[key]
                        }
                    </td>
                    )) }
                    <td className=" p-2 flex">
                        <span className='pi pi-file-edit text-primary m-2'  onClick={(e)=>{ e.preventDefault(); todoPageCtx.setEditedTask(item)}} />
                        <span className='pi pi-times text-primary m-2'  onClick={(e)=>{ e.preventDefault();mDeleteTask(item.id) }} />
                    </td>
                </tr>)} 
            </tbody>
        </table>
       

        { tasks && <PaginatorComponent setPage={todoPageCtx.setPage}  />} 
    </>);
}