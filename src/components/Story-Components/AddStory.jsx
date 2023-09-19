import React from 'react'
import { toast } from "react-toastify"
import { useSelector } from 'react-redux'
import { useContext, useState } from 'react'
import { MdClose as Close } from 'react-icons/md'
import { BsPlusLg as Plus } from 'react-icons/bs'
import { makeStory } from "../../service/storyService.js"
import { ViewStory } from '../../context/showStoryContext.jsx'

export default function AddStory({toggleAddStory}) {
	const image = ""
	const { user } = useSelector( state => state.auth )
	const [storyData,setStoryData] = useState({text:"",fileName:"",imageUrl:""})

	
	function commitData (values) {
		setStoryData((prev) => ({...prev,...values}))
	}


	function closeAddStory(){
		toggleAddStory(false)
	}

	const postStory = async() => {
		if (!storyData.imageUrl || !storyData.text)
			return toast("Pls  Fill in the Empty Fields",{type:'info',position:'top-center'})
		
		const new_data = {userId:user.id,...storyData}
		console.log(new_data)
		const created_story = await makeStory(new_data)
		if (created_story.status){
			toast("Story Added Successfully",{type:'info',position:'top-center'})
			setStoryData({text:"",fileName:"",imageUrl:""})
		}else {
			toast("An Error Occured",{type:'error',position:'top-center'})
		}
	}


	function chooseImg(e){
		selectImage(e)
	}


	function selectImage(e) {
		const file = e.target.files[0]
		commitData({fileName:file.name})

		const reader = new FileReader()
		reader.onload = (event) => {
			commitData({imageUrl:event.target.result})
		}
		reader.readAsDataURL(file)
	}


	return (
		<div  className="transition-all flex justify-center items-center w-full h-full bg-gray-200 dark:bg-gray-800">
			<div className="flex flex-col justify-start items-center h-full dark:bg-gray-600 bg-gray-50 w-full md:w-2/3 lg:w-3/6">
				
				{/* Navigation*/}
				<div className="flex shadow-md justify-between h-14 w-full items-center px-2">
					<Close onClick={closeAddStory} className="px-2 text-4xl rounded-md bg-gray-200 shadow-sm hover:shadow-md"/> 
					<h1 className="dark:text-gray-50">Create Story</h1>
					{ storyData.imageUrl ? <div className="relative py-2 px-3 cursor-pointer bg-gray-100 flex justify-center items-center rounded-md font-[500] text-xl ">
						<Plus /> <input type="file" className='absolute top-3 focus:outline-none right-2  w-6 opacity-0' onChange={chooseImg}/>
					</div> : <h1>{"  "}</h1> }
				</div>

				{/* Image */}
				<div className="flex justify-center items-center rounded-md bg-gray-300 md:w-[60%] w-[70%] h-[60%] mt-2">	
					{ storyData.imageUrl ?
					<img className="rounded-md bg-cover object-cover w-full h-full" src={storyData.imageUrl} alt="Photo To Change" />
					: 
					<div className="relative py-4 px-5 cursor-pointer bg-gray-100 flex justify-center items-center rounded-md font-bold text-3xl ">
						<Plus /> <input type="file" className='absolute top-3 focus:outline-none right-2  w-6 opacity-0' onChange={chooseImg}/>
					</div>
					}
				</div>

				{/* Text Box */}
				<div className="h-16 my-2 w-[70%] md:w-[60%]">
					<textarea value={storyData.text} onChange={(e)=> commitData({text:e.target.value})} placeholder="Tell Us the Story" className="focus:outline-none text-sm rounded-md border-2 border-gray-400 p-1 resize-none h-12 w-full" >
						
					</textarea>
				</div>

				{/* Post Button */}
				<button onClick={postStory} className="mb-1 rounded-md shadow-sm bg-blue-400 text-center capitalize w-[80%] md:w-[70%] py-2">
					Post Story
				</button>

			</div>
		</div>
	)
}