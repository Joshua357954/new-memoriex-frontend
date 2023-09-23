import React from 'react'
import Pix2 from '../../fonts/pix2.png'
import { useState,useEffect } from 'react'
import { getUser } from '../../service/userService.js'
import ReloadFriends from '../../utils/reloadFriends.jsx'
import { AcceptRequest } from '../../service/friendService.js'
import { DeleteFriend } from '../../service/friendService.js'
import { BsCheckLg as Check, BsTrashFill as Trash } from 'react-icons/bs'


export default function friendRequestCard({friendId,reqId,loading,loggedUser,userId}) {
	
	const [reload] = ReloadFriends()
	const [name,setName] = useState("")

	useEffect(()=> {  
		async function pickUser(){
			const DUser = await getUser(friendId)
			setName(DUser?.username || "Loading...")
		}
		pickUser()
	},[friendId])

	const acceptUrRequest = async() => {
		console.log("These are the nums For ACR : reqId -",reqId,loggedUser)
		const event = await AcceptRequest(reqId,loggedUser)
		console.log(event)
		reload()
	}

	const declineRequest = async() => {
		const state = await DeleteFriend(friendId,userId)
		console.log(state)
		reload()
	}

	return (
		<div className="w-full h-16 dark:bg-gray-600 bg-gray-50 mb-[5px] rounded-md  flex justify-between px-[6px] items-center">
			<div className="h-[90%] rounded-full"> 
				<img src={Pix2} alt="User Img" className="w-12 p-1 h-full rounded-full"/> 
			</div>

			<p className="dark:text-gray-100 text-gray-900">{name}</p>

			<div className="flex justify-between mr-1 space-x-2 w-19 dark:text-gray-50 text-gray-800">
				<div onClick={loading ? "" : acceptUrRequest} className="px-3 py-3 rounded-md dark:bg-gray-600 shadow bg-gray-100 cursor-pointer"><Check className="text-blue-300"/></div>
				<div onClick={loading ? "" : declineRequest} className="px-3 py-3 rounded-md dark:bg-gray-600 shadow bg-gray-100 cursor-pointer"><Trash className="text-red-400"/></div>
			</div>	

		</div>	
	)
}