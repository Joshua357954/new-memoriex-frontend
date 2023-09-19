import React from 'react' 
import { useState } from 'react'
import { toast } from 'react-toastify'
import Pix1 from '../../fonts/pix1.png'
import { useSelector } from 'react-redux'
import { MdClose as Close } from "react-icons/md"
import EventReloader from '../../utils/reloadEvents.jsx'
import { createEvent } from '../../service/eventService.js'
import { BsPlusLg as Plus, BsCalendarPlusFill as AddEventIcon } from "react-icons/bs"

export default function AddEvent({closeAddEvent}) {
	const image = ""
	const { user } = useSelector( state => state.auth )
	const [ reloadAllEvents ] = EventReloader()
	const [eventForm,setEventForm] = useState({title:"",discription:"",
											location:"",dateTime:""})
	const [photoImg,setPhotoImg] = useState("")

	const isChangeMade = () => {
		if ( !photoImg  && !eventForm.title  && !eventForm.discription  && !eventForm.location &&  !eventForm.dateTime)
			return false
		return true
	}

	const makeNewEvent = async() => {
		// alert(JSON.stringify(eventForm),photoImg)
		const cred = {...eventForm,photoImg,UserId:user?.id}
		const CED = await createEvent(cred)
		
		if (!isChangeMade() || !eventForm.title){
			return toast("Plesae make a Change and try again",{icon:'✍️',position:'top-center'})
		}

		if (CED.status){
			toast("Added Event Successfully",{type:'info'})
			setPhotoImg("")
			setEventForm({title:"",discription:"",location:"",dateTime:""})
			reloadAllEvents()
		}else {
			toast("An Error Occured",{type:'warning'})
		}
		

	}

	function setFormData (e) {
		setEventForm((prev) => ({...prev,[e.name]:e.value}))
	}

	const selectImage = (e) => {
		const file = e.target.files[0]

		const reader = new FileReader()
		reader.onload = (event) => {
			setPhotoImg(event.target.result)
		}
		reader.readAsDataURL(file)
	}


	function closeIt () {
		console.log(isChangeMade());
		if (isChangeMade()){
			const sure = confirm("Are you sure you sure you want to discard this event")
			if (!sure) 
				return 
		}		
			// Else do Nothing ...
		closeAddEvent()


}


	

	return (
		<div className="absolute flex justify-center top-0 left-0 right-0 bottom-0 bg-gray-300 dark:bg-gray-800">
			<div className="w-full select-none h-full flex flex-col justify-start items-center dark:bg-gray-700 bg-gray-200 md:w-2/3 lg:w-3/6">	

				{/* Navigation */}
				<div className="flex shadow-md justify-between h-14 w-full items-center px-2">
					
					{ photoImg ? <div className="relative py-2 px-3 cursor-pointer bg-gray-100 flex justify-center items-center rounded-md font-[500] text-xl ">
						<Plus /> <input type="file" className='absolute top-3 focus:outline-none right-2  w-6 opacity-0' onChange={selectImage}/>
					</div> : <h1>{"  "}</h1> }
			
				<h1 className="dark:text-gray-50 flex space-x-2 items-center">Add New Event <AddEventIcon className="pl-1 text-2xl  dark:gray-gray-200" /> </h1>
				<Close onClick={closeIt} className="px-2 text-4xl rounded-md dark:bg-gray-500 dark:text-white bg-gray-300 shadow-sm hover:shadow-md"/> 
				
				</div>


				{/* Image */}
				<div className="flex justify-center  items-center rounded-md bg-gray-300 md:w-[40%] w-[50%] h-[40%] mt-2">	
					{ photoImg ?
					<img className="rounded-md bg-cover w-full h-full" src={photoImg} alt="Photo To Change" />
					: 
					<div className="relative cursor-pointer py-4 px-5 cursor-pointer bg-gray-100 dark:bg-gray-200 flex justify-center items-center rounded-md font-bold text-3xl ">
						<Plus /> <input onChange={selectImage} type="file" className='absolute top-3 focus:outline-none right-2  w-6 opacity-0'/>
					</div>
					}
				</div>

				{/* Title */}
				<div className="w-[80%] mt-2" >
					<input name="title" value={eventForm.title} onChange={({target}) => setFormData(target)}
					 className="dark:caret-white w-full placeholder-gray-800 dark:placeholder-gray-100 focus:outline-none text-md pl-1  py-1 border-2 rounded-sm border-gray-300 dark:bg-gray-700" type="title" placeholder="💡 Event Title"/>
				</div>

				{/* Discription */}
				<div className="w-[80%] h-14 mt-1">	
					<textarea name="discription" value={eventForm.discription} onChange={({target}) => setFormData(target)}
					 className="dark:caret-white placeholder-gray-800 dark:placeholder-gray-100 rounded-sm w-full resize-none h-full border-2 border-gray-300 dark:bg-gray-700 focus:outline-none p-1 outline-none"
					 placeholder="How is this event gonna be like ?">
					</textarea>
				</div>	

				{/* Location and Date */}
				<div className="flex w-[80%] justify-between my-1 ">	
					<input name="location" value={eventForm.location} onChange={({target}) => setFormData(target)}
					 className="dark:caret-white w-24 placeholder-gray-800 dark:placeholder-gray-100 focus:outline-none text-md pl-1  py-1 border-2 rounded-sm border-gray-300 dark:bg-gray-700"
					 placeholder="Location" />
					
					<input name="dateTime" type="date"  value={eventForm.dateTime} onChange={({target}) => setFormData(target)} className="dark:caret-white select-none focus:outline-none border-2 border-gray-300 dark:bg-gray-700 px-1 py-1 rounded-sm " />
				</div>	

				{/* Create Button */} 
				<button onClick={makeNewEvent} className="w-[80%] font-bold rounded-sm py-2 my-1 text-center bg-blue-400">
						Create	
				</button>

			</div>

		</div>
	)
}