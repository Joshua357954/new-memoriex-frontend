import { API } from "./base.js"



export const getUserById = async(id)=>{
	try{
		const {data} = await API.get(`/user/getUser/${id}`)
		console.log(id,data.response)
		return data.response
	}
	catch(error){
		console.log(error)
	}
}