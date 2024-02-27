import { configureStore } from '@reduxjs/toolkit';
import { fetchAvatars } from './slice/avatarSlice';
import { fetchTopics } from './slice/topicSlice';
import { fetchPosts } from './slice/postSlice';
import user, { fetchUserComments, fetchUserPosts } from './slice/userSlice';
import posts from './slice/postSlice';
import avatars from './slice/avatarSlice';
import topics from './slice/topicSlice';
import auth from './slice/authSlice';
import comments from './slice/commentSlice'

const store = configureStore({
    reducer: {
        user,
        avatars,
        posts,
        topics,
        auth,
        comments,
    },
});

store.dispatch(fetchAvatars());
store.dispatch(fetchTopics());
store.dispatch(fetchPosts());

const token = localStorage.getItem('token');
if (token) {
    store.dispatch(fetchUserPosts());
    store.dispatch(fetchUserComments());
}

export default store;