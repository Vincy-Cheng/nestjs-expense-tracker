import { createSlice } from '@reduxjs/toolkit';
import { IUserInfo } from '../types';

export interface UserState {
  userInfo: IUserInfo | undefined;
  isSignedIn: boolean;
}

const initialState = {
  isSignedIn: false,
  userInfo: undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsSignedIn: (state) => {
      state.isSignedIn = true;
    },
    logout: (state) => {
      state.isSignedIn = false;
      state.userInfo = undefined;
    },
  },
});

export const { setIsSignedIn, logout } = userSlice.actions;

export default userSlice.reducer;
