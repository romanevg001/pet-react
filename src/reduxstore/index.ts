import {createStore} from 'redux';
import { Actions, type IAction, StoreStateModel } from './store.state.model';



const storeReducer = (state = {counter: 0}, action) => {
    if(action.type ==  Actions.CART_ADD) {
      return {counter: state.counter + 1}
    }
    if(action.type ==  Actions.CART_REMOVE) {
        return {counter: state.counter - 1}
        
    }
    return state;
}

export const reduxStore = createStore(storeReducer);
