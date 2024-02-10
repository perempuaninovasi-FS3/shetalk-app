import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setUser } from '../../utils/userUtils';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const editUser = createAsyncThunk('edit/editUser', async (edit, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/api/user/me/edit`, edit, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const data = response.data;
        return data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
            const validationErrors = error.response.data.message.errors.map(err => err.msg);
            return thunkAPI.rejectWithValue({ error: validationErrors });
        } else {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
});

export const editUserProfile = createAsyncThunk('edit/editUserProfile', async (formData, thunkAPI) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`${API_URL}/api/user/me/profile/edit`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
        const data = response.data;

        console.log(data)
        return data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message && error.response.data.message.errors) {
            const validationErrors = error.response.data.message.errors.map(err => err.msg);
            return thunkAPI.rejectWithValue({ error: validationErrors });
        } else {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
});

export const fetchUpdatedUserData = createAsyncThunk('update/updateUserProfile', async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        const data = response.data.data;
        setUser(data);
        return data;
    } catch (error) {
        console.error('Error fetching updated user data:', error);
        throw error;
    }
});

export const fetchUserPosts = createAsyncThunk('fetch/fetchUserPosts', async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/user/posts`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching updated user data:', error);
        throw error;
    }
})

export const fetchUserComments = createAsyncThunk('fetch/fetchUserComments', async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/api/comment/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching updated user data:', error);
        throw error;
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: [],
        status: 'idle',
        error: null,
        message: null,
        userPosts: [],
        userComments: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(editUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.message = action.payload.message;
                alert(state.message);
            })
            .addCase(editUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                alert(state.error);
            })
            .addCase(editUserProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                state.message = action.payload.message;
                alert(state.message);
            })
            .addCase(editUserProfile.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                alert(state.error);
            })
            .addCase(fetchUpdatedUserData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUpdatedUserData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userPosts = action.payload.data;
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
            })
            .addCase(fetchUserComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userComments = action.payload.comments;
            })
            .addCase(fetchUserComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload.error;
                console.log('gabisa')
            })
    }
})

export const allPostsUser = (state) => state.user.userPosts;
export const allCommentsUser = (state) => state.user.userComments;

export default userSlice.reducer;
