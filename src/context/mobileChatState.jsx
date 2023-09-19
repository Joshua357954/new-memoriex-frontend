import React from 'react'
import { useState, useEffect, createContext, useCallback } from 'react'

export const MobileChat = createContext()

export default function mobileChatState({children}) {

	const [mobileChatOpen, setMobileChatOpen] = useState(false)

	const changeState = useCallback(
				(Dstate) => {
					setMobileChatOpen(Dstate)
					console.log(Dstate)
				} )
	const setChatOpen = changeState

	return (
		<MobileChat.Provider value={{mobileChatOpen,setChatOpen}} >
			{children}
		</MobileChat.Provider >
	)
}