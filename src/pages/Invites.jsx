import React from 'react'
import { useParams } from 'react-router-dom'

function Invites() {
    const {documentId, inviteCode} = useParams()

    // http://localhost:5000/document/inviteCode?documentId=${documentId}&accessType=${shareLinkType}
  return (
    <div>
        <div>Document Id : {documentId}</div>
        <div>invite code : {inviteCode}</div>
    </div>
  )
}

export default Invites