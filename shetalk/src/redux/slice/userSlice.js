import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

// Action creator for sending user data to API
export const sendUserToApi = (userData) => async (dispatch) => {
    try {
        const { profile, username, role } = userData;
        console.log('Sending user data to API:', userData); // Tambahkan log ini
        const response = await axios.post('https://65a89524219bfa3718673e13.mockapi.io/user', {
            profile,
            username,
            role,
        });
        console.log('User registration successful:', response.data);
        dispatch(setUser(userData));

    } catch (error) {
        console.error('Error registering user:', error);
    }
};

export default userSlice.reducer;
