import React from 'react'
import { useCallback } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { FetchUserEvents } from '../features/eventSlice.js'
import { FetchOtherEvents } from '../features/otherEventSlice.js'


export default function reloadEvents() {

	const dispatch = useDispatch()
	const { user } = useSelector( state => state.auth )

	const reloadAllEvents = useCallback(() => {
		const cred = {userId:user?.id,venue:user?.location}
		dispatch(FetchUserEvents(user?.id))
		dispatch(FetchOtherEvents(cred))
		},[]
	)
	return [reloadAllEvents]
}