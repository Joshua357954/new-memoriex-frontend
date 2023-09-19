import React from 'react'
import EventCard from "./EventCard.jsx"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FetchOtherEvents } from '../../features/otherEventSlice.js'


export default function EventsAroundYou({showEvents}) {

	const dispatch = useDispatch()
	const { user } = useSelector( state => state.auth )
	const { isLoading,OtherEvents,isError } = useSelector( state => state.otherEvents )
	const scrollbar = 'md:scrollbar md:scrollbar-thin md:dark:scrollbar-track-gray-600 cursor-pointer  md:dark:hover:scrollbar-thumb-gray-500 md:scrollbar-track-gray-50 md:hover:scrollbar-thumb-gray-400'

	useEffect(() => {
		const cred = {userId:user?.id,venue:user?.location}
		dispatch(FetchOtherEvents(cred))
	},[])

	return (

		<div className={`${scrollbar} mt-3 max-h-44 h-44 flex flex-col overflow-x-auto w-full`}>
			
			{/*<h1 className="">Around You</h1>*/}

			<div className="w-full h-full flex">

				{ OtherEvents[0] ? 
					OtherEvents ?.map((event,idx) => { 
						return <EventCard key={idx} action={showEvents} title={event.name} imgUrl={event.img} location={event.venue} ownerId={event.UserId} date={event.dateTime} discription={event.discription} />
					})
					: <h1 className="m-auto"> No Event Available || Add more friends to see more .. </h1>
				}
	
			</div>
		</div>
	)
}