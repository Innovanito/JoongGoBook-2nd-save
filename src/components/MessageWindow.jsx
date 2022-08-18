import React from 'react'
import userIcon  from '../assets/user-icon.png'
import threeDots from '../assets/three_dots.png' 
import plus from '../assets/plus.jpg'
import Chat from './Chat.jsx'
import { useState, useEffect , useRef} from 'react'
import { dmData } from '../utils/data'
import { client } from '../client'
import { v4 as uuidv4 } from 'uuid'
import SmallSpinner from './SmallSpinner'

const MessageWindow = () => {
  const [messages, setMessages] = useState()
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef()

  let presentTime = new Date();

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    let messageData = {
      text :newMessage,
      _key: uuidv4(),
      chatTime: presentTime,
      postedBy: {
          // hard-coded, so fix it later, userId is zcx123
        _type: 'postedBy',
        _ref: 'drafts.x0zDxxmL6w5GbC0bnbb5OR'
      }
    }

    if (newMessage) {
      client
        .patch('4261ecf4-2f18-4deb-83e5-5ea33c9301d0') // hard-coded, so fix it later, coversationId is firstDm
        .setIfMissing({ chat: []})
        .insert('after', 'chat[-1]', [
          messageData
        ])
        .commit()
        .then(() => {
          console.log(messages);
          setMessages([...messages.chat], messageData )
          setNewMessage("")
          setLoading(false)
        })
    }
  }

  const fetchDmData = (dmId) => {
    const query = dmData(dmId)
    if (query) {
      try {
        client.fetch(query)
          .then((data) => {
            setMessages(data[0])
            }
          )
      } catch (err) {
        console.log(err); 
      }
    }
  }

  useEffect(async () => {
    const chatData = await fetchDmData('4261ecf4-2f18-4deb-83e5-5ea33c9301d0') //hard-coded but have to fix it later
  }, [messages])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  


  return (
    <div className="flex-1 min-w-0 bg-white xl:flex relative ">
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
                  <p className=' pl-3 font-bold text-gray-900 text-lg text-center'> 상품 이름</p>
                  <p className="text-sm font-bold text-red-400 text-center">
                    판매중
                  </p>
                  <p className="text-sm text-gray-500 truncate text-center">
                    가격(원)
                  </p>
                </a>
              </div>
            </div> 
          </div>
        </div>
      </div>
      <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen xl:flex bg-white overflow-y-scroll"> 
        <div className="h-full">
          <div className="flex sm:items-center justify-between py-3 border-b border-gray-200 p-3">
            <div className="flex items-center space-x-4">
              <img
                src={userIcon}
                alt="user-icon"
                className=' w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer'
              />
              <div className="flex flex-col leading-tight">
                <div className="text-xl mt-1 flex items-center ">
                  <span className=" text-gray-700 mr-3">상대방 이름2</span>
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
            className="flex flex-col space-y-4 p-3 overflow-y-auto scroll-m-2 w-full"
          >
            {
              messages ?
              messages?.chat?.map(message => 
              <div ref={scrollRef}>
                <Chat own={false} message={message} />
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
          {/* message ends here */}

          {/* chatting window starts */}
          <div className="border-t-2 border-gray-200 px-4 py-4 mt-3 mb-3 flex justify-between m-2 items-center">
            <div className="relative flex w-full">
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
              <textarea
                type="text"
                placeholder='채팅을 시작하세요!'
                className=' w-full focus:ring-green-300 focus:placeholder-gray-500 text-gray-600 placeholder-gray-300 pl-12 bg-gray-100 rounded-full py-3 border-gray-200'
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              />
              {loading &&
                <span
                className='absolute top-4 flex items-center right-0'
              >
                <SmallSpinner
                  message={'채팅 전송중...'}
                  className='w-10 h-7'
                />
              </span>}
            </div>
            <div className=" bg-blue-200 w-20 h-16 ml-3 text-center justify-center rounded-lg flex items-center">
              <button
                onClick={handleSubmit}
              >
                전송
              </button>
            </div>
          </div>
          {/* chatting window ends */}

        </div>
      </div>
      <div className="bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block">
        <div className="h-full pl-6 py-6 lg:w-80">
          <div className="h-full relative">
            <div className="m-auto text-center mb-2">
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageWindow