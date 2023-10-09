
import React from 'react'
import { BiArrowBack as Back}  from 'react-icons/bi'

export default function ViewEvent({toggleView,viewEventProps}) {
	
	const {action,title,imgUrl,location,ownerId,date,discription} = viewEventProps
	
	function closeMe () {
		const status = {state:false}
		toggleView(status)
	}

	return (
		<div className="transition-all overflow-y-hidden absolute h-screen flex justify-center top-0 left-0 right-0 bottom-0 bg-gray-50 dark:bg-gray-800 justify-center items-center ">
			
			<div className="bg-white dark:bg-gray-700 w-full lg:w-1/2 h-full">
				
				{/* Navigation */}
				<div className="flex shadow-sm justify-between h-14 w-full items-center px-2">
				
					<Back onClick={closeMe} className="px-2 text-4xl rounded-md dark:bg-gray-400 dark:text-white bg-gray-100 shadow-sm hover:shadow-md"/> 
						
					<h1 className="dark:text-white w-24 truncate">{title}</h1> 
				
					<h1>{" "}</h1> 
					
				</div>
				
				<div className="h-full w-[80%] px-2">
					<div className="mt-2 w-full flex justify-center items-center ">
						<img className="w-[40%] h-[40%]" src={imgUrl} alt="" />	
					</div>
					
					<div className="dark:text-white h-[50%] flex flex-col justify-around items-start ml-1">
						
						<h1 className="font-semibold">Title : <p className="font-light">{title}</p>  </h1>
						<h1 className="font-semibold">Location : <p className="font-light">{location}</p>  </h1>
						<h1 className="font-semibold ">Date : <p className="font-light font-mono">{date}</p>  </h1>
						<div className="font-semibold">Discription : &nbsp; {"\n"} <p className="font-light">{discription}</p></div>

					</div>
			

				</div>
			</div>
		</div>
	)
}