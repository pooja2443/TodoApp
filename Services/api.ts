import axios from "axios";
import { Todo } from "@/Types/todoType";

const API_KEY = '731c7d72-bebb-4ef6-92df-a75616e32f15';
const BASE_URL = 'https://todos.simpleapi.dev/api';

export const api = {
    fetchTodos : async () => {
        const response = await axios.get(`${BASE_URL}/todos`, {
        params: { apikey: API_KEY }
    })
    return response.data;
    },
    addTodo: async (description: string) => {
        const response = await axios.post(`${BASE_URL}/todos`, 
            { description },
            { params: { apikey: API_KEY } } 
        );
        return response.data;
    },
    updateTodo : async (id: number, description: string) => {
        const response = await axios.put(`${BASE_URL}/todos/${id}`,{description}, {
        params: { apikey: API_KEY }
    })
    return response.data;
    },
    deleteTodo : async (id: number) => {
        const response = await axios.delete(`${BASE_URL}/todos/${id}`, {
         params: { apikey: API_KEY }
    })
    return id;
    }
}