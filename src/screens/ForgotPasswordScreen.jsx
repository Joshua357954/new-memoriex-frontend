import '../style.css'
import React from 'react'
import { toast } from 'react-toastify'
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { validateReset } from '../service/authService.js'
//  Check if query string and userId is valid
//  if not give a redirect button

export default function ForgotPasswordScreen() {
	const navigate = useNavigate()
	const { id, resetString } = useParams()
	const [isLoading,setIsLoading]=useState(false)

	const [form,setForm] = useState({password:'',confirmPassword:''})


	function handleInput (e) {
		setForm((prev) => ({...prev,[e.target.name]:e.target.value}))
	}

	const handleSubmit = async(e) => {
		//  Authenticate qs and Change Password
		e.preventDefault()

		console.log("Params ::: ",id,resetString)
		if (!form.password?.trim() || !form.confirmPassword?.trim() ){
			return toast("Please fil the empty fields and try again",{type:'warning',position:'top-center'})
		} 

		if (form.password?.trim() != form.confirmPassword?.trim()){
			return toast("Passwords are not same!",{type:'warning',position:'top-center'})
		}

		setIsLoading(true)

		const cred = {id, resetString, newPassword:form.password}
		const isCompleted = await validateReset(cred)
		
		if(isCompleted.status){
			toast(isCompleted?.response,{type:'info',position:'top-center'})
			navigate('/Login')
		}
		else{
			toast(isCompleted?.response,{type:'error',position:'top-center'})
		}
		return setIsLoading(false)
		
	}

	const input_style="px-2 py-3 mt-2 rounded-sm focus:outline-none border-2 border-green-300 mx-auto"

	return (
		<div className="mx-auto">
			<h1 className='text-center text-gray-900'> Reset Password </h1>
			<form className="flex flex-col m-[2rem] mx-auto mt-3" onSubmit={handleSubmit}>

				<input name="username" id="Olabo"
					type="name"
					name="password"
					value={form.password}
					autoComplete='off'
					onChange={handleInput} 
					placeholder="Password" className={`${input_style}`}
				/>

				<input name="password" 
					name="confirmPassword"
					type="password"
					autoComplete='off'
					value={form.confirmPassword} 
					onChange={handleInput}
					placeholder="Confirm" className={`${input_style}`}
				/>
				<button className="--submit transition-all mt-4 ml-5" type="submit"> { isLoading ? <div className="spinner"></div>  : "Reset"} </button>
	
			</form>

		
		</div>
	)
}