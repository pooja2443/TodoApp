import axios from "axios";
import { Todo } from "@/Types/todoType";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

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