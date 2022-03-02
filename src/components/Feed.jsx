import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

import {client} from '../client'
import { searchQuery, feedQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const {categoryId} = useParams()

  useEffect(() => {
    setLoading(true)

    if (categoryId) {
      const query = searchQuery(categoryId)

      client.fetch(query)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setPins(data)
          setLoading(false)
        })
    }
  }, [categoryId])
  

  if (loading) return <Spinner message='로딩중입니다' />

  return (
    <div>
      {
        (pins?.length === 0) ? 
          <div className="flex justify-center items-center text-xl font-bold">
            찾으시는 게시물이 존재하지 않습니다
          </div> :
          pins && <MasonryLayout pins={pins}/>
      }
    </div>
  )
}

export default Feed