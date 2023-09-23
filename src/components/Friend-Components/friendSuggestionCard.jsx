import React from 'react'
import Pix2 from '../../fonts/pix2.png'
import ReloadFriends from '../../utils/reloadFriends.jsx'
import { AddNewFriend } from "../../service/friendService.js"
import {MdNotifications as Notify} from 'react-icons/md'

export default function friendRequestCard({loggedUser,name,loading,id,removeItem}) {
	
	const [reload] = ReloadFriends()
	
	async function makeFriend () {
		const details = await AddNewFriend(id,loggedUser)
		console.log("Details for d req : ",loggedUser,id)
		console.log(details)
		reload()
	}

	const doNothing = () => ""

	return (
		<div className="w-full h-16 dark:bg-gray-600 bg-gray-50 mb-[5px] rounded-md  flex justify-between px-[6px] items-center">
			
			<div className="h-[90%] border-2 border-blue-100 rounded-full"> 
				<img src={Pix2} alt="User Img" className="w-14 p-1 h-14  rounded-full"/> 
			</div>

			<p className="dark:text-gray-100 text-gray-900">{name}</p>

			<div onClick={loading ? doNothing  : makeFriend} className="cursor-pointer font-semibold dark:text-gray-100 dark:bg-sky-400 text-gray-900 bg-sky-300 text-xs py-3 px-2 rounded-md ">
				Add Friend
			</div>

		</div>
	)
}