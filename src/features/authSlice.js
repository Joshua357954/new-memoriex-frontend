import { registerUser, userLogin } from '../service/authService.js'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import useAccounts from "../hooks/useAccounts.jsx"

//  get Users From LocalStorage 
const STORE_NAME = "memoriex-auth"
const [getCurrentAccount] = useAccounts()
const user = getCurrentAccount()

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: ""
}

// Register user
export const register = createAsyncThunk('auth/register', async(user,thunkAPI) => {
	try{
			return await registerUser(user)
		} catch (error) {
			const message = error.message || error
			return thunkAPI.rejectWithValue(message)
		}
	})

//  Login User
export const login = createAsyncThunk('auth/login', async(user,thunkAPI) => {
		try{
			return await userLogin(user)
		} catch (error) {
			const message = (error.message && error)
			return thunkAPI.rejectWithValue(message)
		}
	})


//  Auth Slice ...
export const authSlice = createSlice({
	name:'auth',
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false
			state.isSuccess = false
			state.isError = false
			state.message = ""
			state.user=""
		},
		updateUser: (state,action) => {
			state.user = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(login.pending,(state)=>{
			state.isLoading = true
		})
		.addCase(login.fulfilled,(state,action)=>{
			state.isLoading=false
			state.isSuccess=true
			state.message=""
			state.user = action.payload
		})
		.addCase(login.rejected,(state)=>{
			state.isLoading = false
			state.isSuccess = false
			state.isError = true
			state.message = "An Error Occured While Loging in :)"
			state.user = null
		})

		//  Register  Cases 
		.addCase(register.pending,(state)=>{
			state.isLoading = true
		})

		.addCase(register.fulfilled,(state,action)=>{
			state.isLoading=false
			state.isSuccess=true
			state.message="Registeration Complete"
		})

		.addCase(register.rejected,(state)=>{
			state.isLoading = false
			state.isSuccess = false
			state.isError = true
			state.message = "An Error Occured During Registeration "
			state.user = null
		})
	}
})

export const { reset,updateUser } = authSlice.actions

export default authSlice.reducer
