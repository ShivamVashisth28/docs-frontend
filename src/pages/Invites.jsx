import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { URL } from '../utils/backendUrl.js'

function Invites() {
    const {documentId, inviteCode} = useParams()
    const navigate = useNavigate()
    const [message, setMessage] = useState("")


    const setAccess = async ()=>{
        const response = await axios.post(`${URL}/document/inviteCode?documentId=${documentId}&inviteCode=${inviteCode}`, {}, {withCredentials:true})
        const data = await response.data
        console.log(data)
        setMessage(data['message'])        
    }

    useEffect(()=>{
        setAccess()
    },[])
  return (
    <div className='h-screen w-screen flex justify-center items-center' >
        <div className='h-1/2 w-1/3 rounded-lg bg-blue-300 shadow-xl flex flex-col  justify-center items-center  text-lg gap-2 font-serif'>
            <div className='text-3xl' >
                {message}
            </div>
            <div 
                className='hover:underline cursor-pointer'
                onClick={()=>navigate(`/document/${documentId}`)}
            >
                Click Here
            </div>
        </div>

        <div 
            className='absolute top-[5%] left-[2%] text-xl bg-blue-300 p-2 rounded-lg cursor-pointer hover:shadow-xl'
            onClick={()=>{navigate("/")}}
        >
            HOME
        </div>
    </div>
  )
}

export default Invites