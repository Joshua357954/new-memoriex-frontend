import { API } from "./base.js"

// /add (userId , friendId)
// /acceptRequest  ()
// /getFriendRequests/:userId
// /myFriends/:userId
// /suggestion/:userId
// /deleteFriendOrRequest

// base route friend


//  Add Friend Request
export const AddNewFriend = async(userId,FriendId) => {
	const cred = { userId , FriendId }
	try{
		const { data } = await API.post(`/friend/add`,cred)
		return data

	}catch(error){
		return error
	}
}


//  Accept Friend Request
export const AcceptRequest = async(reqId,userId) => {
	const cred = { reqId , userId }
	try{
		const { data } = await API.post(`/friend/acceptRequest`,cred)
		// console.log("AcceptRequest Service : ",data)
		return data

	}catch(error){
		return error
	}
}


// Get Friend
export const getFriends = async(id) => {
	try{
		const { data } = await API.get(`/friend/myFriends/${id}`)
		// console.log("This is D Best : ",data)
		return data.response

	}catch(error){
		return error
	}
}


//  Friend Reqs
export const getFriendRequest = async(id) => {
	try{
		const { data } = await API.get(`/friend/getFriendRequests/${id}`)
		// console.log(" Friend Req Service : ",data)
		return data.response

	}catch(error){
		return error
	}
}


// Friends Suggestion
export const getFriendSuggestion = async(id) => {
	try{
		const { data } = await API.get(`/friend/suggestion/${id}`)
		// console.log("Friend Sugg Service : ",data)
		return data.response

	}catch(error){
		return error
	}
}


// Delete Friend
export const DeleteUserFriend = async(FriendId,userId) => {
	const cred = { FriendId, userId }
	try{
		const { data } = await API.post(`/friend/deleteUserFriend`,cred)
		// console.log("Deleted Friend : ",data)
		return data

	}catch(error){
		return error
	}
}


export const DeleteFriend = async(FriendId, userId) => {
	const cred = { FriendId, userId}
	try{
		const { data } = await API.post(`/friend/deleteSuggestionOrRequest`,cred)
		// console.log("Deleted Friend : ",data)
		return data

	}catch(error){
		return error
	}
}









