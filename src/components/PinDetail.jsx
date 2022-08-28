import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

import { client,urlFor} from '../client'
import { pinDetailQuery, userQueryForMyAccount} from '../utils/data'
import Spinner from './Spinner'

import schoolLogo from '../assets/school.png'
import moneyIcon from '../assets/money-icon.png'


const PinDetail = ({user}) => {
  const navigate = useNavigate()
  const [pinDetail, setPinDetail] = useState(null)
  const [comment, setComment] = useState('')
  const [addingComment, setAddingComment] = useState(false)
  const { pinId } = useParams()
  const [isGoogleAccount, setIsGoogleAccount] = useState(pinDetail?.postedBy?._id)
  const [dmParam, setDmParam] = useState()  
  const [user_id, setUser_id] = useState()

  const createOrLinkDm = () => {

    const doc = {
      _id: dmParam,
      _type: 'dm',
      buyer: user_id, 
      seller: pinDetail?.postedBy._id,
      dmTitle: pinDetail?.title + user_id
    }

    client.createIfNotExists(doc)
      // if dmParam document were exist in the sanity documentation, do the link transition to that address
      .then(() => {
        navigate(`/DM/${dmParam}`, { replace: true })
      })
      // else create a document that the title is dmParam, and transite the link to the address
      .catch(() => {
        navigate(`/DM/${dmParam}`, { replace: true })
      })
  }

  const createDmAddress = () => {
    const localData = localStorage.getItem('user')
    let idData = JSON.parse(localData)
    // 현재 브라우저 사용자가 accountInfo일때
    if (idData.userName?.length) {
      const query = userQueryForMyAccount(idData._id)
      if (query) {
        client.fetch(query)
          .then((data) => {
            setUser_id(data[0]._id)
            setDmParam(pinId.concat('_').concat(user_id))
          })
      }
    } else {
      let user_id = idData.googleId
      setDmParam(pinId.concat('_').concat(user_id))
    }
  }
  
  const fetchPinDetails = () => {
    const query = pinDetailQuery(pinId)
    if (query) {
      client.fetch(query)
        .then((data) => {
          setPinDetail(data[0])
        })
    }
  }


    const createMeesage = () => {
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

  useEffect(() => {
    createDmAddress()
  }, [dmParam])

  console.log('pinDetail data in PinDetail.jsx', pinDetail);
  


  if(!pinDetail) return <Spinner message='상품을 불러오고있습니다' />

  return (
    <div className='flex flex-col m-auto pl-8 my-2 bg-white' style={{ maxWidth: '1500px', borderRadius: '32px'}}>
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
      {
        user?._id ?
        (user?._id === pinDetail?.postedBy._id ?
          null :
          <button
            onClick={createOrLinkDm}
            className=' h-10 w-50 font-bold text-xl text-lime-800 bg-slate-200 rounded-lg mr-3 mt-3 text-center'
          >
            판매자와 대화하기
          </button>
        ) :
        <h3 className=' font-bold text-xl text-gray-400 my-3 mb-5 '>
          판매자와 대화를 위해 로그인을 해주세요
        </h3>
      }
      {/* 댓글 기능 비활성화 시킴(DM 기능이 있어서) */}
      {/* <h2 className='mt-3 text-2xl'>댓글들</h2>
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
      </div> */}
    </div>
  )
}

export default PinDetail
