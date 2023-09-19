import { API } from "./base.js"

export const registerUser = async(username,email,password)=>{
	const params = { username, email, password }	
	try {
		const {data} = await API.post("/auth/register",params)
		return data

	}catch(err){
		return {status:false, response:err?.message}
	}
}

export const userLogin = async(username,password)=>{
	const params= { username, password }
	try{
		const {data} = await API.post("/auth/login",params)
		return data

	}catch(err){
		return {status:false, response:err?.message}
	}
}
