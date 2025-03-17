import { configureStore } from "@reduxjs/toolkit";
import  todoReducer  from "@/Redux/Slice/todoSlice";
import uiReducer from "@/Redux/Slice/uiSlice";

export const store = configureStore({
    reducer : {
        todos : todoReducer,
        ui : uiReducer
    }
})

export type RootState = ReturnType<typeof store.getState>; //helps to get the current state type
export type AppDispatch = typeof store.dispatch; //helps dispatch actions with correct types