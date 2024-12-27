import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NewEditor from '../components/NewEditor'
import Navbar from '../components/document/Navbar'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import userState from '../atoms/userStateAtom'
import { URL } from '../utils/backendUrl.js'


function Document() {
    
    const {documentId} = useParams()
    
    const [connectedUser, setConnectedUsers] = useState([])

    const [documentName, setDocumentName] = useState("")
    const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState)
    const [userType, setUserType] = useState("none")

    const navigate = useNavigate()

    const setName = async () => {
        const response = await axios.get(`${URL}/document/getTitle?documentId=${documentId}`)
        const data = await response.data
        if(data['status'] === 'Error'){
            navigate('/documents')
        }
        setDocumentName(data['title']);
    }

    const getUserType = async () => {
        const response = await axios.get(`${URL}/document/userType?documentId=${documentId}`, {withCredentials:true})
        const data = await response.data
        if(data['status'] === 'success'){
            console.log("success");
            console.log(data)
            setUserType(data['userType'])
        } else {
            if(userType === 'none'){
                navigate("/")
            }
        }
    }

    useEffect(()=>{
        if(!isUserLoggedIn){
            navigate('/')
        }
    },[setIsUserLoggedIn])

    useEffect(()=>{
        setName()
    },[documentName])

    useEffect(()=>{
        getUserType()
    },[userType])

    

    return (
    <div className='flex flex-col items-center'>
        <Navbar documentTitle={documentName} setDocumentName={setDocumentName} userType={userType} connectedUser={connectedUser} />
        <NewEditor userType={userType}  setConnectedUsers = {setConnectedUsers} />
    </div>
    )
}

export default Document