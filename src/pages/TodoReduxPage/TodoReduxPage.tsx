import { counterSlice  } from "@/reduxstore/counter";
import type {  IStoreState  } from "@/reduxstore";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
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
    const counter = useSelector<IStoreState, number>(state=>state.counter.counter);
    const dispatch = useDispatch();

    return (<>
        <Button icon='pi pi-plus' text  onClick={(e)=>{ e.preventDefault();dispatch(counterSlice.actions.increment()) }} />

       <div>{counter}</div> 
        <Button icon='pi pi-minus' text  onClick={(e)=>{ e.preventDefault();dispatch(counterSlice.actions.decrement()) }} />
        <Button icon='pi pi-plus' text  onClick={(e)=>{ e.preventDefault();dispatch(counterSlice.actions.increase({amount: 5})) }} >5</Button>

    </>);
}
