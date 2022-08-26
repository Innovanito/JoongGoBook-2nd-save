import React from 'react'
import { useEffect, useState } from 'react'
import { client } from '../client'
import { userQueryForMyAccount  } from '../utils/data'


const BuyerChat  = ({ message}) => {
  const [date, setDate] = useState([])
  const [hour, setHour] = useState()
  const [minute, setMinute] = useState()
  const [userOnScreen, setUserOnScreen] = useState()


  const getUserOnScreen = () => {
    const userInfo = JSON.parse(localStorage.getItem('user'))

    //accountInfo일때
    if (userInfo?.userName) {
      const query = userQueryForMyAccount(userInfo._id)
      if (query) {
        try {
          client.fetch(query)
            .then((data) => {
              setUserOnScreen(data[0]?._id)
              }
            )
        } catch (err) {
          console.log(err); 
        }
      }
    }
    //googleId일때 
    else {
      setUserOnScreen(userInfo?._id)
    }
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
    getUserOnScreen()
  }, [])

  return (
    <>
      {message.postedBy._ref == userOnScreen ?
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
      </div> :
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-full inline-block rounded-bl-none bg-red-200 text-gray-600 text-lg" >
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

export default BuyerChat