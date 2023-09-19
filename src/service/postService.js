import { API } from './base.js'


export const newPost = async(post_data) => {
	try{
		const {data} = await API.post("/post/newPost",post_data)
		console.log("Post Api Working ...",data)
		return data.createdPost

	}catch(error){
		return error
	}
}


export const getMyPost = async(id) => {
	try{
		const {data} = await API.get(`/post/getAllUserPost/${id}`)
		console.log("Post Api Working ...",data)
		return data.response[0].Posts

	}catch(error){
		return error
	}
}

// /react
// /updateReaction

export const reactOnThePost = async(cred) => {
	try{
		const {data} = await API.post("/post/react",cred)
		console.log("Reaction Endpoint State ...",data)
		return data

	}catch(error){
		return error
	}
}

export const updateReactionOnPost = async(cred) => {
	try{
		const {data} = await API.post("/post/updateReaction",cred)
		console.log("Update Reaction Endpoint State ",data)
		return data

	}catch(error){
		return error
	}

}


export const CommentOnPost = async(values) => {
	try{
		const {data} = await API.post("/post/comment",values)
		console.log("Comment Endpoint State ...",data)
		return data

	}catch(error){
		return error
	}
}


export const getFriendsPost = async(id) => {
	try{
		const {data} = await API.get(`/post/friendsPost/${id}`)
		return data.response
		
	}catch(error){
		return error
	}

}

export const deletePost = async(userId,postId) => {
	try{
		const {data} = await API.post(`/post/deletePost/`,{postId,userId})
		console.log("The delete data : ",data);
		return data.response
		
	}catch(error){
		return error
	}

}