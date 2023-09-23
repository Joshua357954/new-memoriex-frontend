import React from 'react'
import UtilsCard from './UtilsCard.jsx'
import { FaUserAlt as User } from 'react-icons/fa'
import { HiOutlineLogout as LogOut } from 'react-icons/hi'
import ThemeToggle from '../Settings-Components/Theme.jsx'
import MiniProfile from '../Profile-Components/MiniProfile.jsx'
import { MdEvent as Event, MdSettings as Setting } from 'react-icons/md'


export default function Utilities({Settings}) {

	const utilsDetails = [
				{name:"Profile", to:"profile",icon:<User className="text-green-400 text-lg"/>},
				{name:"Event", to:"event", icon:<Event className="text-yellow-400 text-xl"/>},
				{name:"Settings", action:Settings, icon:<Setting className="text-sky-400 text-xl"/>},
				{name:"LogOut", to:"Accounts", icon:<LogOut className="text-red-400 text-xl"/>}
	]
	const scrollbar = `${window.innerWidth>400 ? 'scrollbar scrollbar-thin dark:scrollbar-track-gray-600 cursor-pointer  dark:hover:scrollbar-thumb-gray-500 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-400': ""} `
	
	return (
		<aside className={`${scrollbar} overflow-y-auto  hidden h-full md:block md:col-span-2 lg:col-span-1 transition-all cursor-default dark:bg-gray-900  bg-white`} >	
			
			<div className=" h-full w-full flex flex-col items-center justify-around">
				
				<div className='flex w-[90%] flex-col bg-transparent '>
					<p className="p-2 pt-[2.5px] self-start dark:text-white ">For You</p>

					<MiniProfile />

				</div>

				<div className="w-[93%] dark:bg-gray-00 my-1 bg-gray-5 flex flex-col justify-between gap-y-3  pb-3 rounded-md">
					{
						utilsDetails.map((item,idx)=> <UtilsCard key={idx} icon={item.icon} name={item.name} to={item?.to} action={item?.action} /> )
					}
					
				</div>

				{/* Toggle (Light/dark) */}
				<div className='w-[90%]'>	
					<ThemeToggle />
				</div>
			
			</div>
			
		</aside>	
	)
}