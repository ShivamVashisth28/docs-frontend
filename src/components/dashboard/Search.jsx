import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Search({setDocuments}) {

  const [keyword, setKeyword] = useState("")
  const [isEmpty, setIsEmpty] = useState(false)
  const [isInputEmpty, setIsInputEmpty] = useState(true)

  const getDocumentsFromSearch = async () => {
    const response = await axios.get(`http://localhost:5000/user/getUserDocuments/${keyword.trim()}`, {withCredentials: true, params:{ keyword}})
    const data = await response.data
    
    if(data['status'] === 'Success'){
        setDocuments(data['docs'])
        
        if(data['docs'].length === 0){
          setIsEmpty(true)
        }else{
          setIsEmpty(false)
        }
    }

  }

  const getAllDcos = async () => {
    const response = await axios.get("http://localhost:5000/user/getUserDocuments", {withCredentials:true})
    const data = await response.data
    if(data['status'] === 'success'){
      setDocuments(data['documents']);
    }
  }

  const handleOnChange = (e) => {
    setKeyword(e.target.value);
    if (!e.target.value.trim()) {
      setIsInputEmpty(true) 
    } else {
      setIsInputEmpty(false) 
    }
  }

  useEffect(()=>{
    const debounceTimeout = setTimeout(() => {
      if (keyword.trim()) {
        getDocumentsFromSearch();
      }
    }, 300); 

    return () => clearTimeout(debounceTimeout);

  },[keyword])

  useEffect(()=>{
    getAllDcos()
  },[isInputEmpty])

  return (
    <label class="relative block text-black ">
        <span class="sr-only">Search</span>
        <span class="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className='h-5 w-5   ' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g clip-path="url(#clip0_15_152)"> <rect width="24" height="24" fill="white"></rect> <circle cx="10.5" cy="10.5" r="6.5" stroke="#000000" stroke-linejoin="round"></circle> <path d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="#000000"></path> </g> <defs> <clipPath id="clip0_15_152"> <rect width="24" height="24" fill="white"></rect> </clipPath> </defs> </g></svg>
        </span>
        <input 
          class="placeholder:italic placeholder:text-slate-400 block rounded-lg bg-white w-full border border-slate-300  py-2 pl-9 pr-10 shadow-sm focus:outline-none  sm:text-sm" 
          placeholder="Search for any document..." 
          type="text" 
          name="search"
          value={keyword}
          onChange={(e) => handleOnChange(e)} 
          />

          { isEmpty && !isInputEmpty &&
            <div className='absolute top-[10rem] left-[-5rem] shadow-md bg-slate-200 rounded-md text-2xl w-[25rem] p-2 '>
                <div className=''>No Documents found with "{keyword}"</div>
            </div>}
    </label>
  )
}

export default Search