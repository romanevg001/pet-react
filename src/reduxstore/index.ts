import { configureStore} from '@reduxjs/toolkit';
import { counterSlice } from './counter-slice';
import { uiSlice } from './ui-slice';
import { taskSlice } from './task-slice';
import { excelSlice } from './excel-slice';
//import { Actions, type IAction, StoreStateModel } from './store.state.model';


/* const storeReducer = (state = {counter: 0}, action) => {
    if(action.type ==  Actions.CART_ADD) {
      return {counter: state.counter + 1}
    }
    if(action.type ==  Actions.CART_REMOVE) {
        return {counter: state.counter - 1}
        
    }
    return state;
} 
    
export const reduxStore = createStore(storeReducer);
*/

export const reduxStore = configureStore({reducer: {
    excel: excelSlice.reducer,
    counter: counterSlice.reducer,
    ui: uiSlice.reducer,
    task: taskSlice.reducer,

}});

export type IStoreState = ReturnType<typeof reduxStore.getState>;
