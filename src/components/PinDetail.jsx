import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

import { client,urlFor} from '../client'
import { pinDetailQuery} from '../utils/data'
import Spinner from './Spinner'

import schoolLogo from '../assets/school.png'
import moneyIcon from '../assets/money-icon.png'


const PinDetail = ({user}) => {
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams()
  const [isGoogleAccount, setIsGoogleAccount] = useState(pinDetail?.postedBy?._id)

  
  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId)
    if (query) {
      client.fetch(query)
        .then((data) => {
          console.log('data info', data[0]);
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

  console.log('info of pindetail', pinDetail);


  if(!pinDetail) return <Spinner message='상품을 불러오고있습니다' />

  return (
    <div className='flex flex-col m-auto pl-8 mt-3 bg-white' style={{ maxWidth: '1500px', borderRadius: '32px'}}>
      <div className="flex justify-center items-center w-350">
        <img
          src={pinDetail?.image && urlFor(pinDetail?.image).url()}
          alt="pin-image"
          className='rounded-t-3xl rounded-b-lg'
        />
      </div>
      <div>
        <div className="flex mt-3">
          <img src={schoolLogo} alt="school-logo" className='mr-3' /> 
          {pinDetail.category}
        </div>
        <div className="flex mt-2 items-center">
          <img src={moneyIcon} alt="money-icon" className='mr-3 w-7' />
          <div className="text-lg">{pinDetail.price} 원</div> 
        </div>
        <h1 className='text-4xl font-bold break-words mt-3'>
          {pinDetail.title}
        </h1>
        <p className='mt-3'>{pinDetail.about}</p>
      </div>
      {/* 이 부분을 수정해서 Link의 이동을 제어해야하는데 어캐하는지 모르것음 몰라서 그냥 NavLink를 안쓰고 h1태그를 씀 */} 
      {/* <NavLink to={`user-profile/${pinDetail.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg' >
        {isGoogleAccount && <img className='w-8 h-8 rounded-full object-cover' src={pinDetail.postedBy?.image} alt="user-profile" />}
        <p className='font-semibold p-2'> <span className=' font-extrabold text-gray-500'>게시자:</span> {pinDetail.postedBy?.userName}</p>
      </NavLink> */}
      <h1 to={`user-profile/${pinDetail.postedBy?._id}`} className='flex gap-2 mt-5 items-center bg-white rounded-lg' >
        {isGoogleAccount && <img className='w-8 h-8 rounded-full object-cover' src={pinDetail.postedBy?.image} alt="user-profile" />}
        <p className='font-semibold p-2'> <span className=' font-extrabold text-gray-500'>게시자:</span> {pinDetail.postedBy?.userName}</p>
      </h1>
      {user._id === pinDetail?.postedBy._id ?
        null :
        <Link
          to={'/DM'}
          className=' h-10 w-50 font-bold text-xl text-lime-600 bg-slate-200 rounded-lg mr-3 text-center'
        >
          판매자와 대화하기
        </Link>
      }
      <h2 className='mt-3 text-2xl'>댓글들</h2>
      <div className="max-h-370 overflow-y-auto">
        {pinDetail?.comments?.map((comment, i) => (
          <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={i} >
            {isGoogleAccount &&
              <img
              src={comment.postedBy.image}
              alt="user-profile"
              className='w-10 h-10 rounded-full cursor-pointer'
            />}
            <div className="flex flex-col">
              <p className='font-bold'>{comment.postedBy.userName}</p>
              <p>{comment.comment}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap mt-6 gap-3">
        {user ? (
          <div className="flex">
            <Link to={`user-profile/${pinDetail.postedBy?._id}`}  >
              {isGoogleAccount && <img
                className='w-8 h-8 rounded-full cursor-pointer'
                src={pinDetail.postedBy?.image}
                alt="user-profile"
              />}
            </Link>
            <input
              type="text"
              className='flex-1 border-gray-100 outline-none border-2 mr-3 p-2 rounded-2xl focus:border-gray-300'
              placeholder='댓글을 달아주세요'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              type='button'
              className='flex bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none'
              onClick={addComment}
            >
              {addingComment ? '게시물에 댓글 게시 중...' : '댓글 게시하기'}
            </button> 
          </div>
        ) : (
          <h1 className=' flex items-center text-gray-400 mb-2'> 댓글 게시를 위해 로그인을 해주세요</h1>
        )}
      </div>
    </div>
  )
}

export default PinDetail
