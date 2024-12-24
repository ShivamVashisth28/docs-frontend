import React from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
 
    const navigate = useNavigate()

    return (
        <div className='h-[10%] flex text-blue-600 items-center bg-gray-200 justify-between px-20  '>
                <div 
                    className='font-bold text-3xl cursor-default'
                >
                    DOCS
                </div>
                <div className='flex gap-10 pr-10 text-xl'>
                    <div 
                        className='rounded-lg p-2 cursor-pointer hover:scale-110 hover:font-semibold transition-all '
                        onClick={()=>navigate('/login')}
                    >
                        Login
                    </div>
                    <div 
                        className='rounded-lg p-2 cursor-pointer hover:scale-110 hover:font-semibold transition-all '
                        onClick={()=>navigate('/signup')}
                    >
                        Sign Up
                    </div>
                </div>
        </div>
    )
}

export default Navbar