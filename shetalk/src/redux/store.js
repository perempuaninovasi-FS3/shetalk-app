import { configureStore } from '@reduxjs/toolkit';
import user from './slice/userSlice';
import posts from './slice/postSlice'

const store = configureStore({
    reducer: {
        user,
        posts,
    },
});

export default store;