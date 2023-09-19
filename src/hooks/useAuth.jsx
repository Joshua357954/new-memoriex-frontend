import React from 'react'
import { useState,useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from "../hooks/useLocalStorage.jsx"
import { BaseContext } from "../context/userContext.jsx"

export default function useAuth() {

const navigate = useNavigate()
const {currentUser, setCurrentUser} = useContext(BaseContext)
const [setStore,getStore,deleteStore]= useLocalStorage("memoriex")

     useEffect(() => {
        if(getStore()[0])
            setCurrentUser(getStore()[0])   

     }, [])

    function LogOut(){
    	deleteStore()
    	setCurrentUser(null)
    	navigate("/Login")
    }

	return [currentUser,setCurrentUser,LogOut]
}