import { createContext, use, useState, type Context,  } from "react";



let saveValue = true;

export function TodoProvider({children}) {
  const [isTaskPageComponent,_setTaskPageComponent] = useState(saveValue);
  
  function setTaskPageComponent(v: boolean) {
    saveValue = v;
    _setTaskPageComponent(v)
  }

  const res = {
    isTaskPageComponent,
    setTaskPageComponent
  }

  if(!TodoProvider['TodoCtx']) {
      TodoProvider['TodoCtx'] = createContext<ITodoContext>(res);
  }

  const TodoCtx = TodoProvider['TodoCtx'];
  
  return (<TodoCtx value={res}>{children}</TodoCtx>)
}

export interface ITodoContext {
  isTaskPageComponent: boolean;
  setTaskPageComponent: (v:boolean)=>void;
}

export namespace TodoProvider {
  export const TodoCtx: Context<ITodoContext> = TodoProvider['TodoCtx'];

}

