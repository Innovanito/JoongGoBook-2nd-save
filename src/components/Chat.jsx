import React from 'react'
import { useEffect, useState } from 'react'


const Chat = ({ message }) => {
  const [userOnScreen, setUserOnScreen] = useState()
  const [owner, setOwner] = useState(true)
  const [date, setDate] = useState([])
  const [hour, setHour] = useState()
  const [minute, setMinute] = useState()

  // {userOnScreen == buyer ? cssLayout1 : cssLayout2}
  // Chat의 postedBy의 변수가 buyer일 경우 cssLayout1
  // Chat의 postedBy의 변수가 seller일 경우  cssLayout2

  const getUserOnScreen = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))

    // console.log(userInfo);

    setUserOnScreen(userInfo?._id)

    // console.log('userOnScreen value ', userOnScreen);
  }


  const timeFormat = ( message) => {
    let ex = message?.chatTime
    
    let ex2 = ex?.split('T')

    let todayTime = ex2[1].split(':')

    setDate(ex2[0])
    let hour1 = todayTime[0]
    setMinute(todayTime[1])

    setHour((parseInt(hour1) + 9) % 24)
  }

  useEffect(() => {
    timeFormat(message)
  }, [])

  useEffect(() => {
    getUserOnScreen()
    // console.log('message.postedBy value', message?.postedBy._id);
    if (userOnScreen == message.postedBy._id) {
      // debugger로 찍어본 결과 userOnScreen도 undefined임
      // message.postedBy에서 _id의 값이 아예 없다
      // console.log('buyer message !');
      setOwner(false)
    } else {
      // console.log('setOwner message is true so the message is on the left');
    }
  }, [])

  return (
    <>
      {/* {userOnScreen === } */}
      {owner ?
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-full inline-block rounded-bl-none bg-red-200 text-gray-600 text-lg" >
                {message?.text}
              </span>
            </div> 
              <div className="text-gray-400">
                  <span>{date}</span>
                  <span>{hour}시 {minute}분</span>
              </div>
          </div>
        </div>
        </div> :
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
              <div>
                <span className="px-4 py-2 rounded-full inline-block rounded-br-none bg-green-400 text-white text-lg">
                  {message?.text}
                </span>
              </div>
                <div className="text-gray-400">
                  <span>{date} / </span>
                  <span>{hour}시 {minute}분</span>
                </div>  
            </div>
          </div>
        </div>
    }
    </>
  )
}

export default Chat