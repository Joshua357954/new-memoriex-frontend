import { API } from "./base.js"


export const getConversations = async(id)=>{
	try{
		console.log(id)
		const {data} = await API.get(`/chat/findMany/${id}`)
		console.log(id,data)
		return data
	}
	catch(error){
		console.log(error)
	}
}

