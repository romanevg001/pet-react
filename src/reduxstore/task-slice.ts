import { httpCall, httpCallJson } from '@/api/commonApi';
import { QueryTypeEnum } from '@/models/api.model';
import { Task, type IResGetTodo, type IAction, type ITask } from '@/models/todo.model';
import {createSlice} from '@reduxjs/toolkit';



export const taskSlice = createSlice({
    name: 'task',
    initialState: {task: new Task()} as {task: ITask},
    reducers: {
        setTask(state, action: IAction<ITask>) {
            console.log(action.payload)
            state.task = action.payload;
        },
       
    }
});



export const getTaskAction = (id: string) => {
    return  async dispatch => {

        const task = await httpCallJson<IResGetTodo>("tasks/"+id).then(t => new Task(t));

        dispatch(taskSlice.actions.setTask(task));
    } 
}
