import { Actions, type IStoreStateModel } from "@/reduxstore/store.state.model";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";

export function TodoReduxPage() {
    const counter = useSelector<IStoreStateModel>(state=>state.counter);
    const dispatch = useDispatch();

    return (<>
        <Button icon='pi pi-plus' text  onClick={(e)=>{ e.preventDefault();dispatch({type: Actions.CART_ADD}) }} />

        <div>{counter}</div>
        <Button icon='pi pi-minus' text  onClick={(e)=>{ e.preventDefault();dispatch({type: Actions.CART_REMOVE}) }} />

    </>);

}