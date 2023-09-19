import React from 'react'
import { useState, useEffect, createContext, useCallback } from 'react'

export const NavHide = createContext()

export default function hideNavContext({children}) {

	const [hideNav, setNavHidden] = useState(false)

	const changeState = useCallback(
				(Dstate) => {
					setNavHidden(Dstate)
					console.log(Dstate)
				} )
	const setHideNav = changeState

	return (
		<NavHide.Provider value={{hideNav,setHideNav}} >
			{children}
		</NavHide.Provider >
	)
}