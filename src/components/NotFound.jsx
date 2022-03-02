import React from 'react'
import logo from '../assets/logo.png'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex w-36 mb-10">
        <img src={logo} alt="logo" />
      </div>
      <div className=' text-5xl '>이 페이지는 존재하지 않습니다</div>
    </div>  
  )
}

export default NotFound