import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
    isDarkMode : boolean;
}

const initialState: UiState = {
    isDarkMode : false
}

export const uiSlice = createSlice({
    name : 'ui',
    initialState,
    reducers : {
        setDarkMode : (state, action: PayloadAction<boolean>) => {
            state.isDarkMode = action.payload;
        },
        toggleDarkMode : (state) => {
            state.isDarkMode = !state.isDarkMode;
        }
    }
})

export const { setDarkMode, toggleDarkMode } = uiSlice.actions;
export default uiSlice.reducer;