import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
    try {
        const response = await fetch(`${API_URL}/api/posts`, {
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

export const fetchPostBySlug = createAsyncThunk('posts/fetchPostBySlug', async (slug, thunkAPI) => {
    try {
        const response = await fetch(`${API_URL}/api/post/${slug}`, {
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

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        selectedPost: null,
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            })
            .addCase(fetchPostBySlug.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedPost = action.payload;
            })
            .addCase(fetchPostBySlug.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            });
    }
});

export const allPosts = (state) => state.posts.posts;
export const selectedPost = (state) => state.posts.selectedPost;

export default postsSlice.reducer;