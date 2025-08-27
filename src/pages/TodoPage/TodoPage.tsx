import { createContext, useState, type SetStateAction, type Dispatch, useEffect } from "react";
import {EditAddTaskDialog} from "./EditAddTaskDialog";
import { Task, type ITask } from "@/models/todo.model";
import TodoStat from "./TodoStat";
import { useTodoQuery } from "@/query/useTodoQuery";
import TodoList from "./TodoList";
import Counter from "./Counter/Counter";

interface ITodoPageCtx {
  setPage: Dispatch<SetStateAction<number>>;
  setEditedTask: Dispatch<SetStateAction<undefined | ITask>>;
  val: number;
}

export const TodoPageCtx = createContext<ITodoPageCtx>({
  setPage: (n: SetStateAction<number>) => {},
  setEditedTask: (n: SetStateAction<undefined | ITask>) => {},
  val: Math.random()*1000
});

export default function TodoPage() {
  const [page, setPage] = useState(1);
  useTodoQuery.page = page;
  
  const [editedTask, setEditedTask] = useState<undefined | ITask>(undefined);

  let val = {setPage, setEditedTask, val: Math.round(Math.random()*1000)};

/* 
  setInterval(()=>{
    val = {setPage, setEditedTask, val: Math.round(Math.random()*1000)};
    console.log('TodoPageCtx render?', val.val);

  },5000); */

  console.log('TodoPage: rernder');

  return (<div>
      <TodoStat>{val.val && <Counter key={val.val} initialCount={val.val} />}</TodoStat>
      <EditAddTaskDialog key={editedTask?.id}  editedTask={editedTask} setEditedTask={setEditedTask} /> 

      <h1>TodoPage {page}</h1>
      <button className="pi pi-plus " onClick={() => setEditedTask(new Task())}> Add task </button>

      <TodoPageCtx.Provider value={val}>
            /{val.val}/
      <>{    console.log('!!!TodoPageCtx render!!',val.val) }</>

        <TodoList></TodoList>
      </TodoPageCtx.Provider>
  </div>);
}
