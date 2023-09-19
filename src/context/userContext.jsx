import React from 'react'
import { useState, useEffect, createContext, useCallback, useMemo } from 'react'


export const BaseContext=createContext({})


export default function userContext({children}) {
	const [currentUser,setUser]=useState(undefined)

	const setCurrentUser =useCallback((user) => {
			setUser(user)
		},[])

	return (
		<BaseContext.Provider value={{currentUser,setCurrentUser}}>
			{children}
		</BaseContext.Provider>
	)
}