import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({searchTerm}) => {
  const [pins, setPins] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (searchTerm) {
      setLoading(true)
      const query = searchQuery(searchTerm)

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
  }, [searchTerm])
  

  return (
    <div>
      {loading && <Spinner message='검색한 게시물 찾는중 ...' />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl">찾으시는 물품이 존재하지 않습니다</div>
      )}
    </div>
  )
}

export default Search