 import '../style.css'
import React from 'react'
import Pix2 from './../fonts/pix3.png'
import Pix5 from './../fonts/pix2.png'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import useAccounts from '../hooks/useAccounts.jsx'
import { updateUser } from '../features/authSlice.js'
import { DotLoader,BeatLoader } from 'react-spinners'
import { useDispatch , useSelector } from 'react-redux'
import { updateProfile } from '../service/userService.js'
import { MdOutlineFileDownload as Download, MdClose as Close } from 'react-icons/md'


export default function ViewImgModal({showImage,image}) {
	const dispatch = useDispatch()
	const [myImg,setmyImg] = useState(null)
	const [ loading, setLoading ] = useState(false)
	const { user } = useSelector( state => state.auth )
	const [getCurrentAccount,addAccount,removeAccount,logOutUser,getStore,setCurrentAccount] = useAccounts()


	useEffect(() => {
		console.log(image)
	}, [])

	const chooseImg = (e) => {
		const file = e.target.files[0]
		const reader = new FileReader()
		reader.onload = (event) => {
			setmyImg(event.target.result)
		}
		reader.readAsDataURL(file)
	}

	function saveImage () {
		//  Check if image is profile or cover photo
		const new_name = image.name == 'Profile' ? 'profilePix' : 'coverPhoto'
		const Updated = { ...user, [new_name]:myImg }
		console.log("Updated In Image : ",Updated)
		setLoading(true)
		//  Update Image Local State
		dispatch(updateUser(Updated))
		//  Update Local Storage
		removeAccount(Updated)
		addAccount(Updated)
		// Update Image in DataBase
		setLoading(false)
		toast(`${image.name} Updated Successfully ..`,{position:"top-center",type:'success'})
		updateProfile(Updated)
		
	}

	const downloadImage = () => {
		console.log("Downloading Image")
	}

	return (
		<div className='w-full h-full bg-white dark:bg-gray-900'>

			{/* Navigation */}
			<div className="select-none  flex justify-between px-2 items-center h-16 bg-gray-200 dark:bg-gray-600 w-full" >
				<div className="flex pl-1 cursor-pointer space-x-3 items-center">	
					<Close onClick={()=>showImage(false)} className="dark:text-white"  size={20} />
					<h1 className="text-md dark:text-gray-50 text-gray-900">{image.name}</h1>
				</div>

				{ image.me ?
				<div  className="flex space-x-3 cursor-pointer items-center">

					{ myImg ?
						<button onClick={saveImage} className="bg-red-400 text-white px-3 py-2 rounded-sm focus:outline-none">Save</button>
					:  <div onClick={downloadImage} className="text-2xl bg-gray-300 p-2 rounded-md"><Download/></div>}	

					<div  className="w-20 bg-blue-400 p-2 mr-2 rounded-sm relative flex justify-center text-center text-white">Change
						<input className="w-20 absolute top-0 opacity-0 bottom-0 right-0"
						type="file" onChange={chooseImg}  />
					</div>

				</div> : <div>{"   "}</div> }

			</div>

			<div className="w-full h-full flex justify-center items-center">
				{loading ? 
					<DotLoader size={40}/>
					:	
					<img src={ myImg ?  myImg : image.file ? image.file : Pix2} className="rounded-sm h-[70%] w-full md:w-[80%] bg-cover border-b-2 border-gray-400" alt="" />
				}
			</div>
			
		</div>
	)
}