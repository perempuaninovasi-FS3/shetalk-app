import { configureStore } from '@reduxjs/toolkit';
import { fetchAvatars } from './slice/avatarSlice';
import { fetchTopics } from './slice/topicSlice';
import { fetchPosts } from './slice/postSlice';
import user from './slice/userSlice';
import posts from './slice/postSlice';
import avatars from './slice/avatarSlice';
import topics from './slice/topicSlice';
import auth from './slice/authSlice';

const store = configureStore({
    reducer: {
        user,
        avatars,
        posts,
        topics,
        auth,
    },
});

store.dispatch(fetchAvatars());
store.dispatch(fetchTopics());
store.dispatch(fetchPosts());

export default store;