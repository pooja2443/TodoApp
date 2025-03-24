import axios from 'axios';

const API_KEY = '731c7d72-bebb-4ef6-92df-a75616e32f15';
const BASE_URL = 'https://todos.simpleapi.dev/api'

export interface SignUpData{
    name: string;
    email: string;
    password: string;
}

export interface SignInData{
    email: string;
    password: string;
}

const api = axios.create({
    baseURL: BASE_URL,
    params: {
      apikey: API_KEY
    },
    headers: {
      'Content-Type': 'application/json',
    }
  });

export interface AuthResponse {
    token: string;
    user?: {
      name: string;
      email: string;
    };
}

export const authService = {
    signUp: async (userData: SignUpData): Promise<AuthResponse> => {
        const response = await api.post('/users/register', userData);
        return response.data;
    },
    signIn: async (credentials: SignInData): Promise<AuthResponse> => {
        const response = await api.post('/users/login', credentials);
        return response.data;
    }
}