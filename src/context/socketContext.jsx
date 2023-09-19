import React from 'react' 
import { useEffect, useState, useRef } from 'react'
import {createContext} from 'react'
import io  from 'socket.io-client'


const HOST = "http://localhost:5001"


export const socketIO = createContext({})


function socketContext({children}) {

	const socket = useRef( io(HOST) )
	
	return (
		<socketIO.Provider value={{socket:socket?.current}}>
			{children}
		</socketIO.Provider>
	)
}

export default socketContext