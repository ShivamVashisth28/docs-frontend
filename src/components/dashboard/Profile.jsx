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
            { profileSymbol && userData['name'][0].toUpperCase()}

        </div>  
         {showProfileMenu &&
            <div className='absolute  flex cursor-default  rounded-md flex-col bg-gray-400/30 w-[14rem] h-[11rem] text-black  top-[4rem] right-[1rem] text-sm gap-2'>
                
                <div className='h-4/6 pl-10 pt-6 flex flex-col gap-2 '>
                    <div className='flex'>
                        <div className='pr-1'>Username :</div>
                        <div className='font-'>{userData['username']}</div>
                    </div>

                    <div className='flex'>
                        <div className='pr-1'>Name : </div>
                        <div>{userData['name'][0].toUpperCase() + userData['name'].slice(1).toLowerCase()}</div>
                    </div>

                    <div className='flex italic'>
                        <div className='truncate'>{userData['email']}</div>
                    </div>
                </div>
                
                <div className='flex justify-center'>
                    <div 
                        className='p-2 bg-gray-400 shadow-sm flex justify-center w-[50%] rounded-md cursor-pointer hover:shadow-lg hover:bg-blue-200'
                        onClick={()=> handleLogout()}
                    >
                        Logout
                    </div>
                </div>
            </div>
        }
       </div>
    )
}

export default Profile