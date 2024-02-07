import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export const fetchAvatars = createAsyncThunk('avatars/fetchAvatars', async (_, thunkAPI) => {
    const response = await fetch(`${API_URL}/api/avatars`, {
        headers: {
            'API_KEY': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data.data;
});

const saveAvatarToSessionStorage = (avatar) => {
    sessionStorage.setItem('selectedAvatar', JSON.stringify(avatar));
};

const avatarSlice = createSlice({
    name: 'avatars',
    initialState: {
        avatars: [],
        selectedAvatar: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        setSelectedAvatar: (state, action) => {
            state.selectedAvatar = action.payload;
            saveAvatarToSessionStorage(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAvatars.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAvatars.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.avatars = action.payload;
            })
            .addCase(fetchAvatars.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setSelectedAvatar } = avatarSlice.actions;

export const selectAvatars = (state) => state.avatars.avatars;
export const selectSelectedAvatar = (state) => state.avatars.selectedAvatar;

export default avatarSlice.reducer;