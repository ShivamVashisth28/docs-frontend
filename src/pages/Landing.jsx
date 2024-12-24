import React, { useEffect } from 'react';
import Navbar from '../components/landing/Navbar';
import { useNavigate } from 'react-router-dom';
import userState from '../atoms/userStateAtom';
import { useRecoilState } from 'recoil';

function Landing() {
    
    const navigate = useNavigate()
    const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState)
    
    useEffect(()=>{
        if(isUserLoggedIn){
            navigate("/documents")
        }
    },[isUserLoggedIn])

    return (
        <div className="h-screen w-screen bg-gray-50">
            <Navbar />
            <div className="flex flex-col items-center pt-[8rem]  px-6 text-center">
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-600 leading-tight">
                Create Realtime Documents <br />
                <span className="text-gray-800">Collaborate Seamlessly with Your Team</span>
            </h1>
            
            
            <p className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl">
                Enhance productivity and teamwork with our cutting-edge platform for real-time collaboration.
            </p>
            
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button 
                    className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md text-lg transition"
                    onClick={()=>navigate('/signup')}
                >
                Get Started
                </button>
                <button 
                    className="px-6 py-3 text-blue-500 border border-blue-500 hover:bg-blue-50 rounded-lg shadow-md text-lg transition"
                    onClick={()=>navigate('/login')}
                >
                Login
                </button>
            </div>

            </div>
        </div>
    );
}

export default Landing;
