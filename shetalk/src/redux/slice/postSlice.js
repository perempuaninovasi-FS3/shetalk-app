import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const postSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
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
                state.error = action.error.message;
            });
    },
});

//get all posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get('https://65a89524219bfa3718673e13.mockapi.io/posts');
    return response.data;
});

export const { setPosts } = postSlice.actions;
export const selectPosts = (state) => state.posts.posts;
export default postSlice.reducer;
