import React from 'react'
import { useState, useEffect, createContext, useCallback } from 'react'

export const LockApp = createContext()

export default function lockChatContext({children}) {

	const [chatLock, setLockApp] = useState(false)

	const [showBtn,setBtnState]= useState(false)

	const toggleBtn = useCallback(
		(state) => {
			setBtnState(state)
		} )
	
	const changeState = useCallback(
				(Dstate) => {
					setLockApp(Dstate)
					console.log(Dstate)
				} )
	const setChatLock = changeState
	const setShowBtn = toggleBtn

	return (
		<LockApp.Provider value={{chatLock,setChatLock,showBtn,setShowBtn}} >
			{children}
		</LockApp.Provider >
	)
}