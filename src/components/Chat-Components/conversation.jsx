import React from 'react'
import Pix from './../../fonts/pix2.png'
import useAuth  from "./../../hooks/useAuth.jsx"
import { useState, useEffect, useContext } from 'react'
import { getUser } from '../../service/userService.js'
import { MobileChat } from './../../context/mobileChatState'
import { NewRecipient } from './../../context/recipientContext.jsx'

export default function conversation({data,myId}) {

	const [user,setUser] = useState('')
	const {mobileChatOpen, setChatOpen} = useContext(MobileChat)
	const {recipient, setRecipient} = useContext(NewRecipient)
	const [breakPoint,setbreakPoint] = useState(window.innerWidth)
	
	
	useEffect(() => {
		window.addEventListener('resize',()=>setbreakPoint(window.innerWidth))
	}, [window.innerWidth])


	// Ui Render
	return (
		<div className={`flex w-full px-2 py-3 dark:text-gray-300  rounded-sm ${breakPoint>520 && breakPoint<628 ? "justify-center":'justify-between'} items-center h-[5rem] cursor-default`} onClick={()=>{
			// Open conversation
			setRecipient({'id':data?.id,'convId':data?.convId,'username':data?.username,img:data?.pix})
			setChatOpen(true)
		}}>  

			<div className="flex bg-transparent h-full justify-between items-center">
				<div className="flex-col w-14 h-14 mx-2 md:mr-2 flex justify-center items-center relative rounded-full border-[3px] border-gray-300">
					<img src={Pix} alt="chat-name" />
					<div className="bg-blue-200 rounded-full flex w-4 h-4 m-auto absolute bottom-[-2px] right-[-2px]"></div>
				</div>

				<div className={`flex-col justify-around flex h-full transition-all`}>
					<h2 className="truncate px-1">{data?.username|| 'No Name'}</h2>
					<p className="text-xs font-extralight break-words truncate px-1">{data?.lastMessage?.text}</p>
				</div>
			</div>

			<div className={`flex-col justify-between items-center ${breakPoint>520 && breakPoint<630 ? "hidden":'flex'}  h-full`}>
				<p className="flex flex-col justify-evenly items-center  h-full">{data?.lastMessage?.createdAt.split('T')[1].split(':')[0] } </p>
				{ parseInt(data?.id) != myId && data['lastMessage']?.read ? "" : <span className="py-1 px-2 bg-orange-300 m-auto rounded-full text-sm text-white">1</span> }
			</div>
		</div>
	)
}