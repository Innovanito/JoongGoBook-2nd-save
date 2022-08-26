
import plus from '../assets/plus.jpg'
import { useState, useEffect , useRef} from 'react'
import { dmData, dm_idData, pinDetailQuery, userQueryForMyAccount} from '../utils/data'
import { client, urlFor } from '../client'
import { v4 as uuidv4 } from 'uuid'
import SmallSpinner from './SmallSpinner'
import audio from '../assets/message_sound.mp3'
import BuyerWindow from './BuyerWindow.jsx'

//query를 이용해서 Pindetail.jsx에 dmParam을 가져오고, 
// dmParam을 이용해서 하드코딩 되어있는 부분 고쳐주기

const MessageWindow = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [dmAddress, setDmAddress] = useState()
  const [pinDetail, setPinDetail] = useState()
  const [user_id, setUser_id] = useState()
  const scrollRef = useRef()
  const [pageAddress, setPageAddress] = useState()

  let presentTime = new Date();

  const fetchUser_id = () => {
    const localData = localStorage.getItem('user')
    let idData = JSON.parse(localData)
    // 현재 브라우저 사용자가 accountInfo일때
    if (idData.userName?.length) {
      const query = userQueryForMyAccount(idData._id)
      if (query) {
        client.fetch(query)
          .then((data) => {
            setUser_id(data[0]._id)
          })
      }
    // 현재 브라우저 사용자가 googleId일때
    } else {
      setUser_id(idData.googleId)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)


    let messageData = {
      text :newMessage,
      _key: uuidv4(),
      chatTime: presentTime,
      postedBy: {
        _type: 'postedBy',
        _ref: user_id
      }
    }

    console.log('new message object', messageData);

    if (newMessage) {
      client
        .patch(pageAddress)
        .setIfMissing({ chat: []})
        .insert('after', 'chat[-1]', [
          messageData
        ])
        .commit()
        .then(() => {
          console.log('messages data 1', messages);
          messages?.chat.length ? setMessages([...messages?.chat], messageData) : setMessages(messageData) 
          console.log('messages data 2', messages);
          // audio.play()
          setNewMessage("")
          setLoading(false)
        })
        .catch((err) => console.log(err))
    }
  }


  const fetchDmChatData = (dmId) => {
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

  //나중에 dm_id를 parameter로 사용할수도... 아니면 안 할 수도
  const fetchDm_idData = () => {
    const query = dm_idData()
    if (query) {
      try {
        client.fetch(query)
          .then((data) => {
            setDmAddress(data[0])
            }
          )
      } catch (err) {
        console.log(err); 
      }
    }
  }
  
  const fetchPinDetails = () => {
    const currentUrl = window.location.href

    //pin의 _id 값
    const pinId = currentUrl.match(/DM\/[A-Za-z0-9]+/g)[0].substr(3)


    // DM의 주소 값
    setPageAddress(currentUrl.match(/DM\/[A-Za-z0-9_.]+/g)[0].substr(3))

    const query = pinDetailQuery(pinId)
    if (query) {
      client
        .fetch(query)
        .then((data) => {
          setPinDetail(data[0])
        })
        .catch((error) => {
          console.error('Upload failed:', error.message)
        })
    }
  }


  useEffect( () => {
    fetchDmChatData(pageAddress) 
  }, [pageAddress, newMessage, messages?.chat?.length])
  

  useEffect( () => {
    // fetch all the DM address in the backend data
    fetchDm_idData() 
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  useEffect( () => {
    fetchUser_id() 
  }, [])

  useEffect(() => {
    fetchPinDetails() 
  }, [pageAddress])
  



  return (
    <div className="flex-1 min-w-0 bg-white xl:flex relative ">
      <div className="border-b border-gray-200 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-gray-200 bg-gray-50">
        <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
          <div className="h-full relative">
            <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
              <div className="flex-shrink-0">
                <img
                  className='h-12 w-12 rounded-full'
                  src={pinDetail?.image && urlFor(pinDetail?.image).url()}
                  alt="book-img"
                />
              </div>
              <div className="flex-1 min-w-0">
                <a href="#" className="focus:outline-none">
                  <p className=' pl-3 font-bold text-gray-900 text-lg text-center py-3'> {pinDetail?.title}</p>
                  <p className="text-sm font-bold text-red-400 text-center pb-2">
                    {/* 나중에 거래완료나 게시물 작성자가 회원탈퇴를 했을 경우 판매중 -> 거래 불가로 동적으로 바꾸기 */}
                    판매중
                  </p>
                  <p className="text-sm text-gray-500 truncate text-center">
                    <span>{pinDetail?.price}</span>(원)
                  </p>
                </a>
              </div>
            </div> 
          </div>
        </div>
      </div>
      <div className="flex-1 p:2 sm:pb-6 justify-between flex flex-col h-screen xl:flex bg-white overflow-y-scroll"> 
        <div className="h-full"> 
          <BuyerWindow messages={messages} pinDetail={pinDetail} />

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