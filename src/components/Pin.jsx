import React, {useState} from 'react'
import { Link, Navigate, useNavigate} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'


import {client, urlFor } from '../client'
import { fetchUser } from '../utils/fetchUser'
import moneyIcon from '../assets/money-icon.png'

const Pin = ({ pin, isUserProfile, text }) => {
  // isUserProfile은 핀의 게시물이 UserProfile.jsx에 있을 때 맞는 Boolean 변수
  // text는 게시물을 보여줄 때 사용자가 생성한 게시물(Created)인지, 아니면 찜한 게시물(Saved)인지 알려주는 변수
  const { postedBy, image, _id, save, title, price } = pin
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost, setSavingPost] = useState(false)
  const [itemNotSold, setItemNotSold] = useState(true)
  const navigate = useNavigate()
  const user = fetchUser()

  //핀의 정보가 저장되어 있는지 아닌지 Boolean의 값으로 저장하는 변수
  let alreadySaved = !!(save?.filter((item) => item?.postedBy?._id === user?.googleId))?.length

  const savePin = (id) => {
    if (!alreadySaved) {
      setSavingPost(true)

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user?.googleId,
          postedBy: {
            _type: 'postedBy',
            _ref: user?.googleId
          }
        }])
        .commit()
        .then(() => {
          window.location.reload()
          setSavingPost(false)
        })
    }
  }

  const pinToPinSold = (id) => {
    // client
    //   .patch(id)
    //   .set({isSold: true})
    //   .commit()
    //   .then(() => {
    //     setIsItemSold(true)
    //     window.location.reload()
    //   })
    //client를 들어가서   pin 안에 있는 isSold 항목을 true로 바꿔준다

    // isSold가 true인 pin은 userProfile 안에 있는 pin 항목에서 제거시켜준다
    // isSold가 true인 pin은 home에 있는 feed.js에서 하얀색으로 바꾸던지 아니면 아예 제거시켜주기
  }
  console.log('info of isUerprofile', isUserProfile);

  return (
      <div className='m-2'>
        <div
          onMouseEnter={() => setPostHovered(true)}
          onMouseLeave={() => setPostHovered(false)}
          onClick={() => navigate(`/pin-detail/${_id}`)}
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
              style={{ height: '100%' }}
            >
              <div className="flex items-center justify-between">
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
            </div>
          )}
        </div>
        <div className="flex flex-col p-1">
          <Link to='/pin-detail/:pinId' className='flex flex-col gap2 mt-2 ' >
            <p className='p-2'>{title}</p>
            <div className="flex">
              <img src={moneyIcon} alt="money-icon" className='w-7' />
              <span>{price} 원</span>
            </div>
          </Link>
          {isUserProfile &&
            text === 'Created' &&
            <button
              className=' border-2'
              onClick={pinToPinSold(_id)}
            >
              거래완료로 변경
            </button>
          }
        </div>
      </div>
    )
}

export default Pin