import React from 'react'
import moment from 'moment'
import Pix from '../fonts/no-user-avatar.png'
import { toast } from 'react-toastify'
import Pix1 from '../fonts/no-user-avatar.png'
import UseTheme from '../hooks/useTheme.jsx'
import { useState,useRef,useEffect } from 'react'
import ViewImage from '../modals/ViewImgModal.jsx'
import PostModal from '../modals/makePostModal.jsx'
import { getUser } from  '../service/userService.js'
import { getMyPost } from '../service/postService.js'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdArrowBack as ArrowBack } from 'react-icons/io'
import PostCard from '../components/Post-Components/PostCard.jsx'
import { BiCopy , BiMessageSquareAdd as Add } from 'react-icons/bi'
import Utilities from '../components/Post-Components/Utilities.jsx'
import PostButton from '../components/Post-Components/PostButton.jsx'
import ViewPostBox from '../components/Post-Components/viewPostBox.jsx'
import EditProfile from '../components/Profile-Components/EditProfile.jsx'
import { BsFillCameraFill as Camera, BsFilePost as PostIcon } from "react-icons/bs"
import { FaUserFriends as Friends, FaBriefcase as Work, FaClock as Joined } from 'react-icons/fa'
import { MdModeEdit as Edit, MdSchool as School, MdLocationOn as Location } from 'react-icons/md'


export default function ProfileScreen() {
	const { slug } = useParams()
	const navigate = useNavigate()
	const profileScroll = useRef()
	const [toggleTheme,current] = UseTheme()
	const [viewImg,setViewImg] = useState(false)
	const [ userPost,setUserPost ] = useState([])
	const [otherUser,setOtherUser] = useState([])
	const [showPost,setShowPost] = useState(false)
	const [makePost,setMakePost] = useState(false)
	const { user } = useSelector(state => state.auth)
	const [ isLoaing, setIsLoading ] = useState(false)
	const [otherUserPost,setOtherUserPost] = useState([])
	const [openEditProfile,setOpenEditProfile] = useState(false)


	function isMe () {

		const LC = (letter) => letter.toLowerCase()
		const INT = (string) => parseInt(string)

		if(!slug || slug == undefined )
			return true
		else if ( slug && LC(slug) == LC(user.username) || slug && INT(slug) == user.id )
			return true
		else 
			return false
	}

	const [currentImg,setCurrentImg] = useState({name:'Profile',file:"",me:isMe()})


	const copyLink = () => {
		const userLink = window.location.href
		toast(userLink)
	}


	function openPostModal(action){
		setMakePost(action)
	}


	function openImage(action,img=""){
		setViewImg(action)
	

	}function currentPhoto (state) {
		return  !user.profilePix && !user.coverPhoto ? "" : state=='Profile' ? user.profilePix : user.coverPhoto
	}


	function selectImg(state){
		console.log("My Current Photo : ",currentPhoto(state))
		setCurrentImg({name:state,file:currentPhoto(state),me:isMe()})
		console.log("Setting Current : ",!user.profilePix || !user.coverPhoto ? "" : state=='Profile' ? user.profilePix : user.coverPhoto)
		setViewImg(true)
	}

	const toggleEditProfile = (state) => {
		setOpenEditProfile(state)
	}

	const toggleViewPost = (state) => {
		console.log("View Post ...",showPost)
		setShowPost(state)
	}


	const absolute_full = 'absolute top-0 bottom-0 right-0 left-0'
	const scrollbar = 'md:scrollbar md:dark:scrollbar-track-gray-600 md:dark:scrollbar-thumb-gray-600  md:dark:hover:scrollbar-thumb-gray-400 md:scrollbar-thin md:scrollbar-track-white md:scrollbar-thumb-gray-300'
	

	//  Get the OtherUser 
	useEffect(() => {
		if (slug) {
			setIsLoading(true)
			console.log(slug)
			async function getOtherUser() {
				const state = await getUser(slug)
				console.log("Other User From ProfileScreen : ", state)
				setOtherUser(state)
			}
			getOtherUser()
			setIsLoading(false)
		}
	}, [])


	//  Get Other-Users Post
	useEffect(() => {
		async function getUsersPosts() {
			const state = await getMyPost(isMe() ? user?.id : otherUser?.id)
			console.log(" Post From ProfileScreen : ", state)
			return setUserPost(state) 
		}
		getUsersPosts()
		
	}, [user,otherUser])

	if (isLoaing){
		return <h1 className="text-center text-gray-700 text-lg"> Loaing Your Profile </h1>
	}

	return (
		<div className=" h-screen w-screen flex dark:bg-gray-700 bg-gray-50 justify-center overflow-hidden items-center">
			<div className="transition-all relative h-full bg-white dark:bg-gray-800 w-full md:w-3/5">	
				
				{/* Nav Bar*/}
				<div className="flex pl-1 justify-start h-14 items-center gap-x-4 md:gap-x-6 dark:bg-gray-600 bg-gray-100 w-full">
					<ArrowBack className="dark:text-gray-50" onClick={()=>navigate('/')} size={25}/>
					{<p className="cursor-pointer dark:text-gray-100 capitalize">{isMe() ? user?.username : otherUser?.username }</p>}
				</div>
			<div ref={profileScroll} className={`overflow-y-auto h-full bg-transparent w-full ${scrollbar}`}>
					
					{/* CoverPhoto Profile Img / bio*/}
					<div className="flex flex-col bg-transparent h-32 justify-center w-full items-center ">

						<div style={{backgroundImage:`url(${otherUser?.coverPhoto || user.coverPhoto || ''})`,backgroundSize:'cover'}} className="mt-1 relative bg-gray-50 w-4/5 md:w-4/6 rounded-tl-md rounded-tr-md md:rounded-tr-lg md:rounded-tl-lg h-28">
							
							{/*<span className="cursor-pointer absolute bottom-3 right-3 bg-black h-7 w-7 dark:bg-white dark:bg-black flex justify-center items-center text-xl rounded-full text-white">+</span>*/}
							<span  onClick={()=>selectImg("Cover Photo")} className="absolute bottom-3 right-3 p-1 rounded-full bg-black dark:bg-gray-300"> { isMe() ? <Camera className="dark:text-black text-gray-100"/> : <h1 className="text-3xl text-white font-extrabold">--</h1>} </span>
						
							<div onClick={() => selectImg('Profile')} className=" w-32 h-32 absolute left-[30%] -bottom-1/2 flex justify-center items-center border-red-400 rounded-full dark:bg-gray-900 bg-gray">	
								<img src={otherUser.profilePix || user.profilePix || Pix1 } className="m-1 w-full h-full rounded-full" alt="Profile pix" />
								{isMe() ? <span className="absolute bottom-2 right-1 p-1 rounded-full bg-black  dark:bg-gray-300"><Camera className="text-gray-100 dark:text-black"/> </span> : "" }
							</div>	

						</div>

					</div>

					{/* Name */}
					<div className='cursor-pointer w-[95%] bg-transparent mt-14 dark:text-gray-100 text-center'>{isMe() ? user?.username : otherUser?.username }</div>

					{/* Bio and Others  */}
					<div className="cursor-pointer flex flex-col justify-start items-center h-full w-full bg-transparent">	
						<div className="w-[60%] text-xs dark:text-gray-200 text-gray-700 dark:bg-gray-800 pt-2 h-20 max-h-20 text-center text-md">
							{isMe() ? user?.bio : otherUser?.bio }
						</div>

						{/* Utilities */}
						<div className='flex space-x-4 pt-2'>
							
							{isMe() ? <button onClick={() => navigate('/')} className="flex justify-start bg-blue-500 text-gray-50 py-1 rounded-md round px-2 space-x-3 items-center">  <p>Add Story</p></button> : ""}
							{isMe() ? <button onClick={() => toggleEditProfile(true)} className="flex justify-start bg-blue-500 text-gray-50 py-1 rounded-md round px-2 space-x-3 items-center"> <Edit/> <p>Edit</p> </button> : ""}		
							{isMe() ? "" : <button className="flex justify-start bg-blue-500 text-gray-50 py-1 rounded-md round px-2 space-x-3 items-center"> <Add/> <p>Add Friend</p> </button>}
							
							<button onClick={copyLink} className="bg-gray-200 border-2 border-gray-300 text-xl rounded-md px-3 py-1"> <BiCopy/> </button>
						</div>	

						{/* User Info */}
						<div className="cursor-default flex flex-col space-y-2 items-start text-xs pt-5 pl-3 w-full">
							<div className="flex dark:text-gray-100 text-gray-900 items-center  gap-x-4"> <Work className="text-lg text-gray-800 ml-1"/> <p>{ user?.job || "Not Set" }</p> </div>
							<div className="flex dark:text-gray-100 text-gray-900 items-center gap-x-4"> <School className="text-2xl text-gray-800"/> <p>{ user?.school || "Not Set" }</p> </div>
							<div className="flex dark:text-gray-100 text-gray-900 items-center gap-x-4"> <Location className="text-2xl text-gray-800"/> <p>{ user?.location || "Not Set" }</p> </div>
							<div className="flex dark:text-gray-100 text-gray-900 items-center gap-x-4"> <Joined className="text-lg text-gray-800 ml-1"/> <p>{moment(user?.createdAt).format('ll')}</p> </div>
						</div>
				
						{/* Friends / Memoriex */}
						<div className="cursor-pointer flex w-full justify-between px-3 mt-3"> 
							<div className="flex space-x-3">
								<Friends className="dark:text-gray-100 text-xl text-gray-900"/> 
								<p className="text-sm text-gray-900 dark:text-gray-100">Friends (229)</p> 
							</div>
							<span className="text-xs text-blue-500 dark:text-blue-600">see all</span>
						</div>

						{/* Post Button */}
						{isMe() ? <div className="w-full bg-transparent mt-3">	
							<PostButton createPost={openPostModal}/>
						</div> : ""}	

						{/* Posts */}

						<div className="flex justify-center items-center space-x-2 bg-gray-100 dark:bg-gray-600 dark:text-gray-200 w-28 py-2 px-2 rounded-md my-2"> 
							<p>All Posts</p> <PostIcon/> 
						</div> 		

						<div className="w-full mt-2">
							
							{ userPost[0] ?  userPost?.map((post,idx) => {
								return <PostCard PCRef={profileScroll} toggleViewPost={toggleViewPost}  userId={user?.id} PostId={post.id} text={post.text}
									postUserId={post.UserId} imgUrl={post?.imageUrl} reactions={post.Reactions} comments={post.Comments} key={idx}
									feeling={post.feeling} />
								})

							:  <h1> No Post</h1>

							}

							{/* Filler Div (Lapsys) */}
							<div className="w-full bg-transparent h-16"></div>
						</div>
					</div>

				</div>

			{/* Make New Post Modal On Profile Screen */}
			{ makePost ?
				<PostModal PREF={profileScroll} action={openPostModal} /> : ""
			}

			{/* View Post (Fake Screen) */}
			{ showPost ?
					<div className={`${absolute_full} flex justify-center items-center bg-black bg-opacity-[.7]` }>	
						<ViewPostBox toggleViewPost={toggleViewPost} />
					</div> : ""
				}

			{/* Modal For Viewing Images */}
			{
				viewImg ?
					<div className='absolute top-0 left-0 bottom-0 right-0 bg-black'>
						<ViewImage showImage={openImage} image={currentImg}  />
					</div> : ""	
			}

			{/* Edit Profile */}	
			{
				openEditProfile ?
					<div className='transition-opacity bg-white absolute top-0 left-0 bottom-0 right-0 '>
						<EditProfile toggleEditProfile={toggleEditProfile}/>
					</div> : ""	
			}


			</div>	

		</div>
	)
}