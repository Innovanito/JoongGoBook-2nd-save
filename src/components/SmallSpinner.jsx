import React from 'react'
import {Circles} from 'react-loader-spinner'

const SmallSpinner = ({message}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Circles
        type="Circles"
        color="skyblue"
        height={30}
        width={100}
        className="m-1"
      />  
      <p className=' text-xs text-center text-gray-500 italic pt-2'>{message}</p>
    </div>
  )
}

export default SmallSpinner