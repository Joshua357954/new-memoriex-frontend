import React from 'react'
import NotificationCard from './NotificationCard.jsx'
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, useCallback } from "react"

import { fetchUserNotifications, updateNotification } from '../../features/notificationSlice.js'
import { markOneNotification,DeleteNotification,markAllNotification} from '../../service/notificationService.js'
 

export default function Notification() {
	const dispatch = useDispatch()
	const { user } = useSelector( state => state.auth )
	const { userNotifications } = useSelector( state => state.notification )
	const scrollbar = 'scrollbar scrollbar-thin dark:scrollbar-track-gray-600 cursor-pointer  dark:hover:scrollbar-thumb-gray-500 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-400'

	useEffect (() => { 
		async function runAm () {
			const notifys = await dispatch(fetchUserNotifications(user?.id))
			console.log("From Notify End : ",notifys)	
		}
		runAm()
		console.log("Nofi end 2 : ",userNotifications)
	},[])



	async function readAllNotifications () {
		const mAll = await markAllNotification(user?.id)
		const toUpdateAll = userNotifications.map((item) => {
			return {...item,read:true}
		})
		dispatch(updateNotification(toUpdateAll))
	}

	async function readOneNotification (notificationId) {
		console.log("Read One Notify : ",notificationId)
		const m1 = await markOneNotification(notificationId,user?.id)
		const toUpdate = userNotifications.map((item) => {
			if ( item.id == notificationId )
				return {...item,read: true}
			})
		dispatch(updateNotification(toUpdate))
	}

	async function deleteOneNotification (notificationId) {
		//  notification id and userId
		const sure = confirm("Are you sure you want to delete notification ?")
		if (!sure) return 
		await DeleteNotification(notificationId,user?.id)
		const toUpdate = userNotifications.filter((item) => item.id != notificationId)
		dispatch(updateNotification(toUpdate))
	}

	if (!userNotifications || userNotifications == []) return <h1 className="text-center mt-2 mx-auto">Am Loading, Please Wait .</h1>

	return (
		<div className={`col-span-6 md:col-span-4 lg:col-span-3 h-full justify-center flex-col justify-center items-center ${scrollbar}`}>
			<div className="w-full h-full px-2 ">

				<h1 className="text-left text-xl dark:text-gray-50 font-bold py-1">Notifications</h1>

				<div onClick={readAllNotifications} className="h-9 w-full mb-2 dark:bg-gray-700 dark:text-blue-400 text-blue-500 bg-gray-200 justify-center flex items-center "> Mark All as Read </div>

				{ userNotifications.map((item) => {
					return <NotificationCard key={item?.createdAt} nId={item?.id} title={item?.title} discription={item?.discription} time={item?.createdAt} read={item?.read} deleteNotification={deleteOneNotification} markRead={readOneNotification}/>		
					})
				}

			</div>

			
		</div>
	)
}