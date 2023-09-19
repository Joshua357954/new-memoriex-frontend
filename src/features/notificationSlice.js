
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMyNotifications } from "../service/notificationService.js"


export const fetchUserNotifications = createAsyncThunk('notification/getMyNotifications', async(id,thunkAPI) => {
	try{
		return await getMyNotifications(id)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})


const initialState = {
	userNotifications : [],
	isLoading:false,
	isSuccess:false,
	isError:false,
	Message:'',
}



const NotificationSlice = createSlice({
	name:'notification',
	initialState,
	reducers : {
		reset: (state) => {
			state.userNotifications = []
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
		},
		updateNotification: (state,action) => {
			state.userNotifications = action.payload
		}
	},
	extraReducers : (builder) => {
		builder
			.addCase(fetchUserNotifications.pending,(state)=>{
				state.isLoading = true
			})

			.addCase(fetchUserNotifications.fulfilled,(state,action)=>{
				state.isLoading = false
				console.error(action.payload)
				state.userNotifications = action.payload
				console.log("SAssls" ,state.userNotifications)
				state.isSuccess = true
				state.isError = false
			})

			.addCase(fetchUserNotifications.rejected,(state,action)=>{
				state.isLoading = false
				state.Message = action.payload
				state.isSuccess = true
				state.isError = true
			})
	}
})



export const { reset, updateNotification } = NotificationSlice.actions

export default NotificationSlice.reducer


