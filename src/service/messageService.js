import { API } from "./base.js"


export const getConversationMessages = async(conv_id)=>{
	try{
		const {data} = await API.get(`/message/get/${conv_id}`)
		return data[0].Messages
	}
	catch(error){
		// console.log(error)
		console.log("An error occured while getting conversations :)")
	}
}


export const sendMessageToChat = async(convId,SenderId,text)=>{
	const msgData={
		ConversationId:convId,
		SenderId,
		text,
	}

	try{
		const {data} = await API.post(`/message/add/`,msgData)
		return data
	}
	catch(error){
		console.log(error)
	}
}


export const conversationLastMessage = async(convId) => {

	try{
		const { data } = await API.get(`/message/getLastMessage/${convId}/`)
		// console.log(data)
		return data.response?.Messages

	}catch(error){
		return error
	}
}