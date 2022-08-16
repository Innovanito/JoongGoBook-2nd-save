import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { pinDetailQuery } from '../utils/data'

import MessageHeader from './MessageHeader'
import MessageWindow from './MessageWindow'

const DM = () => {
  const [pinDetail, setPinDetail] = useState(null)
  const { pinId } = useParams()

  //게시물의 상세정보를 가져오는 쿼리
  const fetchPinDetails = (pinId) => {
    const query = pinDetailQuery(pinId)
    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0])
        })
    }
  }

  useEffect(() => {
    fetchPinDetails() 
  }, [pinId])
  return (
    <div>
      <MessageHeader />
      <MessageWindow />
      {/* {userId == owner ? <MessageWindowOwner /> : <MessageWindowBuyer />} */}
    </div>
  )
}

export default DM