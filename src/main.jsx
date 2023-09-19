import './index.css'
import App from './App'
import React from 'react'
import {store} from './store/store.js'
import ReactDOM from 'react-dom/client'
import { Provider } from  'react-redux'
import { ToastContainer } from 'react-toastify'
import UserContext from './context/userContext.jsx'
import NavHidden from './context/hideNavContext.jsx'
import LockChat from './context/lockChatContext.jsx'
import PostState from './context/showPostContext.jsx'
import MobileChat from './context/mobileChatState.jsx'
import StoryState from './context/showStoryContext.jsx'
import ChatRecipient from './context/recipientContext.jsx'
import SocketIO from './context/socketContext.jsx'

  
ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<>
		<SocketIO>
			<PostState>	
				<StoryState>
					<LockChat>
						<NavHidden>
							<ChatRecipient>
								<MobileChat>
									<UserContext>   
										<App />
									</UserContext>
								</MobileChat>
					    	</ChatRecipient>	
						</NavHidden>
					</LockChat>
				</StoryState>
			</PostState> 
		</SocketIO>
		<ToastContainer hideProgressBar={true} />
		</>
	</Provider>	
)
