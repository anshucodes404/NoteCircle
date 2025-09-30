import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface FriendsState {
    friends: string[]
}

const initialState: FriendsState = {
    friends: []
}

export const friendsSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        addFriends: (state, action: PayloadAction<string>) => {
            const friend = action.payload
            if (!state.friends.includes(friend)) {
                state.friends.push(friend)
            }
        },
        removeFriend: (state, action: PayloadAction<string>) => {
            state.friends = state.friends.filter(friend => friend !== action.payload)
        }
    }
})

export const { addFriends, removeFriend } = friendsSlice.actions

export const selectFriends = (state: {friends: FriendsState}) => state.friends.friends

export default friendsSlice.reducer