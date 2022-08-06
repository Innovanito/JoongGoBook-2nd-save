import React from 'react'
import userIcon  from '../assets/user-icon.png'
import threeDots from '../assets/three_dots.png' 
import plus from '../assets/plus.jpg'

const MessageWindow = () => {
  return (
    <div className=' flex-grow w-full max-w-7xl mx-auto lg:flex'>
      <div className="flex-1 min-w-0 bg-white xl:flex">
        <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-gray-200 bg-gray-50">
          <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
            <div className="h-full relative">
              <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                <div className="flex-shrink-0">
                  <img
                    className='h-12 w-12 rounded-full'
                    src="https://source.unsplash.com/1600x900/?library"
                    alt="person"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0"></span>
                    <p className="text-sm font-bold text-red-400">
                      판매중
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      가격
                    </p>
                  </a>
                </div>
              </div>
              
            </div>
          </div>
        </div>
          <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen xl:flex">
            <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
              <div className="flex items-center space-x-4">
                <img
                  src={userIcon}
                  alt="user-icon"
                  className=' w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer'
                />
                <div className="flex flex-col leading-tight">
                  <div className="text-xl mt-1 flex items-center ">
                    <span className=" text-gray-700 mr-3">User Name</span>
                  </div>
                </div>
              </div>
            
              <div className="flex  items-center space-x-2">
                <button className=' pointer-events-none inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'>
                  <img src={threeDots} alt="three-dots" />
                </button>
              </div>
          </div>
          
          {/* message starts in here */}
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scroll-m-2"
          >
            {/* first chat */}
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-red-200 text-gray-600 text-lg" >
                      채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1
                    </span>
                  </div>
                </div>
              </div>
            </div>
          {/* second chat */}
            <div className="chat-message">
              <div className="flex items-end justify-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-green-400 text-white text-lg">
                      채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2채팅2
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* third chat */}
            <div className="chat-message">
              <div className="flex items-end">
                <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div>
                    <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-red-200 text-gray-600 text-lg" >
                      채팅3입니다
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* third chat ends */}
          </div>
          {/* message neds here */}

          {/* chatting window starts */}
          <div className="border-t-2 border-gray-200 px-4 pt-4 mt-12 mb-3">
            <div className="relative flex">
              <span className="absolute inset-y-0 flex items-center">
                <button
                  className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300"
                >
                  <img
                    src={plus}
                    alt="plus-icon"
                    className='h-6 w-6 text-gray-600 rounded-full'
                  />
                </button>
              </span>
              <input
                type="text"
                placeholder='채팅을 시작하세요!'
                className=' w-full focus:ring-green-300 focus:placeholder-gray-500 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200'
              />
            </div>
          </div>
          {/* chatting window ends */}

        </div>
        <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
          <div className="h-full pl-6 py-6 lg:w-80"></div>
        </div>
      </div>
    </div>
  )
}

export default MessageWindow