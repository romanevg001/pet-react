import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {counter: 0, showCounter: true},
    reducers: {
        increment(state) {
            state.counter++;
        },
        decrement(state) {
            state.counter--;
        },
        increase(state, action) {
            state.counter = state.counter + action.payload.amount;
        },
        toglleCounter(state) {
            state.showCounter = !state.showCounter;
        }
    }
});
