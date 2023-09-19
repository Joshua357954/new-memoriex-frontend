
import React from 'react'
import { useState, useEffect, createContext, useCallback } from 'react'

export const ViewStory = createContext()

export default function showStoryContext({children}) {

	const [showStory,setStoryState] = useState({})

	const changeState = useCallback(
				(Dstate) => {
					setStoryState(Dstate)
				} )

	const setShowStory = changeState

	return (
		<ViewStory.Provider value={{showStory,setShowStory}} >
			{children}
		</ViewStory.Provider >
	)
}
