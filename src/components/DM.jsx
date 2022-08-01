import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { pinDetailQuery } from '../utils/data'

import MessageHeader from './MessageHeader'
import MessageWindow from './MessageWindow'
import MessageFooter from './MessageFooter'

const DM = () => {
  const [pinDetail, setPinDetail] = useState(null)
  const { pinId } = useParams()

  const fetchPinDetails = (pinId) => {
    const query = pinDetailQuery(pinId)
    if (query) {
      client.fetch(query)
        .then((data) => {
          console.log('data info', data[0]);
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
      <MessageFooter />
    </div>
  )
}

export default DM