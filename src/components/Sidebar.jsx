import React, { useState } from 'react'
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
  
  const handleCloseSidebar = () => {
    if(closeToggle) closeToggle(false)
  }

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
            대학생 중고 교제 거래
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
          <div>
            <NavLink
              to={'/create-pin'}
              className={isActiveStyle}
              onClick={handleCloseSidebar}
            >
              {categories[1].name}
              </NavLink>
          </div>
          <div>
            <NavLink
              to={'/'}
              className={isActiveStyle}
              onClick={handleCloseSidebar}
            >
              {categories[2].name}
              </NavLink>
          </div>
          <div>
            <NavLink
              to={'/'}
              className={isActiveStyle}
              onClick={handleCloseSidebar}
            >
              {categories[3].name}
              </NavLink>
          </div>
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className='flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3 '
          onClick={handleCloseSidebar}
        >
          <img src={user.image} alt="user-image" className='w-10 h-10 rounded-full' />
          <p>{user.userName}</p>
        </Link>
      )}
    </div>
  )
}

export default Sidebar

//Sidebar에서 Category를 map 돌리는 파트
// {categories.map((category) => (
//             <NavLink
//               to={`/category/${category.name}`}
//               className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
//               onClick={handleCloseSidebar}
//               key={category.name}
//             >
//               {category.name}
//               </NavLink>
//           ))}