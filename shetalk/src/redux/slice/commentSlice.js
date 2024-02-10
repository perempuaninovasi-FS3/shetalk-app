import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchUserPosts } from './userSlice';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchCommentsByPostId = createAsyncThunk('comments/fetchCommentsByPostId', async (currentPage, thunkAPI) => {
    try {
        const post = sessionStorage.getItem('detail-post');
        const postData = JSON.parse(post);
        const post_id = postData.id;
        const response = await fetch(`${API_URL}/api/comment?post_id=${post_id}&page=${currentPage}`, {
            headers: {
                'API_KEY': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data
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
        const response = await axios.post(`${API_URL}/api/comment?post_id=${post_id}`, comments, {
            headers: {
                'API_KEY': API_KEY,
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const fetchCommentData = await thunkAPI.dispatch(fetchCommentsByPostId(1));
        const commentData = fetchCommentData.payload.data;
        return { createdComment: response.data, fetchedComments: commentData };
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
            const validationErrors = error.response.data.message.errors.map(err => err.msg);
            return thunkAPI.rejectWithValue({ error: validationErrors });
        } else {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
});

export const deleteComment = createAsyncThunk('comment/deleteComment', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const comment = JSON.parse(sessionStorage.getItem('selectedComment'));
        const comment_id = comment.id;
        await axios.delete(`${API_URL}/api/comment?id=${comment_id}`, {
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
})

const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        status: 'idle',
        message: null,
        error: null,
        currentPage: 1,
        totalPages: 1,
        totalComments: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByPostId.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload.data.comments;
                state.currentPage = action.payload.paginate.currentPage;
                state.totalPages = action.payload.paginate.totalPages;
                state.totalComments = action.payload.paginate.totalItems;
            })
            .addCase(fetchCommentsByPostId.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload.fetchedComments.comments;
                state.message = action.payload.createdComment.message;
                alert(state.message);
            })
            .addCase(createComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                alert(state.error)
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.comments = action.payload;
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
            })
    },
});

export const getComments = (state) => state.comments.comments;

export default commentSlice.reducer; 
