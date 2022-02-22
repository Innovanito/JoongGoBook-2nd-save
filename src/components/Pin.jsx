import React, {useState} from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import { v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'

import {client, urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin: {postedBy, image, _id, destination, save}}) => {
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)

  const navigate = useNavigate()
  const user = fetchUser()

  //핀의 정보가 저장되어 있는지 아닌지 Boolean의 값으로 저장하는 변수
  let alreadySaved = !!(save?.filter((item) => item.postedBy._id === user.googleId))?.length

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true)

      client
        .patch(id)
        .setIfMissing({ save: []})
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user.googleId
          }
        }])
        .commit()
        .then(() => {
          window.location.reload()
          setSavingPost(false)
        })
    }
  }

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload()
      })
  }

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => Navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img
          className="rounded-lg w-full"
          alt='user-post'
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
            style={{height: '100%'}}
          >
            <div className="flex items-center justify-between">
              <div className="felx gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) =>e.stopPropagation() }
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className='bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none' >
                  찜한 제품
                </button>
              ) : (
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation()
                      savePin(_id)
                    }}
                    className='bg-red-500 opacity-75 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none' >
                  찜하기
                </button>
              )}
            </div>
            <div className="flex justify-end items-center gap-2 w-full">
              <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePin(_id)
                  }}
                  className='bg-white p-2 font-bold rounded-3xl hover:shadow-md outline-none' >
                  <AiTwotoneDelete />
                </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col p-1">
        <Link to='/pin-detail/:pinId' className='flex gap2 mt-2 items-center' >
          <p className='p-2'>여기는 제품의 상품명이 옵니다</p>
        </Link>
        <Link to={`user-profile/${postedBy?._id}`} className='flex gap2 mt-2 items-center' >
          <img className='w-8 h-8 rounded-full object-cover' src={postedBy?.image} alt="user-profile" />
          <p className='font-semibold p-2'>{postedBy?.userName}</p>
        </Link>
      </div>
    </div>
  )
}

export default Pin