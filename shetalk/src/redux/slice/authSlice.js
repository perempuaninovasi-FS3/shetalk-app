import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentials) => {
        try {
            const request = await axios.post('http://localhost:8000/api/auth/login', userCredentials)
            const response = await request.data;
            localStorage.setItem('user', JSON.stringify(response));
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

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
                const data = action.payload;
                state.loading = false;
                state.user = data.data;
                state.error = null;
                state.message = data.message;
                console.log(state.user);
                console.log(state.message);
            })
            .addCase(loginUser.rejected, (state, action) => {
                const error = action.error || action.payload;
                state.loading = false;

                if (error.message === 'Request failed with status code 403') {
                    console.log(error.message)
                    console.log(error.response)
                } else if (error.request) {
                    console.error("No response received from the server. The request might not have been sent.");
                    state.error = "Tidak dapat terhubung ke server.";
                } else {
                    console.error("An unexpected error occurred:", error.message);
                    state.error = "Terjadi kesalahan yang tidak terduga.";
                }
            });
    })
})

export default authSlice.reducer