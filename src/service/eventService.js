import { API } from './base.js'


export const createEvent = async(values) => {
	try{
		const {data} = await API.post('/event/create',values)
		console.log("Generating Event..",data)
		return data

	}catch(error){
		return error
	}	
}

export const getOtherEvents = async(values) => {
	try{
		const {data} = await API.get(`/event/get/${values.venue}/${values.userId}`)
		console.log("Collecting Other Event..",data)
		return data.response

	}catch(error){
		return error
	}	
}


export const getMyEvents = async(user_id) => {
	try{
		const {data} = await API.get(`/event/myEvents/${user_id}`)
		console.log("Fetching User Event..",data)
		return data.response

	}catch(error){
		return error
	}	
}



export const deleteUserEvent = async(event_cred) => {
	try{
		const {data} = await API.post(`/event/delete`,event_cred)
		console.log("Deleted User Event..",data)
		return data

	}catch(error){
		return error
	}	
}