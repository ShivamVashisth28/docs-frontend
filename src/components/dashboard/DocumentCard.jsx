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
        className='m-2 h-[14rem]  flex flex-col bg-blue-300 shadow-lg rounded-md hover:shadow-sm cursor-pointer'
        onClick={()=>navigate(`/document/${documentId}`)}
      >
        <div className='h-[80%] bg-gray-100 rounded-t-md'></div>
        <div className='h-[30%] flex flex-col pl-2'>
            <div>title : {title}</div>
            <div>role : {role}</div>
        </div>
    </div>

  )
}

export default DocumentCard