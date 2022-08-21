import React, { useState, useRef, useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from 'react-router-dom'

import {Sidebar, UserProfile, Footer, Navbar, Signin, DM} from '../components'
import Pins from './Pins'

import { userQuery, userQueryForMyAccount } from '../utils/data'
import { fetchUser } from '../utils/fetchUser'

import {client} from '../client'

import logo from '../assets/logo.png'


const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)
  const userInfo = fetchUser()
  const [isUserExist, setIsUserExist] = useState(false)
  const [isLoading, setIsLoading] = useState(false) //로딩중을 나타내는 Boolean 변수
  const [userImageUrl, setUserImageUrl] = useState('')


  useEffect(() => {
    setIsLoading(true)

    if (userInfo?.googleId) {
      const query = userQuery(userInfo?.googleId) 

      client
        .fetch(query)
        .then((data) => {
          setUser(data[0])
          setUserImageUrl(user?.image)
          setIsUserExist(true)
          setIsLoading(false)
        })
    } else {
      const query = userQueryForMyAccount(userInfo?._id) 
      client
        .fetch(query)
        .then((data) => {
          setUser(data[0])
          setUserImageUrl(user?.image?.image?.asset?.url) 
          setIsUserExist(true)
          setIsLoading(false)
        }) 
    }
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0,0)
  }, [])


  return (
    <div className="flex flex-col">
      <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className="hidden md:flex h-screen flex-initial">
          <Sidebar user={user && user}/>
        </div>
        
        {/* 모바일 크기에 flex-col으로 보여주는 UI */}
        <div className="flex md:hidden flex-row">
          <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
            <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
            <Link to='/' >
              <img src={logo} alt="logo" className='w-28' />
            </Link>
            {isUserExist ?
              userImageUrl &&
              <Link to={`user-profile/${user?._id}`} >
                <img src={userImageUrl} alt="user-image" className='w-9 h-9 rounded-full' />
              </Link>:
              <Link to={'/signin'}>
                <button className=' flex items-center w-15 text-gray-500'>로그인</button>
              </Link>}
          </div>

          {/* 웹 사이즈 일때 (모바일 사이즈 이상이 될때) Sidebar를 보여주는 UI */}
          {toggleSidebar && (
          <div className="fixed w-1/2 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div>
          )}
        </div>
        {/* Sidebar.jsx 옆에 보여지는 창 */}
        <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:userId' element={<UserProfile user={user && user} />} />
            <Route path='/*' element={<Pins user={user && user} />} />
            <Route path='DM/:dmParam' element={<DM  />} />
          </Routes>
        </div>
      </div>
      <div className="flex">
        <Footer />
      </div>
    </div>
  )
}

export default Home