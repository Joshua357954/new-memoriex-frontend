import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit'
import { getUserStories } from '../service/storyService.js'


export const GetMyStories = createAsyncThunk('story/userStory',async(id, thunkAPI ) => {
	try{
		return await getUserStories(id)

	}catch(error) {
		thunkAPI.rejectWithValue(error)
	}
}) 

const initialState = {
	userStory : [],
	isLoading : false,
	isSuccess :true
}


const userStorySlice = createSlice({
	name:'userStory',
	initialState,
	reducers:{
		updateStories : (state,action) => {
			state.userStory = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(GetMyStories.pending,(state)=>{
				state.isLoading = true
			})
			.addCase(GetMyStories.fulfilled,(state,action)=>{
				state.isLoading = false
				state.userStory = action.payload
				state.isSuccess = true
			})
			.addCase(GetMyStories.rejected,(state,action)=>{
				state.isLoading = false
				state.isSuccess = true
			})
	}
})



export const { updateStories } = userStorySlice.actions

export default userStorySlice.reducer