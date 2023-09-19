import React from 'react'
import { useContext,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'


export default function ProtectLogin({children}) {

	const { user } = useSelector(state => state.auth)
	

	return user?.username ? <Navigate to='/' /> : <Outlet/>

}