import { API } from "./base.js"
import useAccounts from "../hooks/useAccounts.jsx"

const STORE_NAME = "memoriex-auth"
const [getCurrentAccount,addAccount,removeAccount] = useAccounts()

export const registerUser = async(cred)=>{
	try {
		const {data} = await API.post("/auth/register",cred)
		return data.response

	}catch(err){
		return {status:false, response:err?.message}
	}
}

export const userLogin = async(cred)=>{
	try{
		const {data} = await API.post("/auth/login",cred)
		if (data){
			// addAccount(data.response)
		}
		console.log("Auth Service Login's : ",data.response)
		return data.response

	}catch(err){
		return {status:false, response:err?.message}
	}
}

export const resetPassword = async(email) => {

	try{
		const {data} = await API.post("/auth/forgotPassword",{email})
		console.log("Password Reset In Progress ... ");
		return data

	}catch(err){
		return {status:false, response:err?.message}
	}

}


export const validateReset = async(cred) => {

	try{
		const {data} = await API.post("/auth/validateReset",cred)
		console.log("Validating Reset In Progress ... ");
		return data

	}catch(err){
		return {status:false, response:err?.message}
	}

}
