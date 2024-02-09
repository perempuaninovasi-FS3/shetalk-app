import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (currentPage, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/api/posts?page=${currentPage}`, {
            headers: {
                'API_KEY': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
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
        sessionStorage.setItem("detail-post", JSON.stringify(data.data));
        return data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

export const createPost = createAsyncThunk('post/createPost', async (post, thunkAPI) => {
    try {
        let headers = {
            'API_KEY': API_KEY,
            'Content-Type': 'application/json',
        };
        const token = localStorage.getItem('token');
        const avatarString = sessionStorage.getItem('selectedAvatar');

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        if (avatarString) {
            const avatar = JSON.parse(avatarString);
            const avatar_id = avatar.id;
            headers['avatar_id'] = avatar_id;
        }

        await axios.post(`${API_URL}/api/posts`, post, { headers });

        const fetchPostsData = await thunkAPI.dispatch(fetchPosts());
        const data = fetchPostsData.payload;
        return data;
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
        currentPage: 1,
        totalPages: 1,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload.data;
                state.currentPage = action.payload.paginate.currentPage;
                state.totalPages = action.payload.paginate.totalPages;
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
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
            });
    }
});

export const allPosts = (state) => state.posts.posts;
export const selectedPost = (state) => state.posts.selectedPost;

export default postsSlice.reducer;