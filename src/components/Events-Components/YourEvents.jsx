import React from 'react'
import EventCard from "./EventCard.jsx"
import { useSelector,useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { FetchUserEvents } from '../../features/eventSlice.js'


export default function YourEvents({showEvents}) {
	const dispatch = useDispatch()
	const { isLoading, UserEvents, isError } = useSelector( state => state.events )
	const { user } = useSelector( state => state?.auth)
	const scrollbar = 'md:scrollbar md:scrollbar-thin md:dark:scrollbar-track-gray-600 cursor-pointer  md:dark:hover:scrollbar-thumb-gray-500 md:scrollbar-track-gray-50 md:hover:scrollbar-thumb-gray-400'

	useEffect(()=> {
		dispatch(FetchUserEvents(user?.id))	
	},[])

	return (
	<div className={`${scrollbar} bg-white max-h-44 h-44 flex overflow-x-auto w-full`}>
		{ UserEvents[0] ? 
			UserEvents?.map((event,idx) => { 
				return <EventCard key={idx} action={showEvents} title={event.name} imgUrl={event.img} location={event.venue} ownerId={event.UserId} date={event.dateTime} discription={event.discription} eventId={event.id} loggedUser={user?.id}/>

			})
			: <h1 className="m-auto"> You Dont Have Any Event Yet </h1>
		}
			
		</div>
	)
}