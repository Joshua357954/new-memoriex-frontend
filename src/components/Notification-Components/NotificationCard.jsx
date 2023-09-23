import React from 'react'
import Pix2 from '../../fonts/pix2.png'
import moment from 'moment'
import { BsTrashFill as Trash } from 'react-icons/bs'

export default function NotificationCard({nId,title,discription,time,read,deleteNotification,markRead}) {
	return (
		<div className={` relative w-full h-16 dark:bg-gray-800 ${!read?'bg-gray-100':'bg-gray-50'} bg-gray-100 mb-[5px] py-2 rounded-md flex justify-start px-[6px] items-center`}>
			<div className="h-12 w-12 rounded-full"> 
				<img src={Pix2} alt="User Img" className="w-full p-1 h-full rounded-full"/> 
			</div>
			
			<div onClick={() => markRead(nId)}>	
				<p className="dark:text-gray-200 text-md font-semibold capitalize text-gray-900">{title}</p>
				<p className="text-[13px] dark:text-gray-300 text-sm font-light">{discription}</p>
				<p className="text-[11px] dark:text-gray-400 text-xs font-extralight">{time?.split('T')[1].split('.')[0]}</p>
			</div>
			
			<Trash onClick={() => deleteNotification(nId)} className="absolute right-3 top-3 dark:hover:text-red-400 text-gray-400 hover:text-red-300 "/>
		</div>	
	)
}