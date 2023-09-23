import React from 'react'
import StoryCard from './StoryCard.jsx'
import Pix0 from '../../fonts/pix1.png'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchStories } from '../../features/storySlice.js'
import { GetMyStories } from '../../features/userStorySlice.js'
import { getUserStories, getStories } from "../../service/storyService.js"

export default function StoryContainer({action1,action2}) {
	const dispatch = useDispatch()
	const { user } = useSelector( state => state.auth )
	const [ otherStories, setOtherStories ] = useState([])
	const { Stories } = useSelector( state => state.stories )
	const { userStory, isLoading } = useSelector( state => state.userStory )


	function createStory() {
		action1(true)
	}
	
	
	
	useEffect(() => {
		// get Personal Stories
		const getPersonalStories = async() => {
			await dispatch(GetMyStories(user.id))
		}
		getPersonalStories()
	}, [])


	useEffect(() => {
		const toGet = async() => {
			setOtherStories(await getStories(user?.id))
		}
		toGet()


		console.log("Hello world , This is from userStorySlice", userStory)
		console.log("Stories From Slice : ",otherStories)
	}, [])

	// const OTH = otherStories[0] && otherStories?.map(item => item)

	// console.log("This is my OTH :",OTH)



	return (
			<div className={`${window.innerWidth>400 ? 'scrollbar dark:scrollbar-track-gray-600 dark:scrollbar-thumb-gray-600  dark:hover:scrollbar-thumb-gray-400 scrollbar-thin pb-3 scrollbar-track-white scrollbar-thumb-gray-200':''} flex h-32 dark:bg-gray-900 bg-white border-1 border-black w-full p-1 overflow-x-auto`}>
			{/*{ console.log(Stories)}*/}
				<div onClick={createStory} className="cursor-pointer h-full w-16 bg-gray-800 rounded-md mr-1 flex-shrink-0">
					<img src={user?.profilePix || Pix0} alt="profile pix"className='h-[65%] w-full' />
					<div className="bg-gray-500 text-[9px] p-[2px] font-light h-[35%] rounded-b-md pt-1 text-center text-white w-full"> Add to Story </div>
				</div>

					
			{userStory[0]  && !isLoading && 
					<StoryCard action2={action2} files={userStory} name="Your story" img={userStory[0]?.images || ""} text="" />
			}
			
			{/*{ console.log("This stories na for friends", Object.keys(Stories[0] ||  {}))}
*/}

			{otherStories && !isLoading &&
				otherStories || [] ?.map((item,idx) => { 
					<StoryCard action2={action2} name={'Name'} img="" />	
				})				
			}
	
			{console.log("This is othwrStories : ",otherStories)}
			</div>
			
	)
}