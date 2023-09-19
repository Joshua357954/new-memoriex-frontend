import React from 'react'
import PostCard from './PostCard.jsx'
import PPix from '../../fonts/pix3.png'
import CommentCard from './commentCard.jsx'
import { useState, useContext } from 'react'
import { FiSend as Send } from 'react-icons/fi'
import { useSelector, useDispatch } from "react-redux"
import { BsEmojiSmile as Emoji  } from 'react-icons/bs'
import { CommentOnPost } from '../../service/postService.js'
import { ViewPost } from '../../context/showPostContext.jsx'
import { IoMdArrowBack as GoBackIcon } from 'react-icons/io'
  
export default function viewPostBox({toggleViewPost}) {
	
	const username = "Joshua Osabiya"
	const [commentText,setCommentText] = useState("")
	const { user } = useSelector(state => state.auth)
	const {fullPostData,setFullPostData} = useContext(ViewPost)
    const {ownerName, PostId, userId,text, postUserId,imgUrl ,time,feeling ,link, reactions,comments} = fullPostData
	const scrollbar = 'scrollbar scrollbar-thin dark:scrollbar-track-gray-700 cursor-pointer  dark:hover:scrollbar-thumb-gray-600  scrollbar-track-gray-50 hover:scrollbar-thumb-gray-400'

	function AddComment(){
		if(commentText){
			try{
				const COP = CommentOnPost({text:commentText,PostId,commentUser:user?.id})
				setCommentText("")
			}catch(error){
				console.log(error)
			}		
		}
	}


	function closeViewPost(){
		toggleViewPost(false)
		setFullPostData({})
	}


	return (
		<div className="h-full flex flex-col items-center justify-center w-full md:w-4/6 lg:w-3/6 bg-gray-50 dark:bg-gray-800">
			
			<div className="w-full dark:bg-gray-800 bg-white flex dark:text-white border-b-2 border-gray-200 justify-between px-1 h-[10%] items-center ">	
				<GoBackIcon size={20} onClick={closeViewPost}/>
				<h1>{ownerName}</h1>
				<p>{"  "}</p>
			</div>	


			{/* Main Container ( For The posts and the comments ) */}
			<div className={`${scrollbar} h-[80%] flex flex-col justify-start items-start w-full overflow-y-auto`}>	
				<PostCard FullView={true} toggleViewPost={toggleViewPost} userId={user.id}
											PostId={PostId} text={text}
												postUserId={postUserId} imgUrl={imgUrl} 
												reactions={reactions} feeling={feeling} comments={comments}/>
				
				<div className="w-[40%] pl-2">	
					{comments?.map((thread)=> {
							return <CommentCard key={thread.text} commentUser={thread?.commentUser} name={"samuel"} comment={thread.text} date={"10/11/22"}/>
						}
					)}
				</div>

			</div>


			{/* Comment box */}
			<div className="w-full flex justify-around items-center shadow-md px-1 py-[.5] max-h-[10%] h-[10%] bg-gray-100 dark:bg-gray-800">	
				<Emoji className="dark:text-green-300 text-yellow-400"/>
				<input type="" value={commentText}
				 onChange={({target})=> setCommentText(target.value)} 
				className="dark:bg-gray-600  dark:placeholder-gray-100 placeholder-gray-700 focus:outline-none rounded-md w-[65%] px-1 py-1  shadow-md" placeholder="Comment" />

				<div onClick={AddComment} className="bg-blue-400 p-2 rounded-full font-bold text-white">	
					<Send />
				</div>
			</div>
		</div>
	)
}   