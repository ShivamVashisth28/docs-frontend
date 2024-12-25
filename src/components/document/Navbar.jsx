import React from 'react'
import Profile from '../dashboard/Profile'
import Menu from './Menu'

function Navbar({documentTitle, setDocumentName, userType}) {
  return (
    <div className='sticky top-0 z-10 h-[10%] w-[100%] p-2 flex items-center bg-gray-200 justify-between sm:px-20 px-5 '>
        <Menu setDocumentName={setDocumentName} userType={userType} />
        <div className='text-3xl cursor-default'>{documentTitle}</div>
        <Profile/>
       
    </div>
  )
}

export default Navbar