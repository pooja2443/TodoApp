import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit';
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

export const logOutUser = createAsyncThunk(
    'auth/signOut',
    async(_, { rejectWithValue, getState }) => {
        try {
            const state = getState() as { auth: {token: string | null}}; 
            const token = state.auth.token;

            if(!token){
                return rejectWithValue("No authentication token found");
            }

            // if(response.success) {
            //     await AsyncStorage.removeItem('userToken');
            //     return { success: true };
            // } else {
            //     return rejectWithValue(response.message || "Logout Failed");
            // }
            try{
                 const response = await authService.signOut(token)
                  console.log('Logout API Response:', response);
            }catch(error: any) {
                if (error.response && error.response.status === 401) {
                    console.log('401 Error during logout - Token likely already invalid');
                } else {
                    throw error;
                }
            }
            await AsyncStorage.removeItem('userToken');
            return { success: true };
            
        } catch (error: any) {
            console.error('Logout Error:', error);
            
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data.message || 'Logout failed');
            }
            return rejectWithValue("Error occurred during logout");
        }
    }
)