import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'
import { univList } from '../utils/data'

import userIcon from '../assets/user-icon.png'

//여기에 내 홈페이지 계정의 정보를 넣어주기dp
const Navbar = ({searchTerm, setSearchTerm, user}) => {
  const [univValue, setUnivValue] = useState('')

  const navigate = useNavigate()
  

  useEffect(() => {
    if (univValue) {
      navigate(`/category/${univValue}`)
    }
    console.log(univValue);
  }, [univValue])

  return (
    <div className='flex flex-col bg-white'>
      <div className='flex flex-col h-80 items-end justify-end pr-5 mt-5 text-gray-400'>
        <h2>
          중고북은 대학 내 중고 서적 거래를 중개 사이트입니다 <br/>
        </h2>
        <h2 className='mt-1'>
          판매 및 구매 시 직거래를 권장합니다
        </h2>
        <h2 className='mt-3'>
          {user
            ? null
            : '서비스 이용을 위해 로그인을 해주세요'
          }
        </h2>
        <h5 className='mt-1 text-xs'>
          창이 띄지 않을 경우 새로고침을 해주세요
        </h5>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center w-full mt-5 pb-2">
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
              {user &&
                <Link to={`user-profile/${user?._id}`} className='hidden md:block' >
                  {user?.googleId ?
                    <img src={user?.image} alt="user-image" className='w-14 h-12 rounded-lg bg-gray-100' /> :
                    <img src={userIcon} alt="default-user-icon" className='w-14 h-12 rounded-lg bg-gray-100' />
                  }
                </Link>
            }
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
        <div className="flex justify-between bg-gray-200 rounded-lg p-1 border-solid mb-2" >
          <div className="flex text-gray-400">
            대학교 별로 중고책 찾기
          </div>
          <div className="flex mr-5">
            <select  name="univ-list" value={univValue} onChange={e => setUnivValue(e.target.value)}>
              <option defaultValue disabled hidden>대학 항목을 선택해주세요</option>
              {/* univ의 값을 Feed.jsx에 categoryId로 넘겨줘야 한다 */}
              {univList.map(univ => (
                <option
                  value={univ}
                  key={univ}
                >{univ}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar