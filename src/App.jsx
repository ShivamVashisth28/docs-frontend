import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Document from './pages/Document'
import Invites from './pages/Invites'

function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/documents' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/document/:documentId' element={<Document />} />
            <Route path='/invite/:documentId/:inviteCode' element={<Invites />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App