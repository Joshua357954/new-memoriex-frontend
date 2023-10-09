import React from 'react'
import { useRef } from 'react'
import { toast } from 'react-toastify'
import SearchCard from './SearchCard.jsx'
import { API } from '../../service/base.js'
import { useState, useEffect } from 'react'
import { MdClose as Close } from 'react-icons/md'
import { BiArrowBack as Back, BiSearch as SearchIcon}  from 'react-icons/bi'
import { BsTrashFill as Trash } from 'react-icons/bs'

export default function Search({onSearch}) {
	const clr = "text-3xl"
	const controller = useRef(new AbortController())
	const goBack = () => onSearch(false)
	const [fUsers,setFUsers] = useState([])
	const [loading,setLoading] = useState(false)
	const [searchValue, setSearchValue] = useState("")
	const [breakPoint,setbreakPoint] = useState(window.innerWidth)
	const scrollbar = `${window.innerWidth>400 ? 'scrollbar scrollbar-thin dark:scrollbar-track-gray-600 cursor-pointer  dark:hover:scrollbar-thumb-gray-500 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-400': ""} `
	
	useEffect(() => {
		window.addEventListener('resize',()=>setbreakPoint(window.innerWidth))
		console.log(breakPoint);
	}, [window.innerWidth])

	useEffect(() => {
		setFUsers("")
		controller.current.abort()
		async function searchIt () {
			if (searchValue && searchValue?.trim()) {
				const {data} = await API.get(`/user/globalUsers`,{signal:controller.signal})
				setLoading(true)
				const filtered_users = data?.response.filter((user) => {
					return user.username.toLowerCase().includes(searchValue?.trim()?.toLowerCase())
				})	
				setFUsers(filtered_users)
				setLoading(false)
			}
			else
				setSearchValue('')
		}
		searchIt()

	}, [searchValue])

	return (
		<div  className="flex justify-start absolute top-0 right-0 left-0 bottom-0 h-screen bg-transparent w-screen ">
			<div className={`flex flex-col h-full dark:bg-gray-800 ${window.innerWidth<400 ? 'w-[100vw]':'w-[40vw]'} bg-white shadow-2xl `}>	
				<div className="flex justify-between items-center px-1 bg-transparent dark:border-b-gray-100  border-b-2 border-b-gray-600 w-full">
					{ window.innerWidth<450 ? <Back size={30} className="dark:text-gray-50 text-gray-300"  onClick={goBack}/> : <Close size={30} className="dark:text-gray-50 text-gray-500 hover:text-gray-700 " onClick={goBack}/> }
					
					<div className="flex  p-1 justify-between bg-transparent py-2 w-full items-center">
						<input type='search' value={searchValue}  onChange={({target})=>setSearchValue(target.value)} name="search" 
						 placeholder="Search ..." autoComplete="off"
						 className="w-full bg-transparent px-2 dark:text-gray-50 text-lg py-2 outline-none focus:outline-none"  />	
					</div>	

					<SearchIcon  className="dark:text-gray-50 " size={30}/>
				</div>	

				<div className={`transition-all w-full h-full pt-2 ${scrollbar} overflow-y-auto`} >	
					{ loading ? 
						<h1 className="dark:text-white text-lg text-center mt-2">Loading ...</h1>
						:
					 fUsers[0] ? fUsers.map((item,idx)=> {
							return <SearchCard key={idx} name={item.username} bio={item.bio} img={item.profilePix} />
						}) : searchValue ? <h1 className="dark:text-white text-lg text-center mt-2">No Result Found</h1> : <h1 className="dark:text-white text-lg text-center mt-2">No Search Keyword</h1>
					}
				
				</div>

			</div>
		</div>
	)
}