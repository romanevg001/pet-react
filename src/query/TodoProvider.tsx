import type { IResGetTodo, ITask } from "@/models/todo.model";
import {  type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { createContext, use, useState, type Dispatch, type SetStateAction } from "react";
import { useTodoQuery } from "./useTodoQuery";



const TodoProviderState = {
  isTaskPageComponent: true
}

export function TodoProvider({children}) {
  //const res = useTodoQuery();
  const [isTaskPageComponent,_setTaskPageComponent] = useState(TodoProviderState.isTaskPageComponent);
  
  function setTaskPageComponent(val: boolean) {
    TodoProviderState.isTaskPageComponent = val;
    console.log('isTaskPageComponentisTaskPageComponent',val)
    _setTaskPageComponent(val);
  }
  const res= {
    isTaskPageComponent,
    setTaskPageComponent
  }


  const TodoCtx = createContext<ITodoContext>(res);
  

  console.log('TodoProvider creating',res);  

  TodoProvider['useTodoContext'] = use(TodoCtx);


  return (<TodoCtx value={res}>{children}</TodoCtx>)
}
export interface ITodoContext {
  isTaskPageComponent: boolean;
  setTaskPageComponent: Dispatch<SetStateAction<boolean>>;
}
export namespace TodoProvider {
  export const useTodoContext: ITodoContext = TodoProvider['useTodoContext'];

}
/* 
export interface ITodoContext {
    getTodo: () => UseQueryResult<IResGetTodo | null, Error>;
    addTask: (doOnSuccess?: () => void) => UseMutationResult<unknown, Error, ITask, unknown>;
    editTask: () => UseMutationResult<ITask[] | null, Error, ITask, unknown>;
    deleteTask: () => UseMutationResult<void | null, Error, string, unknown>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

export namespace TodoProvider {
  export const useTodoContext: ITodoContext = TodoProvider['useTodoContext'];

}
 
 */

