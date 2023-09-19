
import React from 'react'

import { useState, useEffect, createContext, useCallback } from 'react'

export const NewRecipient = createContext()

export default function recipientContext({children}) {

	const [recipient, setNew] = useState({})

	const setRecipient = useCallback(
				(Dstate) => {
					setNew(Dstate)
					console.log(Dstate)
				} )


	return (
		<NewRecipient.Provider value={{recipient,setRecipient}} >
			{children}
		</NewRecipient.Provider >
	)
}
