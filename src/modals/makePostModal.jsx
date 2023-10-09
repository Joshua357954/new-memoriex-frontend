import React from 'react'
import Pix2 from './../fonts/pix3.png'
import Pix5 from './../fonts/pix2.png'
import { MdClose } from 'react-icons/md'
import 'react-toastify/dist/ReactToastify.css'
import {IoMdImages as ImgPix } from 'react-icons/io'
import { createPost } from '../features/postSlice.js'
import { useSelector,useDispatch } from 'react-redux'
import { newPost } from '../service/postService.js'
import {NavHide} from '../context/hideNavContext.jsx'
import { ToastContainer, toast } from 'react-toastify'
import { useState, useEffect, useRef, useContext } from 'react'

export default function makePostModal({PREF,action}) {	
	let scrollTop = ""
	const dispatch = useDispatch()
	const {setHideNav} = useContext(NavHide)
	const [imgName,setImgName] = useState("")
	const {user} = useSelector(state => state.auth)


	const [postData,setPostData] = useState({
										UserId:user.id,
										type:'Friends',
										bgColor:null,
										feeling:null,
										imageUrl:null,
										imgName:null,
										text:""
									})
	

	function chooseImage(e) {
		const file = e.target.files[0]
		commitData('imgName',file.name)
		const reader = new FileReader()
		reader.onload = (event) => {
			commitData('imageUrl',(event.target.result))
		}
		reader.readAsDataURL(file)

	}

	function isPostDataEmpty(){
		let state = true
		if (!postData.imageUrl && !postData.text && !postData.feeling && !postData.bgColor){
			state = false
		}
		return state
	}

	function commitData(name,value){
		setPostData((prev) => ({...prev,[name]:value}))
	}


	function createNewPost(){
		if (!postData.text){
			toast("Please Add a Photo Or Text to Post 😊")
		}
		// (Main)  Make or Create Post Functionality
		else {
			newPost(postData)
			closePostModal()
		}
	}


	function clearimageUrl(){
		commitData('imageUrl',null) 
		commitData('imgName',null)
	}


	function lockScroll(){
		console.log("Scrolling : ",scrollTop)
		PREF.current.scrollTo(0,scrollTop)
	}

	const closePostModal = (state) => {
		if (isPostDataEmpty() && state ){
			const sure = confirm("Are You Sure You Want To Discard This Post ?")
			if (!sure)
				return 
		}		
		action(false)
		setHideNav(false)
		PREF.current.onscroll = "Empty The Function"
		
	
	}
	const BlockScroll = () => {
		scrollTop = PREF.current.scrollTop
		PREF.current.onscroll = lockScroll
	}
	BlockScroll()

	return (
		<div className=" transition-all absolute top-0 left-0 bottom-0 right-0 dark:bg-gray-800 bg-gray-50 flex flex-col justify-center items-center ">
			<div className="relative w-full h-full">
				<div className="h-14 shadow-sm dark:bg-gray-500 bg-gray-50 px-2  flex justify-between items-center">
					<div className="flex space-x-4">	
						<MdClose size={20} onClick={()=>closePostModal(true)} className="dark:text-gray-100 text-gray-800"/>
						<p className="dark:text-gray-100 text-gray-800 focus:outline-none">Create Post</p>
					</div>
					<button onClick={createNewPost} className="dark:text-blue-400 text-blue-500 font-bold">POST</button>
				</div>	

				<div className="flex py-1 justify-start items-center space-x-2 px-1">
					<div className="w-14 h-14 items-center rounded-full border-2 border-emerald-500 mr-1  ">
						<img src={Pix2} alt="profile pix" className="w-full h-full p-[2px] rounded-full" />
					</div>


					{/* Post Type Dropdown */}
					<div className="dark:bg-gray-600 dark:text-gray-200 bg-gray-300 p-1 rounded-md">
						<select onChange={({target}) => commitData('type',target.value)} className="bg-transparent flex focus:outline-none"name="api-verbs">
							<option value='Friends'>Friends</option>
							<option value='Public'>Public</option>
							<option value='Private'>Private</option>
							<option value='Memory'>Memory</option>	
						</select>
					</div>
				</div>	


				{/* Post Text */}
				<textarea className="mx-1 w-[96%] resize-none border-2 mt-2 dark:border-gray-400 border-gray-100 px-1 pt-2 dark:bg-gray-600 dark:text-gray-50 text-gray-700 text-sm bg-gray-50 focus:border-gray-200 dark:placeholder-gray-100 placeholder-gray-400 h-32 rounded-sm focus:outline-none"
				placeholder="What is on your mind ? "
				value={postData.text}
				onChange={({target})=> commitData('text',target.value)} 
				type="text" />


				{/* Background Color imageUrl Choose*/}
				<div className="w-full px-2 mt-3 flex flex-col ">
					<div className="dark:bg-gray-600 dark:text-gray-200 bg-gray-300 p-1 w-44 mt-1 rounded-md">
						<select disabled={ postData.imageUrl ? true : false } onChange={({target}) => commitData('bgColor',target.value)} className="bg-transparent flex focus:outline-none"name="api-verbs">
							<option value='Normal'>Backgrounds</option>
							<option value='Red'>Red 🍎</option>
							<option value='Blue'>Blue 💧</option>
							<option value='Green'>Green 🍏</option>
							<option value='Gray'>Gray 🌑</option>
							<option value='yellow'>Yellow 🌟</option>
								
						</select>
					</div>


					{/* Choose imageUrl */}
					<div className="flex items-center mt-2 space-x-2 relative cursor-pointer" >
						
						<ImgPix className="text-green-600 "/> 
						
						<p className="text-sm md:text-md dark:text-gray-100"> Photos/Videos</p> 
						
						<input type="file" onChange={chooseImage} className="absolute top-0 opacity-0 focus:outline-none left-5 w-36 h-3" />
						
						<p className="absolute left-32 top-0 w-28 truncate">{postData.imgName}</p>
						
						{ postData.imageUrl  ? <MdClose onClick={clearimageUrl} className="absolute right-16 top-1" /> : "" }
					
					</div>
					

					{/* Feelings Dropdown */}
					<div className="dark:bg-gray-600 font-extralight dark:text-gray-200 bg-gray-300 p-1 w-44 mt-2 rounded-md">
						<select onChange={({target}) => commitData('feeling',target.value)} className="bg-transparent flex focus:outline-none"name="api-verbs">
							<option value='Good'>Feeling/Activity 😊</option>
							<option value='Loved'>Feeling 💕</option>
							<option value='Angry'>Feeling 😠</option>
							<option value='Sad'>Feeling 😴</option>	
							<option value='Blessed'>Feeling 😇</option>	
							
						</select>
					</div>

				</div>

				{/* Create Post Button*/}
				<button className="w-full mt-4 mx-auto py-2 bg-blue-400 text-center focus:outline-none dark:text-gray-50 text-gray-800">POST</button>
				
				{postData.imageUrl ? <div className="absolute w-56 h-56 rounded-md top-7 left-9">	
					<img src={postData.imageUrl} />
				</div> : ""}

			<ToastContainer />

			</div>
			
		</div>
	)
}