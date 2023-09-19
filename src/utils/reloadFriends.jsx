import React from 'react'
import { useState,useEffect,useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { UserFriends } from "../features/allFriendSlice.js"
import { UserFriendRequests } from '../features/friendRequestSlice.js'
import { UserFriendSuggestion } from '../features/friendSuggestionSlice.js'


export default function reloadFriends() {
	const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)
	
	const reload = useCallback(() => {
		dispatch(UserFriendSuggestion(user?.id))
		dispatch(UserFriendRequests(user?.id))
		dispatch(UserFriends(user?.id))
	},[])

	return [reload]
}