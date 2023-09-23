import '../style.css' 
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdLock as Lock } from 'react-icons/md'
import { LockApp } from '../context/lockChatContext.jsx'
import { socketIO } from '../context/socketContext.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdArrowBack as ArrowBack } from 'react-icons/io'
import NavBar from '../components/Nav-Components/Navbar.jsx'
import Friend from '../components/Friend-Components/Friend.jsx'
import Search from '../components/Search-Components/Search.jsx'
import ViewPostBox from '../components/Post-Components/viewPostBox.jsx'
import AddStory from '../components/Story-Components/AddStory.jsx'
import Utilities from '../components/Post-Components/Utilities.jsx'
import { useContext, useState, useEffect, useCallback } from 'react'
import Settings from '../components/Settings-Components/Settings.jsx'
import ViewStoryBox from '../components/Story-Components/ViewStoryBox.jsx'
import FriendRequests from '../components/Friend-Components/FriendRequest.jsx'
import Notification from '../components/Notification-Components/Notification.jsx'
import MainPostContainer from '../components/Post-Components/MainPostContainer.jsx'
import FriendSuggestion from '../components/Friend-Components/FriendSuggestion.jsx'


export default function PostScreen() {
	const store_name = 'memoriex-chat-lock-state'
	const [newStory,setNewStory] = useState(false)
	const [showPost,setShowPost] = useState(false)
	const [viewStory,setViewStory] = useState(false)
	const [openSearch,setOpenSearch] = useState(false)
	const [openSettings,setOpenSettings] = useState(false)
	const [currentScreen,setCurrentScreen] = useState('POST')
	const { socket } = useContext(socketIO)
	const { user } = useSelector( state => state.auth )
	const {chatLock,setChatLock,showBtn,setShowBtn} = useContext(LockApp)
	

	const toggleAddStory = (state) => {
		console.log("showing story ...")
		setNewStory(state)
	}


	const toggleViewStoryBox = (state) => {
		console.log("View story ...")
		setViewStory(state)
	}


	const toggleViewPost = (state) => {
		console.log("View Post ...",showPost)
		setShowPost(state)
		console.log("View Post2 ...",showPost)
	}


	const nextScreen = useCallback((screen) => {
			setCurrentScreen(screen)
		}
	)


	const OStoreName= 'memoriex-chat-lock-state'
	const store2 = 'lock-btn-state'


	const lockScreen = () => {
		setChatLock(true) 
		localStorage.setItem(OStoreName,'true')
	}

	// Socket io stuffs 
	// useEffect(() => {
	// 	socket.emit("setup", user)
	// 	socket.on('connected', (usersID) => {
	// 		// console.log("User ID OF : ",usersID)
	// 	})
	// }, [user])

	
	useEffect(() => {
		const lockState = localStorage.getItem(OStoreName) || 'false'
		setChatLock(JSON.parse(lockState))
	}, [])


	useEffect(() => {
		const lockBtnState = localStorage.getItem(store2) || 'false'
		setShowBtn(JSON.parse(lockBtnState))
	}, [])

	
	const showSearch = (bool) => { setOpenSearch(bool) }
	const showSettings = (bool) => { setOpenSettings(bool) }


	const absolute_full = 'absolute top-0 bottom-0 right-0 left-0'
	const scrollbar = 'hover:scrollbar scrollbar-thin dark:scrollbar-track-gray-700 cursor-pointer  dark:hover:scrollbar-thumb-gray-300 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-400'

	return (
		<main className="relative dark:bg-gray-800 bg-white  h-screen w-screen">

			<section className="flex flex-col bg-white grid-rows-6 dark:bg-gray-800 grid-cols-1 w-full h-full overflow-y-auto">

				<NavBar changeScreen={nextScreen} onSettings={showSettings} onSearch={showSearch} />

				<div className="h-[90vh] grid grid-cols-6 grid-rows-1 bg-white transition-all">
					
					<Utilities Settings={showSettings} />

				{/* Change Screens Conditionally */}
					{ (currentScreen=='POST'? <MainPostContainer toggleViewPost={toggleViewPost} toggleViewStoryBox={toggleViewStoryBox} toggleAddStory={toggleAddStory} /> : currentScreen=='FRIEND'? <Friend /> : currentScreen=='NOTIFY'? <Notification /> : <MainPostContainer/> ) }
			

					<div className="md:col-span-1 lg:col-span-2 row-span-1 bg-orange-300 hidden lg:grid grid-rows-6 h-full ">	
						
						<FriendSuggestion/>
						<FriendRequests/>

					</div>

				</div>

			{/* Lock Button */}
			{ showBtn ?
				<button onClick={lockScreen}
					className="flex flex-col justify-center items-center dark:bg-blue-400 bg-blue-300 p-2
					h-12 w-12 p-1 rounded-full absolute bottom-32 right-5">
					<Lock size={30} className="text-gray-800 dark:text-gray-100" />	
				</button>: ""
			}


			{/* Search Panel */}

			{  openSearch ? <Search onSearch={showSearch} /> : ""  }


			{/*  Settings Panel  */}
			{ openSettings ?
				<div className={`${absolute_full} bg-transparent w-screen h-screen flex justify-end `}>
					<div className="bg-gray-100 dark:bg-gray-700 h-full w-full md:w-[45vw] lg:w-[30vw] h-full ">
						<div className="w-full h-12 dark:bg-gray-700 bg-gray-300 flex  dark:text-gray-50 textjustify-start items-center space-x-4 px-1">
							<ArrowBack onClick={()=>setOpenSettings(false)} size={25} className="dark:text-gray-50 text-gray-800" />
							<p className="dark:text-gray-100 text-gray-900">Menu</p>
						</div>

						<div className={`md:${scrollbar} h-[87vh] w-full overflow-y-auto`}>	
							<Settings onSettings={showSettings}/>
						</div>
						
					</div>
				</div> : "" 
			}

		{/* View Post (Fake Screen) */}

		{ showPost ?
				<div className={`${absolute_full} flex justify-center items-center bg-black bg-opacity-[.7]` }>	
					<ViewPostBox toggleViewPost={toggleViewPost} />
				</div> : ""
			}


		{/* Modal to Create a New Story */}

			{ newStory ?
				<div className={`${absolute_full}`}>	
					<AddStory toggleAddStory={toggleAddStory} />
				</div> : ""
			}


		{/* Modal to View a User's Story */}

			{ viewStory ?
				<div className={`${absolute_full}`}>
					<ViewStoryBox toggleViewStoryBox={toggleViewStoryBox} />	
				</div> : ""
			}

			</section>
		</main>
	)
}
























































































































































































































































































































































































































































































































// const navigate = useNavigate()
	// const [currentUser, setCurrentUser,LogOut]= useAuth()
	// console.log(currentUser)

	// if(!currentUser || !currentUser===null || !currentUser===undefined)
	// 	return  <div className="w-screen"> 
	// 				<h1 className="text-2xl text-center text-indigo-300 mt-3">No User Yet , Loading ...</h1>
	// 				<button className="border-2 border-red-300 bg-white p-4 mt-4 ml-8 rounded hover:rounded-2"
	// 						onClick={()=> navigate('/Login')}> {'<- Login'}
	// 				</button>
	// 			</div>

	// return (
	// 	<div className='flex flex-col w-full justify-center gap-4 text-2xl'>
	// 		<span className='text-center mt-2 text-red-400-300'>{currentUser?.username}</span>
	// 		<p className="text-center text-orange-300">Hello My post people ....</p>
	// 		<button className="border-2 border-gray-400 bg-white p-4 mt-4 mx-auto rounded hover:rounded-2"
	// 				onClick={()=>LogOut()}>
	// 			LogOut
	// 		</button>

	// 	</div>

	// )