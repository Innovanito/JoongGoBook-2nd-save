import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { userQueryForMyAccount } from '../utils/data'

import MessageHeader from './MessageHeader'
import MessageWindow from './MessageWindow'
import DmSidebar from './DmSidebar'

const DM = () => {
  const [user_id, setUser_id] = useState()

  const { pinId } = useParams()

  const fetchUser_id = () => {
    const localData = localStorage.getItem('user')
    let idData = JSON.parse(localData)
    // 현재 브라우저 사용자가 accountInfo일때
    if (idData.userName?.length) {
      const query = userQueryForMyAccount(idData._id)
      if (query) {
        client.fetch(query)
          .then((data) => {
            setUser_id(data[0]._id)
          })
      }
    // 현재 브라우저 사용자가 googleId일때
    } else {
      setUser_id(idData.googleId)
    }
  }

  useEffect( () => {
    fetchUser_id()
  }, [])

  return (
    <div>
      <MessageHeader />
      <div className="flex-1 min-w-0 bg-white xl:flex relative ">
        <h1>HI</h1>
        <DmSidebar user_id={user_id} />
        <MessageWindow user_id={user_id} />
      </div>
      {/* {userId == owner ? <MessageWindowOwner /> : <MessageWindowBuyer />} */}
    </div>
  )
}

export default DM