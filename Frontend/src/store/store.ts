import { configureStore } from "@reduxjs/toolkit"
import friendsReducer from "../features/friends/friendsSlice"
import userReducer from "../features/user/userSlice"
import currentFriendReducer from "../features/currentFriend/currentFriendSlice"

export const store = configureStore({
    reducer: {
        friends: friendsReducer,
        // messages: messagesReducer,
        user: userReducer,
        currentFriend: currentFriendReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch