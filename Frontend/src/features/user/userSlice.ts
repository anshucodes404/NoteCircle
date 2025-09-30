import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  _id: string;
  email: string;
  username: string;
  friendsList: string[];
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.user;

export default userSlice.reducer;
