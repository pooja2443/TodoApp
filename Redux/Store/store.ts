import { configureStore } from "@reduxjs/toolkit";
import  todoReducer  from "@/Redux/Slice/todoSlice";
import uiReducer from "@/Redux/Slice/uiSlice";

export const store = configureStore({
    reducer : {
        todos : todoReducer,
        ui : uiReducer
    }
})