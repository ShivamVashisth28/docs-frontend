import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function DocumentCard({
    role,
    documentId
}) {

  const navigate = useNavigate()
  const [title, setTitle] = useState("")


  const getTitle = async ()=>{
    const response = await axios.get(`http://localhost:5000/document/getTitle?documentId=${documentId}`)
    const data = response.data
    if(data["status"] == 'success'){
      setTitle(data['title'])
    }
    else{
      // toast.error(data['message']);
      setTitle(data['message'])
    }
  }
  useEffect(()=>{
    getTitle()
  })
  return (
    <div 
        className='m-2 h-[14rem]  flex flex-col bg-blue-300 shadow-xl rounded-md hover:shadow-md cursor-pointer'
        onClick={()=>navigate(`/document/${documentId}`)}
      >
        <div className='h-[80%] bg-gray-100 rounded-t-md'></div>
        <div className='h-[30%] flex flex-col pl-2 pt-1'>
            <div>Title : <span className='italic'>{title}</span></div>
            <div>Role : <span className='italic'>{role}</span></div>
        </div>
    </div>

  )
}

export default DocumentCard