import React from 'react'
import PostCard from './PostCard.jsx'
import PostButton from './PostButton.jsx'
import { useDispatch, useSelector } from 'react-redux'
import PostModal from '../../modals/makePostModal.jsx'
import { getUserPost } from "../../features/postSlice.js"
import { NavHide } from '../../context/hideNavContext.jsx'
import { getFriendsPost } from '../../service/postService.js'
import { useState, useEffect, useRef, useContext } from 'react'
import StoryContainer from '../Story-Components/StoryContainer.jsx'
import {BsFileRichtextFill as Text1, BsTextareaT as Text} from 'react-icons/bs'



export default function MainPostContainer({toggleViewPost,toggleViewStoryBox,toggleAddStory}) {
	const MyPosts = [1,2,2]
	const contRef = useRef(null)
	const dispatch = useDispatch()
	const {setHideNav} = useContext(NavHide)
	const { userPost } = useSelector( state => state.post ? state.post : [])
	const [loading,setLoading] = useState(false)
	const { user } = useSelector(state => state.auth)
	const [showPostModal,setShowPostModal] = useState(false)
	const [breakPoint,setbreakPoint] = useState(window.innerWidth)

	useEffect(() => {
		const loadIt = async() => {
			// console.log(toggleViewPost,toggleViewStoryBox,toggleAddStory)
			setLoading(true)
			await dispatch(getUserPost(user?.id))
			setLoading(false)
		}
		loadIt()

	}, [])
	


	function openPostModal(action){
		setHideNav(true)
		setShowPostModal(action)
	}


	useEffect(() => {
		window.addEventListener('resize',()=>setbreakPoint(window.innerWidth))
	}, [window.innerWidth])


	return (

		<div ref={contRef} className={`relative transition-all col-span-6 md:col-span-4 lg:col-span-3 dark:bg-gray-900 bg-white overflow-y-auto ${window.innerWidth>400 ? 'scrollbar scrollbar-thin dark:scrollbar-track-gray-600  dark:hover:scrollbar-thumb-gray-500 scrollbar-track-gray-50 hover:scrollbar-thumb-gray-400':''}`}>
			<div className={`${breakPoint > 400 && breakPoint < 505 || breakPoint > 640 ? 'w-[85%]':''} dark:bg-gray-800 bg-white mx-auto `}>

				<PostButton createPost={openPostModal} />

				<StoryContainer action1={toggleAddStory} action2={toggleViewStoryBox}/>
 
				{userPost && userPost ? 
					(userPost || []?.map(
						(post,idx) => <PostCard PCRef={contRef} toggleViewPost={toggleViewPost} userId={user?.id} PostId={post?.id} text={post.text}
						 postUserId={post.UserId} imgUrl={post?.imageUrl} reactions={post.Reactions} comments={post.Comments} key={idx}
						 feeling={post.feeling} />
					)) : "Loading"
				}

				{loading ? <p className="text-center mt-4 text-2xl bg-blue-400">Loading </p> : "" }
				

			</div>
			{ showPostModal ?
				<PostModal PREF={contRef } action={openPostModal}/> : ""
			}
		</div>
	)
}