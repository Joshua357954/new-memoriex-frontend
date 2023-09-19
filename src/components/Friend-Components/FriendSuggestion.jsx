import React from 'react'
import { useState, useEffect } from 'react'
import FriendSugg from './friendSuggestionCard.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { UserFriendSuggestion } from '../../features/friendSuggestionSlice.js'


export default function FriendSuggestion() {
	const dispatch = useDispatch()
	const {user} = useSelector(state => state.auth)
	const { isLoading,Suggestions,isError } = useSelector(state => state.friendSuggestion)

	useEffect(() => {
		dispatch(UserFriendSuggestion(user?.id))
	}, [user])

	return (
		<div id="sugg" className="transition-all row-span-3 dark:bg-gray-800 bg-white flex flex-col justify-start items-center ">
			<p className="py-1 text-sm text-left  self-start pl-2 font-bold dark:text-gray-100">Friend Suggestion</p>
			<div className="w-[90%] mx-auto  overflow-y-scroll scrollbar-track-white scrollbar-thumb-gray-300 scrollbar scrollbar-thin pr-2"> 
				
				{  Suggestions?.map((suggFriend) => {
						return <FriendSugg key={suggFriend.createdAt} loggedUser={user?.id} name={suggFriend.username} loading={isLoading} id={suggFriend.id}/>
					})
				}

			</div>
		</div>
	)
}

