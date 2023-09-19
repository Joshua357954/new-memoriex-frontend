import React from 'react'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { MdClose as Close } from "react-icons/md"
import { useSelector,useDispatch } from 'react-redux'
import { updateProfile } from '../../service/userService.js'
import { IoMdArrowBack as GoBackIcon } from 'react-icons/io'
import { reset, updateUser } from '../../features/authSlice.js'

// bio
// location
// Job
// School
// 

export default function EditProfile({toggleEditProfile}) {
	const dispatch = useDispatch()
	const [fakeProfile,setFakeProfile] = useState()
	const { user } = useSelector(state => state.auth)
	const empty_p = {job:"",school:"",location:"", bio:""}
	const [profile,setProfile] = useState({job:"",school:"",location:"", bio:""})

	useEffect(() => {
		const values = {job:user.job || "",school:user.school || "",location:user.location || "", bio:user.bio || ""}
		setProfile(values)
		setFakeProfile(values)
	}, [user])


	function goBack () {
		if (isEmpty()){
			const sure = confirm('Do You Want to Dsicard Changes')
			if (!sure)
				return true
		}
		toggleEditProfile(false)
	}


	function isEmpty () {
		if (profile.job || profile.school || profile.location || profile.bio)
			return false
		else
			return true
	}


	const saveNewChange = async() => {
		console.log(isEmpty())
		if (!isEmpty() && profile != fakeProfile ) {
			const new_change = {...user,...profile}
			//  update proile Service
			const fresh_update = await updateProfile(new_change)
			if(!fresh_update.response  || fresh_update.response ){
				toast("User Updated !!",{ position:'top-center', type:'success' })
				dispatch(updateUser(new_change))
				localStorage.setItem("memoriex-auth",JSON.stringify(new_change))
			}
		}
		else {
			toast("Pls you have not made any change ..",{
				position:'top-center',
				type:'info'
			})
		}	
	}


	function changeIt (e) {
		setProfile((prev)=> ({...prev,[e.target.name]:e.target.value}))
	}


	return (
		<div className="h-full bg-gray-300 dark:bg-gray-600">
			<div className="bg-gray-100 w-full dark:bg-gray-800 flex dark:text-white border-b-2 border-gray-200 justify-between px-1 h-[10%] items-center ">	
				<GoBackIcon size={20} onClick={goBack}  className="hidden md:block " />
				<Close size={20} onClick={()=>toggleEditProfile(false)} className="md:hidden " />
				<h1>Edit Profile</h1>
				<p>{"  "}</p>
			</div>

			<div className="flex flex-col  justify-evenly ml-10 h-full w-1/3 bg-transparent">
				{/*Job/school/location/bio*/}
				<label htmlFor="bio"  className="flex flex-col">
					Bio :
					<textarea 
					 value={profile.bio}
					 onChange={(val)=> changeIt(val) }
					 name="bio" className="resize-none outline-gray-100 rounded-sm focus:outline-gray-300 border-none px-1">

					</textarea>
				</label>	

				<label htmlFor="Job" className="flex flex-col">
					Job :
					<input 
					 value={profile.job}
					 onChange={(val)=> changeIt(val) }
					 name='job' type="text" className="rounded-sm focus:outline-gray-300" />
				</label>

				<label htmlFor="School"  className="flex flex-col">
					School :
					<input
					 value={profile.school}
					 onChange={(val)=> changeIt(val) }
					 name='school' type="text" className="rounded-sm focus:outline-gray-300" />
				</label>

				<label htmlFor="Location" className="flex flex-col">
					Location :
					<input
					 value={profile.location}
					 onChange={(val)=> changeIt(val) }
					 name='location' type="location" className="rounded-sm focus:outline-gray-300" />
				</label>

				<button className={`px-2 py-1 absolute top-12 right-2 text-gray-50 rounded-sm shadow-md ${profile != fakeProfile ? 'bg-red-500' : "bg-blue-400" }`} onClick={saveNewChange} >Save Changes</button>

			</div>	

		</div>
	)
}