import React, { useEffect, useState } from 'react'
import Profile from '../dashboard/Profile'
import Menu from './Menu'

function Navbar({documentTitle, setDocumentName, userType, connectedUser}) {

  const [docUser, setDocUser] = useState([])


  useEffect(()=>{
    if(connectedUser != null){
      setDocUser(connectedUser)
    }
  },[connectedUser])

  return (
    <div className='sticky top-0 z-10 h-[10%] w-[100%] p-2 flex items-center bg-gray-200 justify-between sm:px-20 px-5 '>
        <Menu setDocumentName={setDocumentName} userType={userType} />
        <div className='text-3xl cursor-default'>{documentTitle}</div>
        
        <div className='flex justify-between'>
        
          {connectedUser && <div className=' flex   bg-gray-300 shadow-md rounded-sm p-1 w-[200px] max-h-[45px] mr-3  text-md cursor-default'>
            <div className='w-2/6 flex justify-center items-center pr-1'>
              <div className='h-4 w-4 bg-green-400 rounded-full'></div>
            </div>
            <div className='flex flex-wrap overflow-auto items-center gap-2'>
              {docUser.map(user => (
                <div key={user.socketId}>{user.userName}</div>
              ))}
            </div>
          </div>}

          <Profile/>
        </div>
    </div>
  )
}

export default Navbar