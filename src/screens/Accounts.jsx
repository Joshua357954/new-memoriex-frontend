import React from 'react'
import Pix5 from './../fonts/pix2.png'
import { toast } from 'react-toastify'
import { useDispatch } from "react-redux"
import { useState, useEffect } from 'react'
import UseTheme from '../hooks/useTheme.jsx'
import { useNavigate } from  "react-router-dom"
import useAccounts from '../hooks/useAccounts.jsx'
import { BsTrashFill as Trash } from 'react-icons/bs'
import { reset , updateUser } from '../features/authSlice.js'


export default function Accounts() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [toggleTheme,current] = UseTheme()
	const [ acUsers,setAcUsers ] = useState([])
	const [getCurrentAccount,addAccount,removeAccount,logOutUser,getStore,setCurrentAccount] = useAccounts()


	useEffect(()=>{
		setAcUsers(getStore()?.otherAccounts)
		console.log(getStore())
	},[])

	async function addNewAccount (ac) {
		const sure = confirm(`Do You Want to Login to ${ac.username} Account`)
		if (!sure) return ""
		await dispatch(updateUser(ac))
		navigate('/home')
		setCurrentAccount(ac)
	}

	function removeUAC (user) {
		console.log("Removing A/C : ",user?.id);
		const fresh_ = acUsers.filter((u)=>u.id != user.id)
		const sure = confirm(`Are You Sure You Want To Remove ${user.username}`)
		if (!sure) return ""
		setAcUsers(fresh_)
		removeAccount(user)
	}
	
	return (
		<div  className="flex overflow-y-scroll justify-center items-center h-screen w-scren">
			<div className="flex flex-col justify-evenly items-center h-full w-full ">	
				<h1 className="text-2xl text-gray-900 md:text-3xl text-center">Choose Account</h1>

				<div className="h-[40vh] md:h-3/6 w-2/3 md:w-3/6 bg-transparent overflow-y-auto scrollbar scrollbar-thin">

				{ acUsers ?	acUsers.map((item)=>{
						return <div key={item?.password} className="cursor-default relative w-full rounded-sm px-2 py-1 mb-1 space-x-4 bg-gray-100 flex justify-start items-center">	
								<img onClick={() => addNewAccount(item)} className="bg-white w-14 h-14 rounded-md" src={Pix5} alt="Ac Icon" />
								<p onClick={() => addNewAccount(item)} className="text-md">{item?.username}</p>
								<Trash onClick={()=>toast("DBL Click to delete",{type:'info'})}
								onDoubleClick={()=>removeUAC(item)} 
								className="absolute top-2/5 right-2 text-gray-300 hover:text-red-400" />
							</div>			
				})
				: <h1>No Accounts Yet</h1>	}

				</div>

				<div className="flex flex-col  space-y-2 w-full items-center">
					<button onClick={()=>navigate('/Login')} className="bg-green-300 py-2 w-2/6 rounded-sm ">Login</button>
					<span className='text-xm underline font-bold text-gray-600 lg:text-sm'>SignUp</span>
				</div>

			</div>
		</div>
	)
}