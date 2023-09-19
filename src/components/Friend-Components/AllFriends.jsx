import React from 'react'
import { useState, useEffect } from 'react'
import AllFriendCard from './AllFriendCard.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { IoMdArrowBack as BackBtn } from 'react-icons/io'
import { UserFriends } from '../../features/allFriendSlice.js'


export default function AllFriends({off}) {

	const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)
	const { isLoading,Friends,isError,Message } = useSelector(state => state.allFriend)

	
	useEffect(()=> {
		dispatch(UserFriends(user?.id))
	},[user])


	return (
		<div className="w-full h-full dark:bg-gray-800 bg-gray-50 overflow-y-auto">
			<div className="w-full h-14 mb-2 flex items-center dark:bg-gray-700 bg-gray-100 justify-start p-1 space-x-2">
				<BackBtn onClick={() => off(false)} className="text-gray-900 dark:text-gray-50 text-2xl"/> 
				<p className="text-gray-800 dark:text-gray-100">Your Friends </p>
			</div>

			{ Friends ?
				Friends?.map((duser) => { 
					return <AllFriendCard key={duser.createdAt} fID={duser?.FriendId} loading={isLoading} userId={duser?.UserId} />
				}) : <h1> No Friends Oh ...</h1>
			}
			
		
		</div>
	)
}