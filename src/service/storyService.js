import { API } from './base.js'


export const makeStory = async(values) => {
	try{
		const {data} = await API.post('/story/create',values)
		console.log("Posting Story ..",data)
		return data

	}catch(error){
		return error
	}	
}


export const getStories = async(id) => {
	try{
		const {data} = await API.get(`/story/userStories/${id}`)
		// console.log("Getting Story ..",data)
		return data.response

	}catch(error){
		return error
	}	
}



export const getUserStories = async(id) => {
	try{
		const {data} = await API.get(`/story/personalStories/${id}`)
		// console.log("Users Story ..",data)
		return data.response

	}catch(error){
		return error
	}	
}


export function deleteMyStory(storyId,userId) {
	try {
		const {data} = API.post('story/delete',{storyId,userId})
		console.log("Story Deleted ",data)
	
	}catch(error){
		console.log(error)
	}
}

