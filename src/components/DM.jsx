import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import { pinDetailQuery } from '../utils/data'

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
    <h1>dm</h1>
  )
}

export default DM