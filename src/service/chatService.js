import { API } from "./base.js"

export const getConversations = async(id)=>{
	try{
		const {data} = await API.get(`/chat/findMany/${id}`)
		// console.log("Collected Data ConvID : " , id,data)
		return data
	}
	catch(error){
		console.log(error)
	}
}


//  Add Friend Request
export const createConversation = async(user1,user2) => {
	
	try{
		const { data } = await API.post(`/chat/create`,{user:user1,friend:user2,owner:user1})
		return data

	}catch(error){
		return error
	}
}


export const markReadChat = async(convId,userId) => {
	console.log("Chat to read",convId,userId)
	try{
		const { data } = await API.post('/message/markRead',{convId,userId})
		// console.log(data)
		return data

	}catch(error){
		return error
	}
}

