import { API } from './base.js'


export const getUser = async(id) => {
	try{
		const {data} = await API.get(`/user/getUser/${id}`)
		// console.log("getUser Service Working ...",data)
		return data.response

	}catch(error){
		return error
	}
	
}


export const updateProfile = async(cred) => {
	try{
		const {data} = await API.post(`/user/updateUserProfile`,cred)
		console.log("Updated Profile : ",data)
		return data.response
	}catch(error){
		return error
	}

}


export const hashPassword = async(password) => {
	try{
		const {data} = await API.post(`/user/hashPassword`,password)
		console.log("Hash Password : ",data)
		return data.response
	}catch(error){
		return error
	}

}

export const comparePassword = async(cred) => {
	try{
		const {data} = await API.post("/user/comparePassword",cred)
		console.log("Password Comparism : ",data)
		return data.response
	}catch(error){
		return error
	}

}










