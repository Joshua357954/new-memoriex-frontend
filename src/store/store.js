import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice.js'
import postReducer from '../features/postSlice.js'
import eventReducer from '../features/eventSlice.js'
import allFriendReducer from '../features/allFriendSlice.js'
import otherEventReducer from "../features/otherEventSlice.js"
import friendRequestsReducer from '../features/friendRequestSlice.js'
import friendSuggestionReducer from '../features/friendSuggestionSlice.js'
import notificationReducer from '../features/notificationSlice.js'
import storyReducer from '../features/storySlice.js'
import userStoryReducer from '../features/userStorySlice.js'


export const store = configureStore({
	reducer : {
		auth: authReducer,
		post: postReducer,
		allFriend: allFriendReducer,
		friendSuggestion: friendSuggestionReducer,
		friendRequests: friendRequestsReducer,
		events: eventReducer,
		otherEvents:otherEventReducer,
		notification:notificationReducer,
		stories:storyReducer,
		userStory:userStoryReducer
	}
})















