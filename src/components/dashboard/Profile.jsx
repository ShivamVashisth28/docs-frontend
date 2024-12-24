import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import userState from '../../atoms/userStateAtom'
import { useNavigate } from 'react-router-dom'

function Profile() {
    
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const [userData,setUserData] = useState({})
    const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState)
    const [profileSymbol, setProfileSymbol] = useState('')
    const navigate = useNavigate()

    const getUserDetails = async ()=>{
        const response = await axios.get("http://localhost:5000/user/getUserDetails", {withCredentials:true});
        const data = await response.data
        setProfileSymbol(data['user']['name'].toUpperCase())
        setUserData(data["user"])
        
    }

    const handleLogout = async () => {
        const response = await axios.get("http://localhost:5000/user/getUserDetails", {withCredentials:true})
        const data = await response.data
        if(data['status'] === 'success'){
            setIsUserLoggedIn(false)
            navigate('/')
        }
    }

    useEffect(()=>{
        getUserDetails()
    },[showProfileMenu])

    return (
       <div>
         <div 
            className='rounded-full bg-blue-500 cursor-pointer text-white text-semibold w-12 h-12 flex justify-center items-center text-3xl shadow-lg hover:shadow-sm hover:bg-blue-400 '
            onClick={()=> setShowProfileMenu(prev => !prev)}
        >
            { profileSymbol && userData['name'][0]}

        </div>  
         {showProfileMenu &&
            <div className='absolute flex justify-center items-center rounded-md flex-col bg-gray-400/30 w-[15%] h-[30%] text-black font-semibold top-[8%] right-[2%] text-sm gap-2'>
                <div 
                    className='p-2 bg-gray-300 w-[50%] cursor-pointer'
                    onClick={()=> handleLogout()}
                >Logout</div>
            </div>
        }
       </div>
    )
}

export default Profile