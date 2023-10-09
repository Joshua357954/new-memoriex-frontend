import Carousell from "./carousel.jsx"
import ViewStoryItem from "./ViewStoryItem.jsx"
import { useDispatch, useSelector } from 'react-redux'
import React,{ useState,useRef, useContext } from 'react'
import { deleteMyStory } from '../../service/storyService.js'
import { ViewStory } from '../../context/showStoryContext.jsx'
import { updateStories } from '../../features/userStorySlice.js'


	
export default function ViewStoryBox({toggleViewStoryBox}) {
     
	const {showStory,setShowStory} = useContext(ViewStory)
	const { user } = useSelector( state => state.auth )
	const [storyCount,setStoryCount] = useState(0)

	console.log("Show Story ...", showStory)
	// moving carousel
	// only text story display

	function closeStory () {
		setShowStory('')
		toggleViewStoryBox(false)
	}


	function nextStory () {
		if (showStory.length - 1 > storyCount){
			setStoryCount(storyCount + 1)
			console.log("Moving Forward ohhh",storyCount)
		}else{
			// setStoryCount(0)
			console.log("Next S to default")			
		}
		console.log("Story Count :",storyCount)
	}


	function backStory () {
		if (showStory.length > storyCount){
			if (storyCount > 0 ){
				setStoryCount(storyCount - 1)
				console.log("Moving Backward mmaaaaah")
			}
		}else{
			// setStoryCount(0)
			console.log("Back S to default ohhh")
		}
	}


	function deleteStory(sId) {
		console.log("Story To Delete",sId)
		const sure = confirm("Are you sure you want to delete this story ?")
		
		if (!sure) return 
		// get story id & userId

		// delete story from datbase
		deleteMyStory(sId,user?.id)

		// filter deleted story from state value\
		console.log("Story list to delete from > ",showStory)
		const toUpdate = showStory?.filter((story) => story?.id != sId )

		console.log("Local State has been updated")
		// remove story from local state
		updateStories(toUpdate)

		// Close Story 
		setShowStory('')
		toggleViewStoryBox(false)
	}


	return (	
		<div className="flex justify-center w-full h-full bg-gray-200 dark:bg-gray-800">
			<div className="relative flex flex-col h-full items-center justify-start w-full dark:bg-gray-700 bg-gray-50 md:w-1/2 lg:w-2/5">
						
				<div onClick={backStory} className="absolute top-0 left-0 h-full  w-5 text-center active:bg-gray-50"></div>
				<div onClick={nextStory} className="absolute top-0 right-0 h-full w-5 text-center active:bg-gray-50"></div>


			    <ViewStoryItem myUser={user} username={user?.username} closeStory={closeStory} deleteStory={deleteStory} details={showStory[storyCount]}/>

			</div>

		</div>
	)
}