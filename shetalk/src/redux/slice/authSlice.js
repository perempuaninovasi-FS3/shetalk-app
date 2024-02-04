import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userCredentials) => {
        try {
            const request = await axios.post('http://localhost:8000/api/auth/login', userCredentials)
            const response = await request.data.data;
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
                // const data = action.payload;
                state.loading = false;
                state.user = action.payload;
                state.error = null;
                // state.message = data.message;
                // console.log(state.user);
                // console.log(state.message);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message === 'Request failed with status code 403') {
                    state.error = "Login gagal!, karena telah melakukan login sebelumnya!"
                    console.log(state.error)
                } else if (action.error.message === 'Request failed with status code 404') {
                    state.error = "Login gagal!, email tidak di temukan!";
                    console.log(state.error)
                } else if (action.error.message === 'Request failed with status code 422') {
                    state.error = "Password salah!";
                    console.log(state.error)
                } else {
                    console.error("An unexpected error occurred:", error.message);
                    state.error = "Terjadi kesalahan yang tidak terduga.";
                }
            });
    })
})

export default authSlice.reducer