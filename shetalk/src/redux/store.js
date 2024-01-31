import { configureStore } from '@reduxjs/toolkit';
import { fetchAvatars } from './slice/avatarSlice';
import { fetchTopics } from './slice/topicSlice';
import user from './slice/userSlice';
import posts from './slice/postSlice';
import avatars from './slice/avatarSlice'
import topics from './slice/topicSlice'

const store = configureStore({
    reducer: {
        user,
        avatars,
        posts,
        topics,
    },
});

store.dispatch(fetchAvatars());
store.dispatch(fetchTopics());

export default store;