import React, { useEffect, useState } from 'react'
import Navbar from '../components/dashboard/Navbar'
import DocumentCard from '../components/dashboard/DocumentCard';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userState from '../atoms/userStateAtom';
import axios from 'axios';

function Dashboard() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useRecoilState(userState)
  const navigate = useNavigate()
  

  useEffect(()=>{
      if(!isUserLoggedIn){
          navigate('/')
      }
  },[setIsUserLoggedIn])
  
  const documents = [
    {
      title: "Science",
      owner: "Shivam",
    },
    {
      title: "Mathematics",
      owner: "Ravi",
    },
    {
      title: "History",
      owner: "Anjali",
    },
    {
      title: "Computer Science",
      owner: "Deepak",
    },
    {
      title: "Literature",
      owner: "Priya",
    },
    {
      title: "Physics",
      owner: "Amit",
    },
    {
      title: "Chemistry",
      owner: "Neha",
    },
    {
      title: "Biology",
      owner: "Vikram",
    },
    {
      title: "Geography",
      owner: "Sonia",
    },
    {
      title: "Economics",
      owner: "Alok",
    },
    {
      title: "Economics",
      owner: "Alok",
    },
    {
      title: "Economics",
      owner: "Alok",
    },
    {
      title: "Economics",
      owner: "Alok",
    },
    {
      title: "Economics",
      owner: "Alok",
    },
    {
      title: "Economics",
      owner: "Alok",
    },{
      title: "Economics",
      owner: "Alok",
    },
    {
      title: "Economics",
      owner: "Alok",
    }
  ];
  
  return (
    <div className='h-screen w-screen flex flex-col'>
        <Navbar />
        <div className='pt-10 h-full grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 px-28 overflow-auto  '>
            {
              documents.map((document)=>(
                <DocumentCard title={document.title} owner={document.owner}/>
              ))
            }
        </div>

    </div>
  )
}

export default Dashboard