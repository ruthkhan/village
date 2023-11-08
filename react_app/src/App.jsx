import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddComms from './views/AddComms'
import AddContact from './views/AddContact'
import EditComms from './views/EditComms'
import EditContact from './views/EditContact'
import Login from './views/Login'
import MainDashboard from './views/MainDashboard'
import Register from './views/Register'
import './App.css'

function App() {

  const [thisUser, setThisUser] = useState([])
  const [thisContact, setThisContact] = useState([])
  const [thisComm, setThisComm] = useState([])

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route element={<Login 
              thisUser = { thisUser }
              setThisUser = { setThisUser }
            />} path="/" />
            <Route element={<Register 
              thisUser = { thisUser }
              setThisUser = { setThisUser }
            />} path="/register" />
            <Route element={<MainDashboard 
              thisUser = { thisUser } 
              setThisUser = { setThisUser }
              thisContact = { thisContact }
              setThisContact = { setThisContact }
            />} path="/main" />
            <Route element={<AddContact 
              thisUser = { thisUser } 
              setThisUser = { setThisUser }
              thisContact = { thisContact }
            />} path="/contacts/new" />
            <Route element={<EditContact 
              thisUser = { thisUser } 
              setThisUser = { setThisUser }
              thisContact = { thisContact }
              setThisContact = { setThisContact }
              thisComm = { thisComm }
              setThisComm = { setThisComm }
            />} path="/contacts/:contact_id" />
            <Route element={<AddComms 
              thisUser = { thisUser } 
              thisContact = { thisContact }
              thisComm = { thisComm }
              setThisComm = { setThisComm }
            />} path="/contacts/:contact_id/comms/new" />
            <Route element={<EditComms 
              thisUser = { thisUser } 
              setThisUser = { setThisUser }
              thisContact = { thisContact }
              thisComm = { thisComm }
              setThisComm = { setThisComm }
            />} path="/contacts/:contact_id/comms/:comms_id" />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
