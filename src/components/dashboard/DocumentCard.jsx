import React from 'react'

function DocumentCard({
    title,
    owner
}) {
  return (
    <div className='m-2 h-[14rem]  flex flex-col bg-blue-300 shadow-lg rounded-md hover:shadow-sm '>
        <div className='h-[80%] bg-gray-100 rounded-t-md'></div>
        <div className='h-[30%] flex flex-col pl-2'>
            <div>title : {title}</div>
            <div>owner : {owner}</div>
        </div>
    </div>
  )
}

export default DocumentCard