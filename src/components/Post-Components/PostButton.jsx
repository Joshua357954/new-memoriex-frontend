import React from 'react'
import Pix0 from '../../fonts/pix1.png'
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import {IoMdImages as Image1} from 'react-icons/io'
import {TbVideoPlus as Video2} from 'react-icons/tb'
import {RiVideoAddFill as Video} from 'react-icons/ri'
import {CgSmileMouthOpen as Emot} from 'react-icons/cg'
import {MdNotifications as Notify} from 'react-icons/md'

export default function PostButton({createPost}) {

	const navigate = useNavigate()
	const { user } = useSelector( state => state.auth )

	const makePost = () => {
		createPost(true)
	}

	return (
		<div className="postButton h-[80px] w-full rounded-sm dark:bg-gray-900 bg-white  flex justify-between px-1 items-center">
			
			<div onClick={()=>navigate('/profile')} className="w-12 h-12  rounded-full border-2 border-emerald-500 mr-1  ">
				<img src={user.profilePix || Pix0} alt="profile pix" className="h-12 w-12 p-1 rounded-full" />
			</div>

			<div onClick={makePost} className="cursor-pointer dark:bg-gray-700 bg-gray-100 mr-1 h-10 w-[calc(100%-40%)] flex items-center pl-3 font-extralight dark:text-gray-50 text-gray-600 rounded-md text-sm">
				What's on your mind
			</div>

			<div className='flex text-gray-700 w-[27%] justify-between items-center border-dotted border-gray-300 '>
				<Video size={20} fill='#E30B5C' /> |
				<Image1 size={20} fill='green'/> |
				<Emot size={20} className="text-yellow-300"/>
			</div>
		
		</div>
	)
}





