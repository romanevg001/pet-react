import { PaginatorComponent } from "./PaginatorComponent";
import { TaskColumnsEnum } from "@/models/todo.model";
import { useTodoQuery } from "@/query/useTodoQuery";
import { Checkbox } from "primereact/checkbox";
import { TodoPageCtx } from "./TodoPage";
import { use, useContext } from "react";
import { NavLink } from "react-router-dom";
import { TodoProvider } from "@/query/TodoProvider";
import { CartContext } from "../Cart/CartCtx";
import { Button } from "primereact/button";

export default function TodoList() {
    const todoPageCtx = use(TodoPageCtx);
    const {isTaskPageComponent} = use(TodoProvider?.TodoCtx);
    const {getTodo, deleteTask , editTask} = useTodoQuery();
    const {  data: tasks } = getTodo();
    const { mutate:mDeleteTask   } = deleteTask();
    const { mutate:meditTask   } = editTask();
    const { addToCart, removeFromCart} = use(CartContext);


return (<>
    <table className="w-full">
            <tbody>
                {tasks && tasks?.data?.map((item) =><tr key={item.id}>
                    <td>
                       <Checkbox inputId={item.id} onChange={()=>{ item.done = !item.done; meditTask(item)}} checked={item.done} />
                    </td>
                    { TaskColumnsEnum.arraylike().map(([position,key])=>(
                      <td key={key}  className=" p-2">
                        
                        { TaskColumnsEnum[key] == TaskColumnsEnum.name ? 
                            <NavLink to={"/todo/task"+(isTaskPageComponent ? '' : '_fc')+"/"+item.id}> {item[key]} </NavLink>  
                            : 
                           (TaskColumnsEnum[key] == TaskColumnsEnum.start || TaskColumnsEnum[key] == TaskColumnsEnum.end) ? (new Intl.DateTimeFormat("ru",{ dateStyle: "full"}).format(item[key])) : item[key]
                        }
                    </td>
                    )) }
                    <td className=" p-2 flex">
                        <Button icon='pi pi-file-edit' text onClick={(e)=>{ e.preventDefault(); todoPageCtx.setEditedTask(item)}} />
                        <Button icon='pi pi-times' text onClick={(e)=>{ e.preventDefault();mDeleteTask(item.id) }} />
                        <Button icon='pi pi-cart-plus' text onClick={(e)=>{ e.preventDefault();addToCart(item) }} />
                        <Button icon='pi pi-cart-minus' text onClick={(e)=>{ e.preventDefault();removeFromCart(item) }} />

                    </td>
                </tr>)} 
            </tbody>
        </table>
       

        { tasks && <PaginatorComponent setPage={todoPageCtx.setPage}  />} 
    </>);
}