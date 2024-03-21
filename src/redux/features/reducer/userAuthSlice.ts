import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface UserData {
    user: {
        userdata: Record<string, any> | string;
    };
}

const initialState: UserData = {
    user: {
        userdata: {},
    },
};

const userAuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserTokenAndUserData(state, action: PayloadAction<{ token: string; user: Record<string, any> }>) {
            // set local storage
            localStorage.setItem('userToken', JSON.stringify({ token: action.payload.token }));
            // set redux state
            state.user = { userdata: action.payload.user };
        },

        deleteUserTokenAndUserData(state) {
            localStorage.removeItem('userToken');
            state.user = { userdata: '' };
        },
    },
});

export const { setUserTokenAndUserData, deleteUserTokenAndUserData } = userAuthSlice.actions;
export const selectUserAuth = (state: RootState) => state.userAuth.user;
export const userAuthReducer = userAuthSlice.reducer;
