import React from 'react'
import { useState,useEffect } from "react"
import { getUser } from '../../service/userService.js'

export default function commentCard({commentUser,comment,date}) {
	const [name,setName] = useState("")

	useEffect(()=> {
		async function pickUser(){
			const DUser = await getUser(commentUser)
			setName(DUser?.username|| "No User")
		}
		pickUser()
	},[commentUser])

	return (
		<div className="dark:bg-gray-600 bg-gray-100 pl-2 py-1 pr-4 mb-1 rounded-md">
			<p className="dark:text-black font-bold text-sm">{name}</p>
			<h3 className="dark:text-gray-50">{comment}</h3>
			<small className="dark:text-gray-100 text-xs">{date}</small>
		</div>
	)
}