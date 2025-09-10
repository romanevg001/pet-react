import {createSlice} from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: { todolistUrl: ''},
    reducers: {
     
        setTodolistUrl(state, action) {
            state.todolistUrl = action.payload;
        }
    }
});
