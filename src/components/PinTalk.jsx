import React, { useState, useEffect } from 'react'

import { client } from '../client'
import { pinDetailQuery} from '../utils/data'



const PinTalk = () => {
  const [pinDetail, setPinDetail] = useState(null)

  const fetchPinDetails = () => {
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
    <div>PinTalk</div>
  )
}

export default PinTalk