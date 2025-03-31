import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export interface SignUpData{
    name: string;
    email: string;
    password: string;
}

export interface SignInData{
    email: string;
    password: string;
}

export interface LogOut{
    success: boolean;
    message: string;
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
    }, 
    signOut: async (token: string): Promise<LogOut> => {
        const response = await api.post('/users/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    }
}