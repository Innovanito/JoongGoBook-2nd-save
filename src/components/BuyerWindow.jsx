import React from 'react'
import userIcon  from '../assets/user-icon.png'
import threeDots from '../assets/three_dots.png' 
import { useRef } from 'react'
import BuyerChat from './BuyerChat'


const BuyerWindow = ({messages, pinDetail}) => {

  const scrollRef = useRef()

  
  return (
    <div>
      <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
        <div className="flex items-center space-x-4">
          <img
            src={userIcon}
            alt="user-icon"
            className=' w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer'
          />
          <div className="flex flex-col leading-tight">
            <div className="text-xl mt-1 flex items-center ">
              <span className=" text-gray-700 mr-1">
                {
                  pinDetail?.postedBy.userName ?
                  // 유저가 accountInfo일 때
                  pinDetail?.postedBy.userName :
                  // 유저가 googleId일 때
                  pinDetail?.postedBy.userNickname
                }
              </span>
              <span>님과의 채팅</span>
            </div>
          </div>
        </div>
      
        <div className="flex  items-center space-x-2">
          <button className=' pointer-events-none inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'>
            <img src={threeDots} alt="three-dots" />
          </button>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scroll-m-2 w-full"
      >
        {
          messages?.chat?.length ?
          messages?.chat?.map((message, i) => 
          <div ref={scrollRef}>
            <BuyerChat message={message} key={i}/>
          </div>
          ) :
          <div
            className=' w-656 h-96 text-center text-gray-400 '
          >
            <h1>아직 작성한 메시지가 없습니다</h1>
            <h1>거래를 위해 채팅을 시작해볼까요?</h1>
          </div>
        }
      </div>
    </div>
  )
}

export default BuyerWindow