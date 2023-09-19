import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { newPost, getMyPost,getFriendsPost } from '../service/postService.js'


export const getUserPost = createAsyncThunk('post/newPost', async(id,thunkAPI) => {
	try{
		return getFriendsPost(id)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})


// export const reactOnPost = createAsyncThunk('post/react', async(data,thunkAPI) => {
// 	try{
// 		return reactOnThePost(data)
// 	}catch(error){
// 		const message = (error.message && error)
// 		return thunkAPI.rejectWithValue(message)
// 	}
// })

const initialState = {
	message : null,
	allPost : [],
	userPost : [],
	isError : false,
	isLoading : false,
	isSuccess : false
}


export const createPost = createAsyncThunk('post/newPost', async(postData,thunkAPI) => {
	try{
		console.log("Create Post Thunk : ",postData)
		return await newPost(postData)

	}catch(error){
		const message = (error.message && error)
		return thunkAPI.rejectWithValue(message)
	}
})



const postSlice = createSlice({
	name:'post',
	initialState,
	reducers:{ 
		reset: (state) => initialState,
		updatePosts: (state,action) => {
			state.userPost = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
		.addCase(createPost.pending,(state)=> {
			state.isLoading = true
		})
		.addCase(createPost.fulfilled,(state,action)=>{
			// state.userPost = action.payload
			state.allPost = action.payload
			state.isError = null
			state.isSuccess= true
			state.isLoading= false
			state.message = ''
		})
	},

	extraReducers: (builder) => {
		builder
		.addCase(getUserPost.fulfilled,(state,action)=>{
			state.userPost = action.payload
			state.isError = false
		})
	}

})
   

 


export const { reset, updatePosts } = postSlice.actions
export default postSlice.reducer






