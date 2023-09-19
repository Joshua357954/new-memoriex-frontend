import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMyEvents } from "../service/eventService.js"


export const FetchUserEvents = createAsyncThunk('events/getMyEvents', async(id,thunkAPI) => {
	try{
		return await getMyEvents(id)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})


const initialState = {
	UserEvents : [] ,
	isLoading:false,
	isSuccess:false,
	isError:false,
	Message:'',
}



const EventSlice = createSlice({
	name:'events',
	initialState,
	reducers : {
		reset: (state) => {
			state.UserEvents = []
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
	}},
	extraReducers : (builder) => {
		builder
			.addCase(FetchUserEvents.pending,(state)=>{
				state.isLoading = true
			})

			.addCase(FetchUserEvents.fulfilled,(state,action)=>{
				state.isLoading = false
				state.UserEvents = action.payload
				state.isSuccess = true
				state.isError = false
			})

			.addCase(FetchUserEvents.rejected,(state,action)=>{
				state.isLoading = false
				state.Message = action.payload
				state.isSuccess = true
				state.isError = true
			})
	}
})



export const { reset } = EventSlice.actions

export default EventSlice.reducer


