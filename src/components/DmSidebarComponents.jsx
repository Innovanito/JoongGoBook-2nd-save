import React from 'react'
import { client, urlFor } from '../client'


const DmSidebarComponents = ({pinDetails}) => {

  console.log('pinDetails in Dmsidebarcomponent', pinDetails);

  return (
    <>
      {pinDetails?.map((pinDetail) => (
        <div className="border border-gray-600 xl:border-b-0 xl:flex-shrink-0 xl:w-64 xl:border-gray-200 bg-gray-50 p-3">
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
                <div className="flex-1">
                  <a href="#" className="focus:outline-none">
                    <p className=' pl-3 font-bold text-gray-900 text-lg text-center py-3'> {pinDetail?.title}</p>
                    <p className="text-sm font-bold text-red-400 text-center pb-2">
                      {/* 나중에 거래완료나 게시물 작성자가 회원탈퇴를 했을 경우 판매중 -> 거래 불가로 동적으로 바꾸기 */}
                      판매중
                    </p>
                    <p className="text-sm text-gray-500 truncate text-center">
                      <span>{pinDetail?.price}</span>(원)
                    </p>
                    <h1>test</h1>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default DmSidebarComponents