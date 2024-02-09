import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchPosts } from './postSlice';

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

export const fetchAllComments = createAsyncThunk('comments/fetchAllComments', async (_, thunkAPI) => {
    try {
        const dataPosts = await thunkAPI.dispatch(fetchPosts());
        const posts = dataPosts.payload;
        const commentsWithPosts = [];

        for (const post of posts) {
            const response = await fetch(`${API_URL}/api/comment?post_id=${post.id}`, {
                headers: {
                    'API_KEY': API_KEY,
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            const comments = data.data.comments.map(comment => ({
                ...comment,
                post: post
            }));
            commentsWithPosts.push(...comments);
        }

        return commentsWithPosts;
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
        allComments: null,
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
                state.comments = action.payload;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
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
            .addCase(fetchAllComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allComments = action.payload;
            })
            .addCase(fetchAllComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
            })
    },
});

export const getComments = (state) => state.comments.comments;
export const allComments = (state) => state.comments.allComments;

export default commentSlice.reducer; 