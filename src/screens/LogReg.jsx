import '../index.css'
import '../style.css'
import React from 'react'
import UseTheme from '../hooks/useTheme.jsx'
import { useNavigate } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import useAccounts from "../hooks/useAccounts.jsx"
import { toast } from 'react-toastify'
import { useState,useEffect,useContext } from 'react'
import {register,login} from '../features/authSlice.js'
import { useDispatch , useSelector } from 'react-redux'
import { resetPassword } from '../service/authService.js'


export default function LogReg() {
	const [msg,setMsg]=useState()
	const navigate = useNavigate()
	const dispatch = useDispatch()
    const [toggleTheme,current] = UseTheme()
	const [loginState,setLoginState]=useState(false)
	const [getCurrentAccount,addAccount,removeAccount] = useAccounts()
	const [form,setForm] = useState({username:'',email:'',password:''})
	const { user,isError,isSuccess,message,isLoading } = useSelector(state => state.auth)


	const len=(val)=>(val.length)


	const handleInput = (event) => {
		console.log(form)
		setForm((prev) => ({...prev,[event.target.name]:event.target.value}))
	}


	async function handleSubmit(event){
		event.preventDefault()

		if (form.username && form.email && form.password && len(form.email)<4  || len(form.username)<3 || len(form.password)<4)
			return console.log("Pls Fill The Fields Correctly")

		if (loginState===true){
			// Register
			const registerData = {username:form.username,email:form.email,password:form.password}
			const regInfo= dispatch(register(registerData))
			console.log(regInfo)
			setLoginState(false)

		}else{
			// Login
			const loginData = {username:form.username,password:form.password}
			const logRes = await dispatch(login(loginData)).unwrap()
			if (logRes.username){
				toast(`Welcome ${logRes.username}`,{icon:'😋',position:'top-center'})
				console.log("Account to Add",logRes);
				addAccount(logRes)
				navigate('/home')
			}else
				toast("Incorrect Credentials",{icon:'😪',position:'top-center'})
		}
	}

	async function forgotPassword () {
		const f_email = prompt("Enter your email to recover your account 😋")
		if (!f_email?.trim() || f_email?.trim().length <5) 
			return toast("Pls Enter A Valid Email",{type:'info'})

		// Create Password Reset Route
		//  ^^ params email
		//  returns mail status ...
		const res = await resetPassword(f_email)
		console.log("Password Reset Console Stat :: ",res);

		if (!res.status)
			return toast(res.response,{type:'info'})

		return toast("Check You Email For A Password Reset Mail 💌.",{icon:'📩',position:'top-center'})

	}


	return (

		<div className="logreg-form min-h-screen flex flex-col border-green-300 dark:bg-gray-900 mt-3 px-3">

			<h1 className="font-black mt-4 mx-auto w-[350px] text-5xl text-black dark:text-gray-50">Memoriex</h1>
 
			{/*<div className=" flex justify-evenly mx-auto mt-[4rem] mb-[2.5rem] w-full dark:text-gray-50">
				<button className={loginState ? 'logreg-Btn' :'logreg-Btn-active'}
					onClick={()=>setLoginState(false)}>Login</button>

				<button className={!loginState ? 'logreg-Btn' :'logreg-Btn-active'}
					onClick={()=>setLoginState(true)}>Register</button>
			</div>*/}

			<div className="bg-red-00 w-full md:w-[350px] flex flex-col gap-y-2 items-start mx-auto">
				<h2 className="mt-8 text-center font-semibold text-2xl text-gray-700">Welcome back to memoriex </h2>
				<div className="flex gap-x-2 items-center "> 
					<p className="font-light">{!loginState ? 'New here' : 'Already have an account'} ?</p> <a onClick={() => setLoginState(prev => !prev)} className="text-sky-500 underline w-auto">
						{!loginState ? 'Create an account' : 'Login'}
				</a></div>
			</div>

			<form className="flex flex-col m-[2rem] mx-auto " onSubmit={handleSubmit}>

				<input name="username" id="Olabo"
					type="name"
					name="username"
					value={form.username}
					autoComplete='off'
					onChange={handleInput} 
					placeholder="Username"
					onFocus={({target})=>console.log(target.name)} />
				

				{ loginState ?
					<input name="email"
						name="email"
						value={form.email}
						autoComplete='off' 
						placeholder="Email"
						onChange={handleInput}	
					/> : ""
				}
				

				<input name="password" 
					name="password"
					type="password"
					autoComplete='off'
					value={form.password} 
					onChange={handleInput}
					placeholder="Password"
				/>
				

						<button className=" bg-sky-400 py-4 text-xl font-bold rounded transition-all w-full md:w-[350px]" type="submit"> { isLoading 
							? (<div className="flex gap-x-2 items-center mx-auto w-full justify-center">
									<p>{!loginState ? "Login" : "Register"} </p>
									<div className="spinner"></div>
								</div>)
							: !loginState ? "Login" : "Register"} </button>
			</form>
			<p onClick={forgotPassword} className="cursor-pointer underline dark:text-white text-center mx-auto"> Forgotten Password</p>
			<p onClick={() => navigate('/Accounts')} className="cursor-pointer underline text-center mx-auto text-gray-900 dark:text-blue-500">All Accounts</p>

		</div>

		)
	
}