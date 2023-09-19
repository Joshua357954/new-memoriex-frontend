import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getOtherEvents } from "../service/eventService.js"


export const FetchOtherEvents = createAsyncThunk('otherEvents/getOtherEvents', async(values,thunkAPI) => {
	try{
		return await getOtherEvents(values)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})



const initialState = {
	OtherEvents: [],
	isLoading:false,
	isSuccess:false,
	isError:false,
	Message:'',
}



const OtherEventSlice = createSlice({
	name:'otherEvents',
	initialState,
	reducers : {
		reset: (state) => {
			state.OtherEvents = []
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
	}},
	extraReducers : (builder) => {
		builder
			.addCase(FetchOtherEvents.pending,(state)=>{
				state.isLoading = true
			})

			.addCase(FetchOtherEvents.fulfilled,(state,action)=>{
				state.isLoading = false
				state.OtherEvents = action.payload
				state.isSuccess = true
				state.isError = false
			})

			.addCase(FetchOtherEvents.rejected,(state,action)=>{
				state.isLoading = false
				state.Message = action.payload
				state.isSuccess = true
				state.isError = true
			})
	}
})



export const { reset } = OtherEventSlice.actions

export default OtherEventSlice.reducer


