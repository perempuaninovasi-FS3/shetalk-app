import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const loginUser = createAsyncThunk('auth/loginUser', async (userCredentials, thunkAPI) => {
    try {
        const request = await axios.post(`${API_URL}/api/auth/login`, userCredentials)
        const response = await request.data;
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('token', response.token);
        console.log(response)
        return response;
    } catch (error) {
        console.log(error.response);
        if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
            const validationErrors = error.response.data.message.errors.map(err => err.msg);
            console.log(validationErrors)
            return thunkAPI.rejectWithValue({ error: validationErrors });
        } else {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
})

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
    try {
        const token = localStorage.getItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        await axios.post(`${API_URL}/api/auth/logout`, null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return null;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        error: null,
        message: null,
    },
    extraReducers: (builder => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.message = action.payload.message;
                alert(state.message);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
                if (state.error === 'Request failed with status code 404') {
                    state.error = 'Login gagal!, email tidak di temukan!';
                    alert(state.error)
                } else if (state.error === 'Request failed with status code 422') {
                    state.error = "Password salah!";
                    alert(state.error)
                } else if (state.error === 'Request failed with status code 403') {
                    state.error = "Login gagal!, karena telah melakukan login sebelumnya!";
                    alert(state.error)
                } else {
                    alert(state.error)
                }
            });
    })
})

export default authSlice.reducer