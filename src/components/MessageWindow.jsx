import React from 'react'

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
      </div>

    </div>
  )
}

export default MessageWindow