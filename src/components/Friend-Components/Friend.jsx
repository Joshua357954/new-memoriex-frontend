
import AllFriends from './AllFriends.jsx'
import React,{useState,useCallback} from 'react'
import FriendSugg from './friendSuggestionCard.jsx'
import FriendRequests from '../../components/Friend-Components/FriendRequest.jsx'
import FriendSuggestion from '../../components/Friend-Components/FriendSuggestion.jsx'


export default function Friend() {
	const [openMyFriends,setOpenMyFriends] = useState(false)
	const scrollbar = 'scrollbar scrollbar-thin dark:scrollbar-track-gray-600 cursor-pointer  dark:hover:scrollbar-thumb-gray-500 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-400'
	
	const openCloseFriends = useCallback(
				(state)=>{
					setOpenMyFriends(state)
				}
		)

	return (
		<div className={`transition-opacity relative col-span-6 md:col-span-4 lg:col-span-3 bg-white dark:bg-gray-900 h-full flex-col justify-center ${scrollbar} items-center overflow-y-auto`}>
			<div className="w-full p-2 h-full ">
				<h1 className="dark:text-gray-50 text-gray-900 text-xl">Friends</h1>
				<div className="flex justify-start space-x-4 mt-3 mb-4 cursor-pointer">
					<a href="#sugg" className="bg-gray-200 text-gray-900 px-2 py-2 text-sm rounded-lg">Suggestions</a>
					<div onClick={() => openCloseFriends(true)} className="bg-gray-200 text-gray-900 px-2 py-2 text-sm rounded-lg">Your Friends</div>
				</div>
				{/* Friend Requests & Suggstion  */}
				<div className="w-full h-full">
					
					<FriendRequests/>
					<FriendSuggestion/>
				
				</div>
			</div>

			{/* All Users Friends */}
			{ openMyFriends ?
				( <div className="absolute top-0 right-0 button-0 left-0 h-full w-full ">
					<AllFriends off={openCloseFriends} />
				</div> )  : ""
			}
		</div>
	)
}