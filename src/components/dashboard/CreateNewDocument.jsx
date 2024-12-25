import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function CreateNewDocument() {

    const [isCreateNewDialogOpen, setIsCreateNewDialogOpen] = useState(false)
    const [documentName, setDocumentName] = useState("")
    const navigate = useNavigate()

    const onCreate = async () => {
      if(!documentName){
          toast.error("Enter Document Name")
          return
      }
      const response = await axios.post('http://localhost:5000/document/create', {
        title: documentName
      },{
        withCredentials:true
      })
      
      const data = await response.data

      if(data['status'] === 'Error'){
        return toast.error(data['message'])
      }

      navigate(`/document/${data['documentId']}`)
    } 

    return (
      <div>
        <div 
        className='flex justify-center  rounded-full bg-white text-blue-500 text-4xl w-12 h-12 cursor-pointer hover:bg-gray-50 hover:shadow-sm shadow-md'
        onClick={()=> setIsCreateNewDialogOpen(true)}
      >
        +
      </div>
      {
        isCreateNewDialogOpen && 
        <div className='absolute h-screen w-screen bg-gray-400/70 top-0 left-0 flex justify-center items-center'>
          <div 
            className='absolute top-[25%] bg-blue-400 h-10 w-10 rounded-full justify-center flex items-center text-2xl cursor-pointer hover:shadow-sm shadow-xl hover:scale-110 transition-all '
            onClick={()=>setIsCreateNewDialogOpen(false)}
          >X</div>
          <div className='h-[35%] w-[20%] bg-blue-300 shadow-lg rounded-lg justify-center flex flex-col items-center'>
              <input 
                  type="text" 
                  autoFocus={true}
                  placeholder='Document Title...' 
                  className='placeholder:italic placeholder:font-sans placeholder:font-light focus:outline-none rounded-md p-2'
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
               />
              <button 
                  className='cursor-pointer  rounded-md p-2 mt-10 hover:bg-blue-200 bg-blue-400 shadow-xl '
                  onClick={()=>onCreate()}
              >
                Create
              </button>
          </div>
        </div>
      }

      <ToastContainer

      />
      </div>
    )
}

export default CreateNewDocument