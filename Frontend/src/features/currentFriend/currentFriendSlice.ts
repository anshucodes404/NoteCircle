import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CurrentFriend {
  name: string;
  _id: string;
  username: string;
  profilePicture: string;
}

interface CurrentFriendState {
    currentFriend: CurrentFriend | null;
}

const initialState: CurrentFriendState = {
 currentFriend: null,
};

export const currentFriendSlice = createSlice({
    name: "currentFriend",
    initialState,
    reducers: {
        setCurrentFriend: (state, action: PayloadAction<CurrentFriend>) => {
            state.currentFriend = action.payload
        },

        unsetCurrentFriend: (state) => {
            state.currentFriend = null;
        }
    }
})

export const { setCurrentFriend, unsetCurrentFriend } = currentFriendSlice.actions

export const selectCurrentFriend = (state: { currentFriend: CurrentFriendState }) => state.currentFriend.currentFriend

export default currentFriendSlice.reducer