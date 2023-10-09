import React from 'react'
import { toast } from 'react-toastify'
import { useRef, useState, useEffect } from 'react' 
import useAccounts from '../../hooks/useAccounts.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { DotLoader,BeatLoader } from 'react-spinners'
import { updateUser } from '../../features/authSlice.js'
import { updateProfile, hashPassword, comparePassword } from "../../service/userService.js"


// export default function SettingsEntryCard1() {
// 	const ct = useRef(1)
// 	const dispatch = useDispatch()
// 	const [ loading, setLoading ] = useState(false)
// 	const { user } = useSelector( state => state.auth )
// 	const [confirmPassword,setConfirmPassword] = useState('')
// 	const [fakeValues,setFakeValues] = useState({username:'',password:''})
// 	const [initialValues,setInitialValues] = useState({username:'',password:''})

// 	useEffect(() => {
// 		setInitialValues({username:user?.username,password:user?.password})
// 		setFakeValues({username:user?.username,password:user?.password})
// 	},[user])


// 	function changeValues(e) {
// 		setInitialValues((prev) => ({...prev,[e.target.name]:e.target.value}))
// 	}


// 	const noChange = () => {
// 		return JSON.stringify(fakeValues) == JSON.stringify(initialValues)
// 	}


// 	const makeChanges = async() => {
// 		const old_password = fakeValues.password
// 		console.log(noChange());
// 		if (noChange())
// 			return toast("Please Make A Change and Try again : ",{type:'info'})
// 		if (ct.current >= 2){
// 			// make it happen
// 			ct.current = 1

// 		}
// 		else {
// 			toast("To Confirm Cedentials Update, Click the save changes button again .",{type:'info',position:'top-center'})
// 			ct.current += 1
// 			return "Hello"
// 		}


// 		//  Check if password is correct
// 		setLoading(true)
// 		const toCompare = {hash:fakeValues.password,password:confirmPassword}
// 		const comparism_res = await comparePassword(toCompare)
		
// 		//  if correct  hash password
// 		if (!comparism_res) {
// 			toast("Incorrect Old Password",{tpye:'info'})
// 			return setLoading(false)
// 		}

// 		const toHash = await hashPassword({password:initialValues.password})
// 		console.log(toHash.response)

// 		// Simplify Validation
// 		const changeCheck = {
// 			'U&P':initialValues.password != fakeValues.password && initialValues.username != fakeValues.username,
// 			'U':initialValues.password == fakeValues.password && initialValues.username != fakeValues.username,	
// 			'P':initialValues.username != fakeValues.username && initialValues.password == fakeValues.password,
// 		}
// 		// Update Profile in database 
// 		const new_details = changeCheck['U&P'] ? 
// 				{...user,'password':toHash,'username':initialValues.username} 
// 				: changeCheck['U'] ? 
// 				{...user,password:toHash,'username':initialValues.username} 
// 				: {...user,password:toHash} 
		
// 		console.log("Check Console ::: : ",changeCheck['U&P'] ? "Username & Password" : changeCheck['U'] ? " Username Only" : "Password Only" )
		
// 		console.log("New Details : ",new_details)
// 		await updateProfile(new_details)

// 		//  Set Loading state to false Then Continu with Others for Better app performance
// 		setLoading(false)

// 		//  Update Local State 
// 		await dispatch(updateUser(new_details))

// 		//  Update LocalStorage
// 		localStorage.setItem('memoriex-auth',JSON.stringify(new_details))

// 	}

// 	return (

// 		<div className='flex flex-col w-full h-full space-y-4 pt-2 dark:bg-gray-600 bg-gray-100 justifystary items-center'>
// 			{ loading ? <h1>Loading ...</h1> : "" }
// 			<label htmlFor="note" className="dark:text-gray-50 text-sm text-left font-extralight">Edit Your Profile Info</label>

// 			<input value={initialValues.username} onChange={changeValues}	name="username" className="border-2 border-blue-100 py-1 px-2 rounded-md placeholder-gray-400 text-sm focus:outline-none"
// 			placeholder="UserName" />

// 			<input value={initialValues.password} onChange={changeValues} name="password" className="border-2 border-blue-100 py-1 px-2 rounded-md placeholder-gray-400 text-sm focus:outline-none"
// 			placeholder="Password" />

// 			<label htmlFor="password2" className="dark:text-gray-50 text-sm text-left font-extralight">Pls Only Fill To Change Username or Password</label>
// 			<input name="confirmP" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} className="py-1 px-2 border-2 border-blue-100 rounded-sm placeholder-gray-400 text-sm focus:outline-none"
// 			placeholder="Enter Old Password" />

// 			<button onClick={makeChanges} className={`bg-blue-400 dark:bg-blue-300  dark:text-gray-900 text-center py-2 w-full`}>Save Changes</button>
// 		</div>
// 	)
// }



export default function SettingsEntryCard1() {
	const ct = useRef(1)
	const dispatch = useDispatch()
	const [ loading, setLoading ] = useState(false)
	const { user } = useSelector( state => state.auth )
	const [confirmPassword,setConfirmPassword] = useState('')
	const [fakeValues,setFakeValues] = useState({username:'',password:''})
	const [initialValues,setInitialValues] = useState({username:'',password:''})
	const [getCurrentAccount,addAccount,removeAccount,logOutUser,getStore,setCurrentAccount] = useAccounts()


	const updateUsername = () => {
		const uName1 = prompt("Enter Current Username :")
		if (!uName1) return ""

		if (uName1.trim().toLowerCase() != user.username.toLowerCase())
			return toast("Username Mismatch",{type:'warning'})

		const uName2 = prompt("Enter New Username :")
		if (!uName2?.trim()) return ""
		const password = prompt("Enter Password : ")
		const cred = {new_name:uName2,password}
		ct.current=1
		makeChanges("Username",cred)
	}


	const updatePassword = () => {
		try{
			const OldPassword = prompt("Enter Old Password :")
			if (!OldPassword?.trim()) return ""
			const password1 = prompt("Enter New Password :")
			if (!password1?.trim()) return  ""
			const password2 = prompt("Confirm New Password : ")	

			if (!OldPassword) return toast("Profile Update Cancelled")

			if (password1 != password2) {
				return toast("Password Mismatch",{type:'warning'})
			}
			if (OldPassword == password2) {
				return toast("New Password Same with Old",{type:'info'})
			}
			const cred = {old_password:OldPassword,password:password2}
			ct.current=2
			makeChanges("Password",cred)			
		}
		catch(error){
			console.log("A Error Occured",error)
		}

	}


	async function makeChanges (type="Username",values) {
		
		const isPassword = type == "Password"
		// Determine if Username or Password is to be Updated
		const toUpdate = isPassword ? {password:values?.old_password,new_password:values?.password} :
									  {password:values?.password,name:values?.new_name}

		console.log("Values To Update : ",toUpdate)

		setLoading(true)
		const toCompare = {hash:user?.password,password:toUpdate?.password}
		const comparism_res = await comparePassword(toCompare)

		// Compare Password with existing password Hash
		if (!comparism_res) {
			toast("Incorrect Old Password",{type:'info'})
			return setLoading(false)
		}

		//  hash password
		const toHash = await hashPassword({password:toUpdate.new_password})

		const new_details = isPassword ? {...user,password:toHash} : {...user,username:toUpdate?.name} 
			
		console.log("New Details : ",new_details)
		const isProfileUpdated = await updateProfile(new_details)
		if (!isProfileUpdated.error){
			console.log(isProfileUpdated)
			toast("Credential update Success",{icon:'👍'})
		}

		//  Set Loading state to false Then Continue with Others for Better User Experience 
		setLoading(false)

		//  Update Local State 
		await dispatch(updateUser(new_details))

		//  Update LocalStorage
		removeAccount(new_details)
		addAccount(new_details)

	}

	return (

		<div className='flex flex-col w-full h-full space-y-4 py-2 dark:bg-gray-600 bg-gray-100 justifystary items-center'>
			{ loading ? <BeatLoader color="#d9d9d9"  size={18}/>  : "" }

			<button disabled={loading } onClick={updateUsername} 
			className="bg-white text-center w-3/4 py-1 rounded flex justify-center items-center">Change UserName</button>

			<button disabled={loading} onClick={updatePassword} 
			className="bg-red-100 text-center w-3/4 py-1 rounded flex justify-center items-center">Change Password</button>

			{/*<button onClick={makeChanges} className={`bg-blue-400 dark:bg-blue-300  dark:text-gray-900 text-center py-2 w-full`}>Save Changes</button>*/}
		</div>
	)
}