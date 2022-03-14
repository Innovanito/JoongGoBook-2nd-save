import React from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex w-36 mb-10">
        <img src={logo} alt="logo" />
      </div>
      <div className=' text-5xl '>이 페이지는 존재하지 않습니다</div>
      <Link to='/' className=' mt-6 text-4xl text-green-500'>
        메인 페이지로 돌아가기
      </Link>
    </div>  
  )
}

export default NotFound