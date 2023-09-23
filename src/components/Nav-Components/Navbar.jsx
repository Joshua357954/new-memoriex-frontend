import React from 'react'
import { useState,useContext,useEffect } from 'react'
import { HiHome as Home } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { HiMenu as Menu } from  "react-icons/hi"
import { FiSettings as Settings } from 'react-icons/fi' 
import { BiSearch as SearchIcon } from 'react-icons/bi'
import { MdNotifications as Notify } from 'react-icons/md'
import { NavHide } from '../../context/hideNavContext.jsx' 
import { socketIO } from '../../context/socketContext.jsx'
import { FaUserFriends as Friends, FaFacebookMessenger as Message } from 'react-icons/fa'


export default function Navbar({changeScreen,onSettings,onSearch}) {
	const {hideNav} = useContext(NavHide)
	const { socket } = useContext(socketIO)
	const [chatNotifyCount,setChatNotifyCount] = useState(false)
	const fullIco = `text-xl md:text-2xl`
	const ico = 'text-xl md:text-2xl'
	const selectColor = 'text-sky-400'
	const routes = [
				{ icon:<Home  className={`${ico}`} />, name:'HOME' },
				{ icon:<Friends className={`${ico}`}/>, name:'FRIEND' },
				{ icon:<div className='relative'> <Message className={`${ico}`} /> { chatNotifyCount && <div className="w-4 h-4 flex justify-center items-center bg-red-700 rounded-full absolute text-sm md:text-md -top-1 -right-1 text-white ">1</div> } </div>, name:'MESSAGE' },
				{ icon:<Notify  className={`${ico}`}/>, name:'NOTIFY' }
			]

	const navigate = useNavigate()
	const [select,setSelect] = useState(routes[0].name)
	const tc = 'w-10 md:w-16 flex justify-center border-blue-400 pb-2 transition-all'
	

	//  Turn on and off chat notification

	useEffect(() => {
		socket.on('new-chat-arrival', () => {
			console.log("New Chat Don Come Go and check for your self")
			setChatNotifyCount(true)
		})
	}, [socket])



	//  func: Choose (A Route)
	function Choose(icon){
		setSelect(icon)
		switch(icon){
			case routes[0].name :
				return changeScreen(routes[0].name)
			case routes[1].name :
				return changeScreen(routes[1].name)
			case routes[2].name :
				setChatNotifyCount(false)
				return navigate('/chat')
			case routes[3].name :
				return changeScreen(routes[3].name)
			default:
				return alert("Defult is talking")
		}

	}

	return (
		<div className={`${hideNav?'hidden':''} relative dark:bg-gray-900 bg-white md:min-h-[60px] min-h-[70px] shadow-lg my-auto w-full grid grid-cols-6 grid-rows-1`}>
			
			<div className="lg:col-span-1 md:col-span-2 md:flex md:justify-start md:items-center text-xl text-gray-700 font-extrabold pl-2 absolute top-1 md:static dark:text-white "><p className="text-xl md:hidden">Memoriex</p> <p className="text-xl  hidden md:block">memoriex</p> </div>
	
			<div className="col-span-6 md:col-span-4 h-full flex w-full justify-between md:justify-evenly px-2 items-end  ">
				{/* Load HomePage Icons */}
				{ routes.map((route,idx) => <div key={idx} onClick={()=>Choose(route.name)} className={`${select==route.name ? `border-b-4 ${selectColor}`:'text-gray-400'} ${tc}`}>{route.icon}</div> ) } 
			</div>

			<div className="transition-all col-span-1 absolute top-1 right-2 px-2 gap-x-3 flex justify-evenly transition-all " >
				<SearchIcon onClick={()=>onSearch(true)} className="dark:bg-gray-700 dark:text-gray-100 text-gray-800 bg-gray-50 p-[3px] rounded-full text-2xl md:text-3xl lg:text-3xl"/>
				<Menu onClick={()=>onSettings(true)} className=" dark:text-gray-100 dark:bg-gray-700 text-gray-600 p-[2px] rounded-full text-2xl md:text-3xl lg:text-3xl"/>
			</div>

		</div>
	)

}
