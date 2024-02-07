import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const editUser = createAsyncThunk('edit/editUser', async (edit, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/api/user/me/edit`, edit, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
            })
    }
})

export default userSlice.reducer;
