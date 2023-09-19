import React from 'react'
import { useState, useEffect, createContext, useCallback } from 'react'

export const ViewPost = createContext()

export default function showPostContext({children}) {

	const [fullPostData,setFullPost] = useState({})

	const changeState = useCallback(
				(Dstate) => {
					console.log("console is working")
					setFullPost(Dstate)
				} )

	const setFullPostData = changeState

	return (
		<ViewPost.Provider value={{fullPostData,setFullPostData}} >
			{children}
		</ViewPost.Provider >
	)
}
