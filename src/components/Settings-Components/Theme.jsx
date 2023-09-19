import React,{useState,useEffect} from 'react'
import UseTheme from '../../hooks/useTheme.jsx'
import { BsFillSunFill as Sun, BsMoonFill as Moon } from 'react-icons/bs'

export default function Theme() {

	const [toggleTheme,current] = UseTheme()
	const [dark,setDark]= useState(!current)

	const changeTheme = () => {
		const teem = toggleTheme()
		console.log(teem)
		setDark(teem)
	}
	
	return (
		<div className="w-full dark:bg-gray-400 bg-gray-300 px-2 py-3 rounded-md flex justify-around items-center">
			<Sun fill={`${dark?'yellow':'white'}`}/>
			<div className={`h-5 ${dark?'bg-gray-100':'bg-gray-900'} w-8 rounded-md flex flex-row items-center transition-all`} onClick={changeTheme}>
				<div className={`h-4 w-4 ${dark?'mr-3 pl-[1px] bg-gray-800':'ml-3 bg-gray-100'} rounded-full transition-all`}></div>
			</div>
			<Moon fill={`${dark?'gray':'black'}`}/>
		</div>
	)
}