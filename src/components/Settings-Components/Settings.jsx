import React from 'react'
import Theme from './Theme.jsx'
import { useState } from 'react'
import LockChat from './LockChat.jsx'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reset } from '../../features/authSlice.js'
import PersonalInfo from './SettingsEntryCard1.jsx'
import useAccounts from '../../hooks/useAccounts.jsx'
import { FaExchangeAlt as Exchange } from 'react-icons/fa'
import MiniProfile from '../Profile-Components/MiniProfile.jsx'
import { MdManageAccounts as Acct, MdLock as Lock } from 'react-icons/md'


export default function Settings() {
	const collBtnH = '14'
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [Collapse,setCollapse] = useState( { 'acctSet':false, 'lockChat':false } )
	const [ getCurrentAccount,addAccount,removeAccount,logOutUser ] = useAccounts()
	

	function toggleCollapse(item) {
		console.log(item)
		setCollapse((prev)=>({
			...prev,[item]:!Collapse[item],
		})) 
	}

	async function logOut(){
		const sure = confirm('☸️ Do You You Want To LogOut ⚠️')
		if (sure){
			await dispatch(reset())
			logOutUser()
			navigate('/Accounts')
		}
	}

	const scrollbar = 'scrollbar scrollbar-thin dark:scrollbar-track-gray-600 cursor-pointer  dark:hover:scrollbar-thumb-gray-500 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-400'

	return (
		<div className="h-full w-full dark:bg-gray-800 bg-gray-50 ">
			 <div className={`flex flex-col w-full px-2`}>	
					
				<div className="w-full my-3">	
					<MiniProfile/>
				</div>
					
				{/* Update Profile */}
				{/*<div className={`transition-all ${Collapse['acctSet']? "max-h-45" : `max-h-${collBtnH}`} overflow-hidden w-full`}>*/}
				<div className={`transition-all focus:outline-none  ${Collapse['acctSet']? "max-h-45" : `h-${collBtnH}`} overflow-hidden w-full`}>
					<div onClick={()=>toggleCollapse('acctSet')} className={`cursor-pointer h-${collBtnH} space-x-2 px-2 py-1 dark:bg-gray-400 bg-gray-200 flex items-center dark:text-gray-50 text-gray-800 rounded-sm`}>
						<Acct size={23}className="text-green-400" /> <p className="text-sm">Account Settings</p>
					</div>
  
					<div className="w-full h-full ">

						<PersonalInfo />

					</div>		
				</div>

			{/* Others */}
				<div className="focus:outline-none flex flex-col space-y-3 my-4 px-2g dark:mm dark:text-gray-50" >	
					
					<div onClick={logOut}className="mt-3 flex space-x-4 items-center" ><p>Switch Account</p> <Exchange className="text-red-500"/></div>

				</div>

			{/* Lock Chat */}
				<div className={`transition-all  ${Collapse['lockChat']? "max-h-45" : `h-${collBtnH}`} overflow-hidden w-full`}>
					
					<div onClick={()=>toggleCollapse('lockChat')} className={`cursor-pointer h-${collBtnH} space-x-4 px-2 py-1 dark:bg-gray-400 bg-gray-200 flex items-center dark:text-gray-50 text-gray-800 rounded-sm`}>
						<Lock size={23}className="text-sky-400" /> <p className="text-sm">Lock Chat</p>
					</div>

					<div className="w-full h-full ">
						<LockChat/>
					</div>

				</div>

				<div className=" py-3">	
					<Theme />
				</div>
				

			</div>
		</div>
	)
}