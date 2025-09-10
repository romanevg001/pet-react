import { uiSlice } from "@/reduxstore/ui-slice";
import { createContext, use, useState, type Context,  } from "react";
import { useDispatch } from "react-redux";



let saveValue = true;


export function TodoProvider({children}) {
  const [isTaskPageComponent,_setTaskPageComponent] = useState(saveValue);
  const dispatch = useDispatch();
  
  function setTaskPageComponent(v: boolean | string) {
    console.log('setTaskPageComponent=>',v)
    if(typeof v == 'boolean') {
      saveValue = v;
      _setTaskPageComponent(v)
    }

    if(typeof v == 'string') {
      dispatch(uiSlice.actions.setTodolistUrl(v)); 
    }
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
  setTaskPageComponent: (v:boolean | string)=>void;
}

export namespace TodoProvider {
  export const TodoCtx: Context<ITodoContext> = TodoProvider['TodoCtx'];

}

