import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'

//여기에 내 홈페이지 계정의 정보를 넣어주기
const Navbar = ({searchTerm, setSearchTerm, user}) => {
  const navigate = useNavigate()

  return (
    <div className='flex flex-col bg-white'>
      <div className='flex flex-col h-80 items-end justify-end pr-5 text-gray-400'>
        <h2>
          중고북은 대학 내 중고 서적 거래를 중개 사이트입니다 <br/>
        </h2>
        <h2>
          판매 및 구매 시 직거래를 권장합니다
        </h2>
      </div>
      <div className="flex items-center w-full mt-5 pb-7">
        <div className="flex justify-start items-center w-full rounded-lg bg-gray-100 border-none outline-none focus-within:shadow-sm mr-10">
          <IoMdSearch fontSize={21} className='ml-1' />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="중고상품 검색하기"
            value={searchTerm}
            onFocus={() => navigate('/search')}
            className='p-2 w-full bg-gray-100 outline-none'
          />
        </div>
        {user ?
        <div className="flex gap-3">
          <Link to={`user-profile/${user?._id}`} className='hidden md:block' >
            <img src={user?.image} alt="user-image" className='w-14 h-12 rounded-lg' />
          </Link>
          <Link to='create-pin' className='bg-gray-200 text-black rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center' >
            <IoMdAdd />
          </Link>
          </div> :
        <div className="flex items-center">
          <Link to={'/signin'}>
            <button className='w-20 text-gray-500'>로그인</button>
          </Link>
        </div> }
      </div>
    </div>
  )
}

export default Navbar