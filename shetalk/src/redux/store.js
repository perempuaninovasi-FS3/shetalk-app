import { configureStore } from '@reduxjs/toolkit';
import user from './slice/userSlice';
import posts from './slice/postSlice';
import avatars from './slice/avatarSlice'

const store = configureStore({
    reducer: {
        user,
        avatars,
        posts,
    },
});

export default store;