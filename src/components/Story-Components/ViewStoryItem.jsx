import React from 'react'
import moment from 'moment'
import { useState,useRef, useContext } from 'react'
import Pix from '../../fonts/pix3.png'
import Carousell from "./carousel.jsx"
import { MdClose as Close } from "react-icons/md"
import { BsTrashFill as Trash } from "react-icons/bs"
import { ViewStory } from '../../context/showStoryContext.jsx'


export default function ViewStoryItem({myUser,username,closeStory,deleteStory,details}) {
	
	console.log(details)

	const own = myUser?.id == details.UserId

	return (
		<div className="h-full flex flex-col justify-start items-center w-full">
			{/* Navigation */}
				<div className="flex justify-between w-full dark:bg-gray-500 px-2 h-16 ">
					
					<div className="flex justify-center items-center space-x-2">
						<div className="w-10 rounded-full h-10 ">
							<img className="rounded-full w-full h-full " src={own ? myUser?.profilePix : Pix} alt="Profile Image" />
						</div>

						<div className="flex flex-col h-full overflow-hidden justify-center dark:text-white items-center space-y-2">
							<p className="text-sm">{username}</p>
							<p className="text-xs">{moment(details.createdAt).format('LT')}</p>
						</div>
					</div>

					<div className="flex justify-center items-center space-x-2">
						<Close onClick={closeStory} className="p-2 text-4xl border-gray-200 rounded-md "/>
						{own ? <Trash onClick={ () => deleteStory(details?.id) } className="p-2 text-4xl border-gray-300 bg-gray-300 dark:bg-gray-600 rounded-md dark:text-gray-50 text-gray-900" /> : ""}
					</div>

				</div>

			{/* Image */}
				<div className="w-full h-[70%] md:w-[90%] lg:w-[80%]">
					<img className="rounded-sm h-full w-full" src={details.images.startsWith('data') ? details.images : Pix} alt="Main Img" />
				</div>

			{/* Text */}
				<div className="px-1 pt-1 self-start text-sm md:text-md dark:text-white font-extralight">
					<p>{details.text}</p>
				</div>

			{/* Reaction Box */}
				<div className="">
					
				</div>
		</div>

	)
}