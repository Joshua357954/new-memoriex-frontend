import React from 'react'
import {useState,useEffect} from 'react'
import RequestCard from './friendRequestsCard.jsx'
import { useSelector,useDispatch } from 'react-redux'
import { UserFriendRequests } from '../../features/friendRequestSlice.js'

 
export default function Friend() {
	const dispatch = useDispatch()
	const {user} = useSelector(state => state.auth)
	const { isLoading,Requests,isSuccess,isError } = useSelector(state => state.friendRequests)

	useEffect(() => {
		dispatch(UserFriendRequests(user?.id))
	}, [user])


	return (
		<div className="row-span-3 dark:bg-gray-800 bg-white flex flex-col justify-start items-center ">
			<p className="dark:text-gray-100 py-1 text-sm text-left self-start  pl-2 font-bold">Friend Requests</p>
			<div className="w-[90%] mx-auto  overflow-y-scroll scrollbar scrollbar-track-white scrollbar-thumb-gray-300 pr-2 scrollbar-thin"> 
				{ Requests ?
					Requests?.map((friend) => {
						return <RequestCard key={friend?.createdAt} friendId={friend?.FriendId} reqId={friend?.id} loading={isLoading} loggedUser={user?.id} userId={friend?.UserId}/>
					 }) : <div className="dark:text-white text-center mt-2"> No Request Yet ..</div>
				}
			</div>
			
		</div>
	)
}

