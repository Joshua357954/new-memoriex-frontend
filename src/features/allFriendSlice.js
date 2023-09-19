import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFriends } from "../service/friendService.js"


export const UserFriends = createAsyncThunk('allFriend/AllFriends', async(id,thunkAPI) => {
	try{
		return await getFriends(id)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})



const initialState = {
	Friends : [] , 
	isLoading:false,
	isSuccess:false,
	isError:false,
	Message:'',
}



const UserFriendSlice = createSlice({
	name:'allFriend',
	initialState,
	reducers : {
		reset: (state) => {
			state.Friends = []
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
	}},
	extraReducers : (builder) => {
		builder
			.addCase(UserFriends.pending,(state)=>{
				state.isLoading = true
			})
			.addCase(UserFriends.fulfilled,(state,action)=>{
				state.isLoading = false
				state.Friends = action.payload
				state.isSuccess = true
				state.isError = false
			})
			.addCase(UserFriends.rejected,(state,action)=>{
				state.isLoading = false
				state.Message = action.payload
				state.isSuccess = true
				state.isError = true
			})
	}
})



export const { reset } = UserFriendSlice.actions

export default UserFriendSlice.reducer


