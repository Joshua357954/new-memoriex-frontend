import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function MiniProfile() {

	const { user } = useSelector(state => state.auth)	

	return (
		<div className='flex w-full flex-col bg-transparent'>
			<div className='flex justify-between space-x-1 bg-gray-100 dark:bg-gray-500 py-1 px-1 rounded-sm items-center px-1'>
				<div className=" text-white text-center bg-gray-800 w-8 h-8 rounded-full flex justify-center items-center"><p>{user.username.slice(0,1)}</p></div>
				<div className="w-[95%]">
					<p className='text-sm dark:text-gray-50 text-gray-800'>{user.username}</p>
					<span className="text-xs dark:text-gray-100 text-gray-700">@ {user.username.slice(0,3)} - Xi</span>
				</div>
			</div> 
		</div>
	)
}
