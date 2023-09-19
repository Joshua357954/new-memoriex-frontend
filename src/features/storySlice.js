import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getStories } from "../service/storyService.js"


export const FetchStories = createAsyncThunk('story/AllStories', async(id,thunkAPI) => {
	try{
		return await getStories(id)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})



const initialState = {
	Stories : [] , 
	isLoading:false,
	isSuccess:false,
	isError:false,
	Message:'',
}



const StorySlice = createSlice({
	name:'stories',
	initialState,
	// reducers : {
	// 	reset: (state) => {
	// 		state.Stories = []
	// 		state.isLoading = false
	// 		state.isSuccess = false
	// 		state.isError = false
	// }},
	extraReducers : (builder) => {
		builder
			.addCase(FetchStories.pending,(state)=>{
				state.isLoading = true
			})
			.addCase(FetchStories.fulfilled,(state,action)=>{
				state.isLoading = false
				state.Stories = action.payload
				state.isSuccess = true
				state.isError = false
			})
			.addCase(FetchStories.rejected,(state,action)=>{
				state.isLoading = false
				state.Message = action.payload
				state.isSuccess = true
				state.isError = true
			})
	}
})



export const { reset } = StorySlice.actions

export default StorySlice.reducer


