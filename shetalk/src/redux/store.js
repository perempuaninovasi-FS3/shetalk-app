import { configureStore } from '@reduxjs/toolkit';
import user from './slice/userSlice';
import posts from './slice/postSlice';
import avatars from './slice/avatarSlice'
import { fetchAvatars } from './slice/avatarSlice';

const store = configureStore({
    reducer: {
        user,
        avatars,
        posts,
    },
});

store.dispatch(fetchAvatars());

export default store;