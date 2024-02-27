import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchTopics = createAsyncThunk('topics/fetchTopics', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${API_URL}/api/topics`, {
            headers: {
                'API_KEY': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const topicsSlice = createSlice({
    name: 'topics',
    initialState: {
        topics: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTopics.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTopics.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.topics = action.payload;
            })
            .addCase(fetchTopics.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            });
    },
});

export const allTopics = (state) => state.topics.topics;

export default topicsSlice.reducer;