import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddComms from './views/AddComms'
import AddContact from './views/AddContact'
import EditComms from './views/EditComms'
import EditContact from './views/EditContact'
import Login from './views/Login'
import MainDashboard from './views/MainDashboard'
import Register from './views/Register'
import Settings from './views/Settings'
import Header from './components/Header'
import { UserProvider } from "./components/AppContexts"
import './App.css'

function App() {

  return (
    <div>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<Header />} path="/">
              <Route element={<MainDashboard />} path="/main" />
              <Route element={<Settings />} path="/settings" />
              <Route element={<AddContact />} path="/contacts/new" />
              <Route element={<EditContact />} path="/contacts/:contact_id" />
              <Route element={<AddComms />} path="/contacts/:contact_id/comms/new" />
              <Route element={<EditComms />} path="/contacts/:contact_id/comms/:comms_id" />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
