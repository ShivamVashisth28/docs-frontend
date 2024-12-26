import React, { useEffect, useState } from 'react'
import Navbar from '../components/dashboard/Navbar'
import DocumentCard from '../components/dashboard/DocumentCard';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userState from '../atoms/userStateAtom';
import axios from 'axios';
import { URL } from '../utils/backendUrl.js';

function Dashboard() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState)
  const navigate = useNavigate()
  const [documents, setDocuments] = useState([])
  
  const getDocuments = async () => {
      const response = await axios.get(`${URL}/user/getUserDocuments`, {withCredentials:true})
      const data = await response.data
   
      setDocuments(data['documents'])
  
  }

  useEffect(()=>{
    getDocuments()
  },[])

  useEffect(()=>{
      if(!isUserLoggedIn){
          navigate('/')
      }
  },[setIsUserLoggedIn])

  
  
  
  return (
    <div className='h-screen w-screen flex flex-col'>
        <Navbar setDocuments={setDocuments}/>
        <div className='pt-10 h-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 px-28 overflow-auto  '>
            {
              documents.map((document, index)=>(
                <DocumentCard key={index} documentId={document['documentId']} role={document['role']}/>
              ))
            }
            {
              documents.length === 0 && 
                <div className='text-xl col-span-2 tracking-wide'>
                  No documents !! Start By  Creating One ;)
                </div>
            }
        </div>

    </div>
  )
}

export default Dashboard