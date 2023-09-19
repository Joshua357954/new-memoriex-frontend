import React from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { BsTrashFill as Trash } from 'react-icons/bs'
import EventReloader from '../../utils/reloadEvents.jsx'

import { deleteUserEvent } from '../../service/eventService.js'


export default function EventCard(props) {

	const [ reloadAllEvents ] = EventReloader()
	const {action,title,imgUrl,location,ownerId,date,discription,eventId,loggedUser} = props

	const { user } = useSelector( state => state.auth )
	const own = loggedUser == ownerId
	
	function openEventFull () {
		const new_prop = {state:true,...props}
		action(new_prop)
	}

	async function deleteEvent () {
		const deleteSuccess = await deleteUserEvent({eventId,userId:loggedUser})
		if (deleteSuccess.status){
			toast("Deleted Event Successfully",{type:'info',position:'top-center'})
			reloadAllEvents()
		}else{
			toast("An Error Occured, Try Again",{type:'error',position:'top-center'})
		}
	}

	return (
		<div className="border-2 border-gray-300 relative flex flex-col justify-start items-left  h-36 rounded-t-md mr-1">
			<img  className="rounded-t-md bg-cover object-cover" src={imgUrl} className="h-20 w-full mx-1 lg:w-5/6 self-center" alt="Event" />
			<div onClick={openEventFull} className="px-1 dark:text-gray-200">	
				<p className="truncate dark:text-white text-sm">{title}</p>
				<p className="truncate text-sm">{date}</p>
				<p className="truncate text-sm">{location}</p>
			</div>
			{own ? <div onClick={deleteEvent} className='dark:bg-gray-100 w-7 bg-gray-300 px-3 rounded-md'> <Trash  className='absolute top-2 dark:bg-gray-500 bg-gray-300 px-1 hover:text-red-500 dark:hover:text-red-500  right-2  text-xl text-gray-900 dark:text-gray-200' /></div> :  "" }
		</div>
	)
}