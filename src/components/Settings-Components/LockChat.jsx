import React from 'react'
import { toast } from 'react-toastify'
import {useEffect, useContext, useState} from  'react'
import { LockApp } from '../../context/lockChatContext.jsx'


export default function LockChat() {
	const store2 = 'lock-btn-state'
	const code_store = 'memoriex-chat-code'
	const [mainCode,setMainCode] = useState('') 
	const [codeInput,setCodeInput] = useState('')
	const {showBtn,setShowBtn} = useContext(LockApp)
	const PassCode = () => localStorage.getItem(code_store)||localStorage.setItem(code_store,'')
		

	useEffect(()=>{
		setMainCode(PassCode())
		console.log(mainCode)
	},[])


	function toggleLockBtn(){
		const currentState = !showBtn
		setShowBtn(currentState)
		const lockBtnState = localStorage.setItem(store2,currentState)
	}
	
	function setChatPassword(){
		if (codeInput.length >= 4 && codeInput.length <= 5){
			localStorage.setItem(code_store,codeInput)
			setMainCode(codeInput)
			setCodeInput('')
			toast("Yay 🌟, New Memoriex Chat Password Set 😊",{ position:'top-center', type:'info' })
		}
	}


	function changePassword(){
		const code1 = prompt('Enter Old PassCode')
		const code2 = prompt('Enter New PassCode')
		if (code1==mainCode){
			localStorage.setItem(code_store,code2)
			setMainCode(code2)
			return toast('Password Set Successfully 🎊 🚀',{type:'success'})
		}
		else
			toast("⚠️ Old Password is incorrect 🔴",{
				position:'top-center',
				type:'error'
			})
	}


	return (
		<div className="flex transition-all w-full flex-col pl-3 space-y-2">
 			<div className="flex items-center w-full px-3 space-x-2 my-2">
				<p className="text-sm font-extralight text-gray-900">Lock Button </p>
				<input disabled={mainCode?false:true} checked={showBtn?true:false} onChange={toggleLockBtn} className="focus:outline-none" type="checkbox" />
			</div>

			{ !mainCode ? 
				(<div className="flex items-center justify-start px-2 w-full ">
					<input value={codeInput} onChange ={({target})=>setCodeInput(target.value)}
					 className="py-1 px-2 rounded-tl-sm  w-28 md:w-32 rounded-bl-sm focus:outline-none outline-none"
					 autoComplete='off'
					 placeholder="Set Code" />
					 <button onClick={setChatPassword} className='py-1 px-3 bg-blue-400 rounded-tr-sm rounded-br-sm text-white'>Set</button>
				</div>)

				 :
			
				<div className="mt-2 mb-1 w-full flex justify-center">
					<p  onClick={()=>changePassword()} className="text-xs font-bold text-red-400">Change Password</p>
				</div>
			}
		</div>
	)
}