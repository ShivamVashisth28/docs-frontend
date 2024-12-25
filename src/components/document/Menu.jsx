import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function Menu({setDocumentName, userType}) {
    const [isOpen, setIsOpen] = useState(false)

    const navigate = useNavigate()
    const { documentId } = useParams()

    const [openRenameWindow, setOpenRenameWindow] = useState(false)
    const [openDeleteWindow, setOpenDeleteWindow] = useState(false)
    const [openShareWindow, setOpenShareWindow] = useState(false)

    const [newTitle, setNewTitle] = useState("")

    const [inviteCode, setInviteCode] = useState("")
    const [shareLinkType, setShareLinkType] = useState("editor")
    const [inviteLink, setInviteLink] = useState("")

    const handleMenuClick = ()=>{
        setIsOpen(prev=>!prev)
        setOpenDeleteWindow(false)
        setOpenShareWindow(false)
        setOpenRenameWindow(false)
    }

    const handleOnRenameClose = ()=>{
        setNewTitle("")
        setOpenRenameWindow(false)
    }

    const handleOnRenameOpen = async ()=>{
        await renameDocument()
        setOpenRenameWindow(false)
        setDocumentName(newTitle)
        setNewTitle("")
    }

    const handleRenameClick = ()=>{
        setNewTitle("")
        setOpenDeleteWindow(false)
        setOpenShareWindow(false)
        setOpenRenameWindow(prev => !prev)
    }   

    const handleDeleteClick = () => {
        setOpenDeleteWindow(prev => !prev)
        setOpenShareWindow(false)
        setOpenRenameWindow(false)
    }

    const handleShareClick = () => {
        setOpenDeleteWindow(false)
        setOpenShareWindow(prev => !prev)
        setOpenRenameWindow(false)
    }

    const renameDocument = async () => {
        const resposne = await axios.post(`http://localhost:5000/document/rename?documentId=${documentId}`, {
            newTitle
        })
        const data = resposne.data
        if(data['status'] !== 'success'){
            toast.error(data['message'])
        }else{

            toast.info(data['message'])
        }
    }

    const deleteDocument = async () => {
        const response = await axios.delete(`http://localhost:5000/document/delete?documentId=${documentId}`, {withCredentials: true})
        const data = response.data
        if(data['status'] != 'success'){
            toast.error(data['message'])
        }
        else{
            toast.info(data['message']);
        }
        navigate('/')
        
    }

    const getInviteLink = async () => {
        const response = await axios.get(`http://localhost:5000/document/inviteCode?documentId=${documentId}&accessType=${shareLinkType}`, {withCredentials:true})
        const data = await response.data

        if(data['status'] != 'success'){
            toast.error(data['message'])
        }
        else{
            setInviteCode(data['inviteCode'])
        }
        console.log(data)

    }

    const setFinalInviteLink = () =>{
        const link = `http://localhost:5173/invite/${documentId}/${inviteCode}`
        setInviteLink(link)
    }

    const copyLinkToClipboard = async () => {
        await navigator.clipboard.writeText(inviteLink)
        toast.info("Copied Linked to Clipboard!!")
        setOpenShareWindow(false)
    }

    useEffect(() => {
        getInviteLink();
      }, [shareLinkType]);
      
    useEffect(() => {
    setFinalInviteLink();
    }, [inviteCode]);

    return (
    <div className=''>
        <div className='text-blue-600 text-3xl font-bold cursor-pointer' onClick={()=>handleMenuClick()}>
            <svg className='h-10' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#60afd7"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#5b94ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
        </div>

        { isOpen && 
            <div className='absolute flex rounded-md flex-col bg-gray-300/30 w-[10%]  top-16 text-md gap-2'>
                <div 
                    className={`hover:bg-gray-200 cursor-pointer p-2 items-center gap-2 ${userType==='viewer' ? 'hidden' : 'flex'} `}
                    onClick={()=>handleRenameClick()}
                >
                    <svg className='h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z" stroke="#5b94ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <div>Rename</div>
                </div>
                <div 
                    className={`hover:bg-gray-200 cursor-pointer p-2 items-center gap-2 ${userType!=='owner' ? 'hidden' : 'flex'} `}
                    onClick={()=>handleDeleteClick()}
                >
                    <svg className='h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 5H18M9 5V5C10.5769 3.16026 13.4231 3.16026 15 5V5M9 20H15C16.1046 20 17 19.1046 17 18V9C17 8.44772 16.5523 8 16 8H8C7.44772 8 7 8.44772 7 9V18C7 19.1046 7.89543 20 9 20Z" stroke="#5b94ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                    <div>Delete</div>
                </div>
                <div 
                    className={`hover:bg-gray-200 cursor-pointer p-2 items-center gap-2 ${userType!=='owner' ? 'hidden' : 'flex'} `}
                    onClick={()=> handleShareClick()}    
                >
                    <svg className='h-6' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z" fill="#5b94ff"></path> </g></svg>
                    <div>Share</div>
                </div>
                <div 
                    className='hover:bg-gray-200 cursor-pointer p-2 flex items-center gap-2 '
                    onClick={()=>navigate("/documents") }    
                >
                    <svg className='h-6' viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1 6V15H6V11C6 9.89543 6.89543 9 8 9C9.10457 9 10 9.89543 10 11V15H15V6L8 0L1 6Z" fill="#5b94e1"></path> </g></svg>
                    <div>Home</div>
                </div>
            </div>
        }

        {
            openShareWindow && 
            <div className='bg-gray-300 absolute top-[10rem] left-[14.6rem] h-[5.5rem] rounded-md w-[30%] z-10'>
                <div 
                    className='m-2 cursor-pointer bg-gray-200/30 shadow-md'
                    onClick={()=>navigate(`/invite/${documentId}/${inviteCode}`)} 
                >   
                    {inviteLink.slice(0,30) + inviteLink.slice(-20,-1) + "....."}
                </div>
                <div className='pl-2 pt-2 flex justify-between'>
                    <div className='flex gap-2'>
                        <div>Access type : </div>
                        <div className='flex gap-2'>
                            <div 
                                className={` rounded-sm p-1 font-semibold hover:bg-blue-200 cursor-pointer ${shareLinkType === 'editor' ? 'shadow-lg bg-blue-300' : "bg-gray-400" }`}
                                onClick={()=>setShareLinkType('editor')}
                            >
                                Editor
                            </div>
                            <div 
                                className={` rounded-sm p-1 font-semibold hover:bg-blue-200 cursor-pointer ${shareLinkType === 'viewer' ? 'shadow-lg bg-blue-300' : "bg-gray-400" }`}
                                onClick={()=>setShareLinkType('viewer')}
                            > 
                                Viewer
                            </div>
                        </div>
                    </div>

                    <div 
                        className='mr-12 p-1 cursor-pointer bg-gray-400 rounded-sm hover:bg-blue-200 hover:shadow-md'
                        onClick={()=>copyLinkToClipboard()}
                    >
                        Copy
                    </div>
                </div>
            </div>
        }
        
        {
            openRenameWindow && 
            <div className='absolute top-[4rem] left-[14.6rem]  bg-gray-400/50 left-50 flex z-10 '>
                <div>
                    <input  
                        type="text" 
                        className='focus:outline-none p-1 placeholder:italic placeholder:font-light m-2' 
                        placeholder='New Title... '
                        value={newTitle}
                        onChange={(e)=>setNewTitle(e.target.value)}
                        />
                    <div className='flex justify-around'>
                        <div >
                            <svg className='h-5 cursor-pointer' onClick={()=> handleOnRenameClose()}  viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-467.000000, -1039.000000)" fill="#000000"> <path d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 L489.396,1061.4 Z M485.148,1051.48 L490.813,1045.82 C492.376,1044.26 492.376,1041.72 490.813,1040.16 C489.248,1038.59 486.712,1038.59 485.148,1040.16 L479.484,1045.82 L473.82,1040.16 C472.257,1038.59 469.721,1038.59 468.156,1040.16 C466.593,1041.72 466.593,1044.26 468.156,1045.82 L473.82,1051.48 L468.156,1057.15 C466.593,1058.71 466.593,1061.25 468.156,1062.81 C469.721,1064.38 472.257,1064.38 473.82,1062.81 L479.484,1057.15 L485.148,1062.81 C486.712,1064.38 489.248,1064.38 490.813,1062.81 C492.376,1061.25 492.376,1058.71 490.813,1057.15 L485.148,1051.48 L485.148,1051.48 Z" id="cross" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        </div>
                        <div>
                            <svg className='h-5 cursor-pointer' onClick={()=> handleOnRenameOpen()}  fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.014,70.462c-2.617,0-5.073-1.016-6.917-2.859L2.175,53.877c-1.908-1.906-2.926-4.364-2.926-6.979 s1.018-5.072,2.866-6.92c1.849-1.849,4.307-2.866,6.921-2.866c2.591,0,5.029,1,6.872,2.818l8.102,7.109L55.861,4.618 c0.057-0.075,0.119-0.146,0.186-0.213c1.849-1.85,4.307-2.867,6.921-2.867s5.072,1.018,6.921,2.867 c3.784,3.784,3.815,9.923,0.093,13.747L31.697,67.416c-0.051,0.065-0.106,0.128-0.165,0.188c-1.914,1.912-4.498,2.926-7.214,2.854 C24.216,70.46,24.116,70.462,24.014,70.462z M9.037,41.112c-1.546,0-2.999,0.602-4.093,1.695C3.851,43.9,3.25,45.353,3.25,46.898 s0.602,3,1.694,4.093l14.922,13.726c1.148,1.146,2.6,1.914,4.148,1.914l0.227,0.164c0.05,0,0.1,0,0.151,0l0.221-0.164 c1.51,0,2.929-0.654,4.008-1.69l38.275-49.294c0.051-0.065,0.105-0.148,0.165-0.207c2.256-2.258,2.256-5.939,0-8.195 c-1.094-1.094-2.547-1.701-4.093-1.701c-1.502,0-2.917,0.566-3.999,1.602L25.914,51.169c-0.335,0.445-0.84,0.73-1.394,0.787 c-0.551,0.057-1.106-0.118-1.525-0.486l-9.771-8.573c-0.032-0.028-0.064-0.058-0.095-0.089 C12.036,41.714,10.583,41.112,9.037,41.112z"></path> </g> </g></svg>
                        </div>
                    </div>
                </div>
            </div>
        }
        {
            openDeleteWindow && 
                <div className='absolute top-[7.5rem] left-[14.6rem]  bg-gray-400/50 left-50 flex z-10 justify-around w-[7%] p-2 '>
                        <div >
                            <svg className='h-5 cursor-pointer' onClick={()=> setOpenDeleteWindow(false)}  viewBox="0 0 25 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-467.000000, -1039.000000)" fill="#000000"> <path d="M489.396,1061.4 C488.614,1062.18 487.347,1062.18 486.564,1061.4 L479.484,1054.32 L472.404,1061.4 C471.622,1062.18 470.354,1062.18 469.572,1061.4 C468.79,1060.61 468.79,1059.35 469.572,1058.56 L476.652,1051.48 L469.572,1044.4 C468.79,1043.62 468.79,1042.35 469.572,1041.57 C470.354,1040.79 471.622,1040.79 472.404,1041.57 L479.484,1048.65 L486.564,1041.57 C487.347,1040.79 488.614,1040.79 489.396,1041.57 C490.179,1042.35 490.179,1043.62 489.396,1044.4 L482.316,1051.48 L489.396,1058.56 C490.179,1059.35 490.179,1060.61 489.396,1061.4 L489.396,1061.4 Z M485.148,1051.48 L490.813,1045.82 C492.376,1044.26 492.376,1041.72 490.813,1040.16 C489.248,1038.59 486.712,1038.59 485.148,1040.16 L479.484,1045.82 L473.82,1040.16 C472.257,1038.59 469.721,1038.59 468.156,1040.16 C466.593,1041.72 466.593,1044.26 468.156,1045.82 L473.82,1051.48 L468.156,1057.15 C466.593,1058.71 466.593,1061.25 468.156,1062.81 C469.721,1064.38 472.257,1064.38 473.82,1062.81 L479.484,1057.15 L485.148,1062.81 C486.712,1064.38 489.248,1064.38 490.813,1062.81 C492.376,1061.25 492.376,1058.71 490.813,1057.15 L485.148,1051.48 L485.148,1051.48 Z" id="cross" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>
                        </div>
                        <div>
                            <svg className='h-5 cursor-pointer' onClick={()=> deleteDocument()}  fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M24.014,70.462c-2.617,0-5.073-1.016-6.917-2.859L2.175,53.877c-1.908-1.906-2.926-4.364-2.926-6.979 s1.018-5.072,2.866-6.92c1.849-1.849,4.307-2.866,6.921-2.866c2.591,0,5.029,1,6.872,2.818l8.102,7.109L55.861,4.618 c0.057-0.075,0.119-0.146,0.186-0.213c1.849-1.85,4.307-2.867,6.921-2.867s5.072,1.018,6.921,2.867 c3.784,3.784,3.815,9.923,0.093,13.747L31.697,67.416c-0.051,0.065-0.106,0.128-0.165,0.188c-1.914,1.912-4.498,2.926-7.214,2.854 C24.216,70.46,24.116,70.462,24.014,70.462z M9.037,41.112c-1.546,0-2.999,0.602-4.093,1.695C3.851,43.9,3.25,45.353,3.25,46.898 s0.602,3,1.694,4.093l14.922,13.726c1.148,1.146,2.6,1.914,4.148,1.914l0.227,0.164c0.05,0,0.1,0,0.151,0l0.221-0.164 c1.51,0,2.929-0.654,4.008-1.69l38.275-49.294c0.051-0.065,0.105-0.148,0.165-0.207c2.256-2.258,2.256-5.939,0-8.195 c-1.094-1.094-2.547-1.701-4.093-1.701c-1.502,0-2.917,0.566-3.999,1.602L25.914,51.169c-0.335,0.445-0.84,0.73-1.394,0.787 c-0.551,0.057-1.106-0.118-1.525-0.486l-9.771-8.573c-0.032-0.028-0.064-0.058-0.095-0.089 C12.036,41.714,10.583,41.112,9.037,41.112z"></path> </g> </g></svg>
                        </div>
            </div>
        }

    </div>
    )
}

export default Menu