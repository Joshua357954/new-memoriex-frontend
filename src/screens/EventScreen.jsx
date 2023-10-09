import React from 'react'
import { useState, useEffect } from 'react'
import UseTheme from '../hooks/useTheme.jsx'
import { useNavigate } from 'react-router-dom'
import { IoMdArrowBack as GoBackIcon } from 'react-icons/io'
import AddEvent from "../components/Events-Components/AddEvent.jsx"
import ViewEvent from "../components/Events-Components/ViewEvent.jsx"
import YourEvents from '../components/Events-Components/YourEvents.jsx'
import EventsAroundYou from '../components/Events-Components/EventsAroundYou.jsx'



export default function EventScreen() {
	const navigate = useNavigate()
	const [ VEP, setVEP ] = useState({state:false})
	const [toggleTheme,current] = UseTheme()
	const [openAddEvent,setOpenAddEvent] = useState(false)


	function closeAddEvent(){
		setOpenAddEvent(false)
	}
	
	function toggleViewEvent (val) {
		setVEP(val)
	}

	function goBack () {
		navigate('/')
	}


	return (
		<div className="relative w-screen h-screen  flex justify-center dark:bg-gray-800 bg-gray-50">
			<div className="overflow-y-auto px-2 h-full w-full pb-1 flex flex-col justify-start items-center md:w-3/5 lg:w-4/6 bg-white dark:bg-gray-600">
				
				{/* Navigation */}
				<div className="w-full bg-white dark:bg-gray-600">
					<div className="flex shadow-md bg-white justify-between h-14 w-full items-center px-2">
						<GoBackIcon onClick={goBack} className="px-2 text-4xl rounded-md bg-gray-100 dark:bg-gray-300  shadow-sm hover:shadow-md"/> 
						<h1 className="dark:text-gray-50">Events</h1>
						<div>{"   "}</div>
					</div>
				</div>

				{/* 2nd Nav */}
				<div className="w-full bg-white flex h-16 items-center justify-between px-2 w-full">
					<h1 className="text-gray-900 dark:text-gray-100">Your Events</h1>
					<button onClick={()=>setOpenAddEvent(true)} className="py-2 px-2 rounded text-sm font-semibold bg-sky-300">Add Events</button>
				</div>

				{/* My Events x scroll */}
				<YourEvents showEvents={toggleViewEvent} />


				{/* Events From Places Around You */}
				<EventsAroundYou showEvents={toggleViewEvent}  />

			</div>

			{ openAddEvent ?  <AddEvent closeAddEvent={closeAddEvent} />  : ""  }
			{ VEP.state ? <ViewEvent toggleView={toggleViewEvent} viewEventProps={VEP} /> : "" }
		</div>
	)
}