import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchCommentsByPostId = createAsyncThunk('comments/fetchCommentsByPostId', async (_, thunkAPI) => {
    try {
        const post = sessionStorage.getItem('detail-post');
        const postData = JSON.parse(post);
        const post_id = postData.id;
        const response = await fetch(`${API_URL}/api/comment?post_id=${post_id}`, {
            headers: {
                'API_KEY': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.data.comments;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});


export const createComment = createAsyncThunk('comment/createComment', async (comments, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const post = sessionStorage.getItem('detail-post');
        const postData = JSON.parse(post);
        const post_id = postData.id;
        await axios.post(`${API_URL}/api/comment?post_id=${post_id}`, comments, {
            headers: {
                'API_KEY': API_KEY,
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        const fetchCommentData = await thunkAPI.dispatch(fetchCommentsByPostId());
        const data = fetchCommentData.payload;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message });
    }
});

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: 'idle',
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByPostId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(fetchCommentsByPostId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
            })
    },
});

export const getComments = (state) => state.comments.comments;

export default commentSlice.reducer;
