 import React from 'react'
import { useState, useEffect } from 'react'
import useAuth  from "../hooks/useAuth.jsx"	
import UseTheme from '../hooks/useTheme.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { getConversations } from '../service/chatService.js'   
import ChatBody from '../components/Chat-Components/chatBody.jsx'
import OnlineFriends from '../components/Chat-Components/onlineFriends.jsx'
import ChatScreenLoader from '../components/Chat-Components/chatScreenLoader.jsx'
import ConversationList from '../components/Chat-Components/conversationList.jsx'

export default function ChatScreen() {

	const { user } = useSelector( state => state.auth )

	const [toggleTheme,current] = UseTheme()

	const [openMobileChat, setOpenMobileChat] = useState(false)

	const [ conversation, setConversation ] = useState(null)

	const [ isLoading, setIsLoading ] = useState(false) 

	const [ currentConversation,setCurrentConversation] = useState(null)

	useEffect(() => { 
		setIsLoading(true)
		// console.log(user)
		const fetch = async() => {
			const data = await getConversations(user?.id)
			console.log("My people fami data conv :: " , data)
			setConversation(data)	
			setIsLoading(false)
		} 
		fetch()   
	}, [user])

	if(isLoading)
		return <ChatScreenLoader />
	  

	return ( 

		<main className="h-screen dark:bg-gray-900 bg-gray-200 w-full grid grid-cols-1 grid-rows-4 py-1 relative  md:static md:mr-1">
			{/*<div className="row-span-1 mb-2">

				<OnlineFriends />
			</div>*/}
			
			<div className="row-span-4  grid grid-cols-3 h-full grid-rows-1 mx-5 md:mx-1">
				<ConversationList data={conversation} mainUser={user}/>

				<ChatBody mainUser={user} />
			</div>

		</main>
	)
}