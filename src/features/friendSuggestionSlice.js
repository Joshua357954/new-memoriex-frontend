import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFriendSuggestion } from "../service/friendService.js"


export const UserFriendSuggestion = createAsyncThunk('friendSuggestion/getSugg', async(id,thunkAPI) => {
	try{
		return await getFriendSuggestion(id)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})



const initialState = {
	Suggestions : [] , 
	isLoading:false,
	isSuccess:false,
	isError:false,
	Message:'',
}



const UserSuggestionSlice = createSlice({
	name:'friendSuggestion',
	initialState,
	reducers : {
		reset: (state) => {
			state.Suggestions = []
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
	}},
	extraReducers : (builder) => {
		builder
			.addCase(UserFriendSuggestion.pending,(state)=>{
				state.isLoading = true
			})
			.addCase(UserFriendSuggestion.fulfilled,(state,action)=>{
				state.isLoading = false
				state.Suggestions = action.payload
				state.isSuccess = true
				state.isError = false
			})
			.addCase(UserFriendSuggestion.rejected,(state,action)=>{
				state.isLoading = false
				state.Message = action.payload
				state.isSuccess = true
				state.isError = true
			})
	}
})



export const { reset } = UserSuggestionSlice.actions

export default UserSuggestionSlice.reducer


