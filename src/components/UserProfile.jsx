import React, { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';

import { userCreatedPinsQuery, userQuery, userQueryForMyAccount2, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';
import userIcon from '../assets/user-icon.png'

const randomImage = 'https://source.unsplash.com/1600x900/?library'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-35 outline-none';
const notActiveBtnStyles = 'mr-4 text-black font-bold p-2 rounded-full w-35 outline-none opacity-50';

const UserProfile = ({user}) => {
  const [pins, setPins] = useState()
  const [text, setText] = useState('Created') //'Created' or 'Saved'
  const [activeBtn, setActiveBtn] = useState('created')
  const [isGoogleAccount, setIsGoogleAccount] = useState(user?.googleId)
  const [isUserProfile, setIsUserProfile] = useState(true)

  const navigate = useNavigate()
  const { userId } = useParams()

  // useEffect(() => {
  //   let query = userQueryForMyAccount2(userId) 
    
  //   // 이 부분에서 잘못됨
  //   client
  //   .fetch(query)
  //   .then((data) => {
  //     setUser(data[0])
  //     console.log('userData in loop', user);
  //       setIsGoogleAccount(false)
  //     })
  //   if (isGoogleAccount) {
  //     query = userQuery(userId);
  //     client
  //       .fetch(query)
  //       .then((data) => {
  //         setUser(data[0])
  //         setIsGoogleAccount(false)
  //       })
  //     .catch('error occured')
  //   }

  // }, [userId])

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId)

      client.fetch(createdPinsQuery)
        .then((data) => {
          setPins(data)
        })
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId)

      client.fetch(savedPinsQuery)
        .then((data) => {
          setPins(data)
        })
    }
  }, [text, userId])
  

  const logout = () => {
    localStorage.clear()
    navigate('/signin')
  }

  if (!user) {
    return <Spinner message='페이지 로딩중...' />
  }

  console.log('info of isUserProfile in UserProfile.jsx ', isUserProfile);

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              alt="banner-pic"
              className='w-full h-370 2xl:h-510 shadow-lg object-cover'
            />
            <img
              src={userIcon}
              alt="user-pic"
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
            />
            <h1 className='font-bold text-3xl text-center mt-3'>
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      type='button'
                      className='bg-white flex flex-col items-center justify-center p-2 rounded-full cursor-pointer outline-none shadow-md'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout color='red' />
                      <span className=' text-xs'>로그아웃</span>
                    </button>
                  )}
                  onLogoutSuccess={logout}
                  cookiePolicy='single_host_origin'
                />
              )}
              
            </div>
          </div>
          <div className="text-center mb-7">
            < button
              type='button'
              onClick={(e) => {
                setText('Created')
                setActiveBtn('created')
              }}
              className={`${activeBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              생성한 게시물
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText('Saved')
                setActiveBtn('saved')
              }}
              className={`${activeBtn === 'saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              찜한 게시물
            </button>
          </div>
          <div className="px-2">
            <MasonryLayout pins={pins} isUserProfile={isUserProfile} text={text} />
          </div>
          {pins?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              게시물이 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile