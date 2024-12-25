import React, { useEffect } from 'react'
import Search from './Search'
import Profile from './Profile'
import CreateNewDocument from './CreateNewDocument'

function Navbar({setDocuments}) {

  return (
    <div className='h-[10%] flex items-center bg-gray-200 justify-between sm:px-20 px-5 '>
        <div className='text-blue-600 text-3xl font-bold cursor-default'>DOCS</div>
        <Search setDocuments={setDocuments} />
        <div className='flex gap-2'>
          <CreateNewDocument/>
          <Profile />  
        </div>
       
    </div>
  )
}

export default Navbar