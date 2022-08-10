import React from 'react'


const Chat = ({ own , messages}  ) => {

  console.log('props value in Chat component',messages);
  console.log('1st text in the chat',messages?.chat[0].text);

  return (
    <>
      {own ?
      <div className="chat-message">
        <div className="flex items-end">
          <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span className="px-4 py-2 rounded-full inline-block rounded-bl-none bg-red-200 text-gray-600 text-lg" >
                채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1채팅1
              </span>
            </div> 
              <div className="text-gray-400">
                CreatedAt 00:00
              </div>
          </div>
        </div>
        </div> :
      <>
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
              <div>
                <span className="px-4 py-2 rounded-full inline-block rounded-br-none bg-green-400 text-white text-lg">
                  {messages?.chat[0].text}
                </span>
              </div>
                <div className="text-gray-400">
                  CreatedAt 00:00
                </div>  
            </div>
          </div>
        </div>
        <div className="chat-message">
          <div className="flex items-end justify-end">
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
              <div>
                <span className="px-4 py-2 rounded-full inline-block rounded-br-none bg-green-400 text-white text-lg">
                  {messages?.chat[1].text}
                </span>
              </div>
                <div className="text-gray-400">
                  CreatedAt 00:00
                </div>  
            </div>
          </div>
        </div>
        
      </>
    }
    </>
  )
}

export default Chat