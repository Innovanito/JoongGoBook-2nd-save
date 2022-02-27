import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

import { client,urlFor} from '../client'
import { pinDetailQuery} from '../utils/data'
import Spinner from  './Spinner'

const PinDetail = ({user}) => {
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams()
  
  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId)
    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0])
        })
    }
  }
  
  const addComment = () => {
    if (comment) {
      setAddingComment(true)

      client
        .patch(pinId)
        .setIfMissing({ comments: []})
        .insert('after', 'comments[-1]', [{
          comment,
          _key: uuidv4(),
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }])
        .commit()
        .then(() => {
          fetchPinDetails()
          setComment('')
          setAddingComment(false)
        })
    }
  }

  useEffect(() => {
    fetchPinDetails()
  }, [pinId])

  if(!pinDetail) return <Spinner message='상품을 불러오고있습니다' />
  
  return (
    <div className='flex flex-col m-auto bg-white' style={{ maxWidth: '1500px', borderRadius: '32px'}}>
      <div className="flex justify-center items-center flex-initial w-350">
        <img
          src={pinDetail?.image && urlFor(pinDetail?.image).url()}
          alt="pin-image"
          className='rounded-t-3xl rounded-b-lg'
        />
      </div>
      <div>
        <h1 className='text-4xl font-bold break-words mt-3'>
          {pinDetail.title}
        </h1>
        <p className='mt-3'>{pinDetail.about}</p>
      </div>
      <Link to={`user-profile/${pinDetail.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg' >
        <img className='w-8 h-8 rounded-full object-cover' src={pinDetail.postedBy?.image} alt="user-profile" />
        <p className='font-semibold p-2'>{pinDetail.postedBy?.userName}</p>
      </Link>
      <h2 className='mt-5 text-2xl'>댓글들</h2>
      <div className="max-h-370 overflow-y-auto">
        {pinDetail?.comments?.map((comment, i) => (
          <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={i} >
            <img
              src={comment.postedBy.image}
              alt="user-profile"
              className='w-10 h-10 rounded-full cursor-pointer'
            />
            <div className="flex flex-col">
              <p className='font-bold'>{comment.postedBy.userName}</p>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap mt-6 gap-3">
        <Link to={`user-profile/${pinDetail.postedBy?._id}`}  >
          <img
            className='w-8 h-8 rounded-full cursor-pointer'
            src={pinDetail.postedBy?.image}
            alt="user-profile"
          />
        </Link>
        <input
          type="text"
          className='flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300'
          placeholder='댓글을 달아주세요'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          type='button'
          className='bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
          onClick={addComment}
        >
          {addingComment ? '게시물에 댓글 게시 중...' : '댓글 게시하기'}
        </button>
      </div>
    </div>
  )
}

export default PinDetail