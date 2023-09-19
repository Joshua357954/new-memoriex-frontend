


import { API } from "./base.js"


export const getConversationMessages = async(conv_id)=>{
	try{
		const {data} = await API.get(`/message/get/${conv_id}`)
		console.log(data[0])
		return data[0].Messages
	}
	catch(error){
		console.log(error)
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
		console.log(data)
		return data
	}
	catch(error){
		console.log(error)
	}
}
