import type { IResGetTodo, ITask } from "@/models/todo.model";
import {  type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";
import { createContext, use, type Dispatch, type SetStateAction } from "react";
import { useTodoQuery } from "./useTodoQuery";





export function TodoProvider({children}) {
  const res = useTodoQuery();
  const TodoCtx = createContext<ITodoContext>(res);
  console.count('TodoProvider creating');  
  TodoProvider['useTodoContext'] = use(TodoCtx);


  return (<TodoCtx value={res}>{children}</TodoCtx>)
}


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
 


