import { counterSlice  } from "@/reduxstore/counter-slice";
import type {  IStoreState  } from "@/reduxstore";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";
import { ReduxCounter } from "./ReduxCounter";
import { TodoProvider } from "@/query/TodoProvider";
import TodoList from "../TodoPage/TodoList";
import { getTaskAction } from "@/reduxstore/task-slice";
/* 
import { Actions, type IStoreStateModel } from "@/reduxstore/store.state.model";
import { useDispatch, useSelector } from "react-redux";

export function TodoReduxPage() {
    const counter = useSelector<IStoreStateModel>(state=>state.counter);
    const dispatch = useDispatch();

    return (<>
        <Button icon='pi pi-plus' text  onClick={(e)=>{ e.preventDefault();dispatch({type: Actions.CART_ADD}) }} />

        <div>{counter}</div>
        <Button icon='pi pi-minus' text  onClick={(e)=>{ e.preventDefault();dispatch({type: Actions.CART_REMOVE}) }} />

    </>);

} */


export function TodoReduxPage() {
    const {setTaskPageComponent} = use(TodoProvider?.TodoCtx);
    const dispatch = useDispatch();
    
    
    useEffect(()=>{

        setTaskPageComponent('task');
    },[setTaskPageComponent])

   /*  function onTaskClick(taskId) {
         dispatch(getTaskAction(taskId))
    } */

    return (<>
        <ReduxCounter />


        <TodoList></TodoList>

    </>);
}
