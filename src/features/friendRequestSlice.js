import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFriendRequest } from "../service/friendService.js"


export const UserFriendRequests = createAsyncThunk('friendRequests/getReqs', async(id,thunkAPI) => {
	try{
		return await getFriendRequest(id)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})



const initialState = {
	Requests : [] , 
	isLoading:false,
	isSuccess:false,
	isError:false,
	Message:'',
}



const UserRequestsSlice = createSlice({
	name:'friendRequests',
	initialState,
	reducers : {
		reset: (state) => {
			state.Requests = []
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
	}},
	extraReducers : (builder) => {
		builder
			.addCase(UserFriendRequests.pending,(state)=>{
				state.isLoading = true
			})
			.addCase(UserFriendRequests.fulfilled,(state,action)=>{
				state.isLoading = false
				state.Requests = action.payload
				state.isSuccess = true
				state.isError = false
			})
			.addCase(UserFriendRequests.rejected,(state,action)=>{
				state.isLoading = false
				state.Message = action.payload
				state.isSuccess = true
				state.isError = true
			})
	}
})



export const { reset } = UserRequestsSlice.actions

export default UserRequestsSlice.reducer


