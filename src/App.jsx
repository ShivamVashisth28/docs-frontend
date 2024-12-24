import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Document from './pages/Document'
import userState from './atoms/userStateAtom'
import { useRecoilState } from 'recoil'

function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState)

  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/documents' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/document/:documentId' element={<Document />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App