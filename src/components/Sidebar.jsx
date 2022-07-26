import React, { useState, useEffect } from 'react'
import {NavLink, Link} from 'react-router-dom'
import {RiHomeFill} from 'react-icons/ri'
import {categories} from '../utils/data'

import logo from '../assets/logo.png'

// const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duraiton-200 ease-in-out '
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2  transition-all duraiton-200 ease-in-out '

//해결해야할 문제들
// 1. isActiveStyle의 스타일이 적용이 안됨

const Sidebar = ({ user, closeToggle }) => {
  const [isActive, setIsActive] = useState(false)
  const [userImage, setUserImage] = useState('')
  const [userDisplayName, setUserDisplayName] = useState('')  

  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false)
  }

  // useEffect(() => {
  //   if (user.userNickname) {
  //     setUserDisplayName(user.userNickname)
  //   } else {
  //     setUserDisplayName(user.userName)
  //   }
  // }, [user])
  
  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar shadow-xl border-x-2">
      <div className="flex flex-col ">
        <div className="flex flex-col items-center justify-center">
            <Link
            to='/'
            className='flex px-5 gap-2 mt-6 pt-5 w-190 items-center'
            onClick={handleCloseSidebar}
          >
            <img src={logo} alt="logo" className='w-full' />
          </Link>
          <h1 className=' text-gray-400 mb-7'>
            대학생 중고 교재 거래
          </h1>
        </div>
        <div className="flex flex-col gap-5">
          <NavLink
            to='/'
            className={isActiveStyle}
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> 
            홈 화면
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>항목들</h3>
          <div>
            <NavLink
              to={'/'}
              className={isActiveStyle}
              onClick={handleCloseSidebar}
            >
              {categories[0].name}
              </NavLink>
          </div>
          {user && 
          <div>
            <NavLink
              to={'/create-pin'}
              className={isActiveStyle}
              onClick={ handleCloseSidebar }
            >
              {categories[1].name}
            </NavLink>
          </div>
          }
          <div>
            {user && 
              <NavLink
                to={`/user-profile/${user?._id}`}
                className={isActiveStyle}
                onClick={handleCloseSidebar}
              >
                {categories[2].name}
              </NavLink>
            }
          </div>
          <div>
            {user && 
              <NavLink
                to={'/DM'}
                className={isActiveStyle}
                onClick={handleCloseSidebar}
              >
                {categories[3].name}
              </NavLink>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

