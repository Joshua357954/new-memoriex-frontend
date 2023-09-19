import './index.css'
import React from 'react'
import { useState, useContext, useEffect } from 'react'
import LogRegScreen from './screens/LogReg.jsx'
import ChatScreen from './screens/ChatScreen.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import EventScreen from './screens/EventScreen.jsx'
import ProtectLogin from './utils/ProtectLogin.jsx'
import LockScreen from './modals/LockScreenModal.jsx'
import AllAccountScreen from './screens/Accounts.jsx'
import { LockApp } from './context/lockChatContext.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { socketIO } from './context/socketContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ForgotPasswordScreen from './screens/ForgotPasswordScreen.jsx'


function App() {
 
  const { socket } = useContext(socketIO)
  const { chatLock } = useContext(LockApp)
  const { user } = useSelector( state => state.auth )

  useEffect(() => {
    socket.emit("setup", user)
    socket.on('connected', (usersID) => {
      // console.log("User ID OF : ",usersID)
    })
  }, [user])

  if ( chatLock )
    return <LockScreen />

  return (
      <BrowserRouter>
        
        <Routes>

          <Route element={ <ProtectLogin/> } > 
                                             
                <Route path='/Login' element={ <LogRegScreen /> } /> 
                
                <Route path="/Accounts"  element={<AllAccountScreen/>} />

                <Route path="/forgottenPassword/:id/:resetString"  element={<ForgotPasswordScreen/>} />

          </Route > 

          
          <Route element={<ProtectedRoute/>} >

            <Route path="/" exact element={<HomeScreen/>} />

            <Route path="/home" exact element={<HomeScreen/>} />

            <Route path="/Profile"  element={<ProfileScreen/>} />

            <Route path="/Profile/:slug"  element={<ProfileScreen/>} />

            <Route path="/Chat"  element={<ChatScreen/>} />

            <Route path="/Event"  element={<EventScreen/>} />

          </Route>

        </Routes>

      </BrowserRouter>
   )
}

export default App


// npm i --save @emoji-mart/data axios emoji-mart emoji-picker-react react-icons react-redux react-router-dom react-toastify redux redux-thunk redux-toolkit socket.io-client styled-components
 