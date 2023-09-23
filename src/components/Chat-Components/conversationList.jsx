import React from 'react'
import './../../style.css'
import { useState, useEffect } from 'react'
import Conversation from './conversation.jsx'
import { useNavigate } from 'react-router-dom'
import { getUser } from '../../service/userService.js'
import { BiSearch as SearchIcon, BiArrowBack as Back } from 'react-icons/bi'
import { conversationLastMessage } from '../../service/messageService.js'


export default function conversationList({data,mainUser}) {
	const navigate = useNavigate()
	const [searchValue,setSearchValue]  = useState("")
	const [conversation,setConversation] = useState(null)


	// Assemble Conversation In State
	useEffect(() => {
		if (data){
 			// console.log("Conv Data INIT  : ",data)
			async function runAll () {
				const newConv = data.map( async (conv) => {
					// Fetch conversation user with ID
					let conv_id = ""
					async function getRecipient () {
						conv_id = conv?.id
						const recipient1=conv.userid1== mainUser['id'] ? conv.userid2 : conv.userid1
						const userDetails = await getUser(recipient1)
						if ( userDetails ) return (await userDetails)
					}		
					const await_GR = await getRecipient()
					
					const lastMessage = await conversationLastMessage(conv_id)
					const lastMsgCount = lastMessage.length
				
					// console.log("My Conv IDDDD : ",conv_id,await_GR)
					if (await_GR) return {...await_GR,convId:conv_id,lastMessage:lastMessage[lastMsgCount-1]} 
				})
				const ALL_DATA = await Promise.all(newConv)
				setConversation(ALL_DATA.filter(item => item != null))
				// console.log("Conversation Assemble : ",ALL_DATA)
			}
			runAll()	
		}
	}, [data])



	// Search Conversation Effect
	useEffect(() => {
		if (searchValue)
			// setSearchValue(
			console.log(conversation)
	}, [searchValue])



	// Ui Render
	return (
		<aside className="flex h-full px-1 justify-center items-center col-span-3  md:col-span-1 w-full ">

			<div className='grid grid-rows-5 w-full pt-3 grid-cols-1'>

			{/* Search */}
				<div className="flex w-full row-span-1 dark:bg-gray-400 bg-white mx-1 px-3 py-2 items-center h-14 justify-start rounded-2xl ">
					<Back onClick={()=>navigate('/')} className="cursor-pointer bg-green-200 h-full dark:text-gray-600 font-bold text-4xl px-2 py-1 rounded-md text-gray-700"/>
					<input className="dark:placeholder-gray-100 focus:outline-none w-full bg-transparent rounded mx-1 text-sm md:text-lg"
						type="text" 
						placeholder="Search"
						value={searchValue} 
						onChange={({target})=>setSearchValue(target.value)}	
					/>
					<SearchIcon className="text-green-400  text-2xl"/>
				</div>

			{/* Body */}
				{<div className='bg-white dark:bg-gray-600 h-[72vh] row-span-4 mx-1 mt-3 rounded-md px-2 py-2 items-center overflow-y-auto '>
					
					{ conversation ?

					conversation.map(conv => <Conversation key={conv.id} data={conv} myId={mainUser?.id} /> )

						: <h2 className="text-blue-300 text-center text-xl my-auto">Searching</h2>
					}
				</div>}
				
{/*				<div className='bg-white dark:bg-gray-600 h-[72vh] row-span-4 mx-3 mnversation />
					<Conversation />
					<Conversation />
					<Conversation />
					<Conversation />
					<Conversation />
					<Conversation />
					<Conversation />
					<Conversation />
					<Conversation />		
				</div>*/}
				
			</div>
		
		</aside>
	)
}