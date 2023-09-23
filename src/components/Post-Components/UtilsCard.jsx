import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useAccounts from '../../hooks/useAccounts.jsx'
import { reset } from '../../features/authSlice.js'


export default function UtilsCard({icon,name,to,action}) {
	
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [ getCurrentAccount,addAccount,removeAccount,logOutUser ] = useAccounts()


	function runAction(){

		if(to=='Accounts'){
			const sure = confirm("☸️ Do You You Want To LogOut ⚠️")
			if (sure) { 
				dispatch(reset())
				logOutUser()
				navigate(`/Accounts`)
			}
		}

		else if (to){
			return navigate(`/${to}`)
		}

		// Settings 
		else{
			action(true)
		}
		
	}


	return (
		<div onClick={runAction} className="flex gap-x-3 px-2 py-3 rounded bg-gray-00 hover:bg-gray-100 hover:dark:bg-gray-600 items-center">
			{icon} <p className="dark:text-gray-100 text-gray-800">{name}</p>
		</div>
	)
}