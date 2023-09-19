import React from 'react'
import Pix  from  './../../fonts/pix1.png'
import { useNavigate } from "react-router-dom"


export default function SearchCard({name,bio,img}) {
	const navigate = useNavigate()
	return (
		<div className="w-full h-full h-16">
			<div onClick={() => navigate(`/profile/${name}`)} className="flex w-full px-2 py-1 items-center justify-start space-x-2">	
				{ img ? 
					( <div className="w-14 h-14 flex justify-center items-center rounded-full">
							  <img src={img} className="w-full h-full" alt="User Pix" />
					 </div>) 
					:
					( <div className="w-12 h-12 flex justify-center border-2 dark:text-gray-200 border-gray-300 items-center rounded-full">
						<p>{name?.slice(0,2)}</p>
					 </div> )	 
				}
				
				<div className="flex flex-col space-y-1">	
					<p className="dark:text-gray-50 text-md font-light capitalize">{name}</p>
					<p className="dark:text-gray-100 text-xs w-20 lowercase truncate">{bio}</p>
				</div>
			</div>

		</div>
	)
}