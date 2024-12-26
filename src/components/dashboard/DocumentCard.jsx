import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  {QuillDeltaToHtmlConverter}  from 'quill-delta-to-html'


function DocumentCard({
    role,
    documentId
}) {

  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [htmlContent, setHtmlContent] = useState('')


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

  const getContent = async () => {
    const response = await axios.get(`http://localhost:5000/document/content?documentId=${documentId}`)
    const data = await response.data
   
    if(data['status'] === 'success'){
      console.log(JSON.parse(data['content']))
      const delta = JSON.parse(data['content'])
      console.log(delta.ops)

      const convertor = new QuillDeltaToHtmlConverter(delta.ops, {});
      const html = convertor.convert()
      setHtmlContent(html)
    }
  }

  useEffect(()=>{
    getTitle()
    getContent()
  })


  return (
    <div 
        className='m-2 h-[14rem]  flex flex-col bg-blue-300 shadow-xl rounded-md hover:shadow-md cursor-pointer'
        onClick={()=>navigate(`/document/${documentId}`)}
      >
        <div className='h-[80%] bg-gray-100 rounded-t-md p-4 px-6 text-[10px] italic overflow-hidden ' dangerouslySetInnerHTML={{__html: htmlContent}}></div>
        <div className='h-[30%] flex flex-col pl-2 pt-1'>
            {/* <div>Title : <span className='italic'>{title}</span></div>
            <div>Role : <span className='italic'>{role}</span></div> */}

            <div className='flex justify-center text-2xl italic'>{title}</div>
            <div className='flex justify-center text-sm italic'>{role}</div>
        </div>
    </div>

  )
}

export default DocumentCard