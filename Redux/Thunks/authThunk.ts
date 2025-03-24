import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '@/Services/authService';

interface SignUpPayload {
    name: string;
    email: string;
    password: string;
}

interface SignInPayload {
    email: string;
    password: string;
}

export const signUpUser = createAsyncThunk(
    'auth/signUp',
    async(userData: SignUpPayload, { rejectWithValue }) => {
        try{
            const response = await authService.signUp(userData);

            if(response && response.token){
                await AsyncStorage.setItem('userToken', response.token)
                return{
                    token: response.token,
                    name: response.user?.name ,
                    email: response.user?.email
                }
            }else{
                return rejectWithValue('Registration Failed')
            }
        }catch (error: any){
            if(error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || 'User is allready registered')
            }
            return rejectWithValue('An error occurred during registration');
        }
    }
)

export const signInUser =  createAsyncThunk(
    'auth/signIn',
    async(credentials: SignInPayload, { rejectWithValue }) => {
        try{
            const response = await authService.signIn(credentials);

            if(response && response.token) {
                await AsyncStorage.setItem('userToken', response.token);
                return{
                    token: response.token,
                    name: response.user?.name || '',
                    email: credentials.email
                }
            }else{
                return rejectWithValue('Login failed. No token received.');
            }            
        }catch(error: any){
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || 'Invalid credentials');
              }
              return rejectWithValue('An error occurred during login');
            }
        }
)