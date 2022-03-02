import React, {useState} from 'react'
import { AiOutlineCloudUpload} from 'react-icons/ai'
import { MdDelete} from 'react-icons/md'
import { useNavigate} from 'react-router-dom'

import {client} from '../client'
import Spinner from './Spinner'

// 무조건 추가해야할 기능들
//1. 제품의 상품명이 Pin.jsx에 넣어줄 수 있어야 함
//2. 제품의 설명란에 Enter키를 넣을 수 있도록 만들기


//추가하면 더 좋을 기능들
//1. 양식의 항목들을 다 작성하지 않을 때 나태내주는 글을 그냥 보여주지 말고 페이지에 맨 상단으로 끌어 올린 후에 메시지를 보여주는  기능(이 프로젝트에서 다룬적이 있음)
//2. 이미지 업로드를 2장 이상 할 수 있게금 구현하기

const CreatePin = ({user}) => {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [wrongImageType, setWrongImageType] = useState(false)

  const navigate = useNavigate()

  const uploadImage = (e) => {
    //업로드할 이미지의 데이터를 type과 name으로 구조분해한거임
    const { type, name} = e.target.files[0]

    if (type === 'image/jpg' || type === 'image/png' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/TIFF') {
      setWrongImageType(false)
      setLoading(true)

      client.assets
        .upload('image', e.target.files[0], { contentType: type, filename: name})
        .then((document) => {
          setImageAsset(document)
          setLoading(false)
        })
        .catch((error) => {
          console.log('이미지 업로드에 문제가 생겼습니다', error)
        })
    } else {
      setWrongImageType(true)
    }
  }

  const savePin = () => {
    if (title && about && imageAsset?._id) {
      const doc = {
        _type: 'pin',
        title,
        about,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id
          }
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        }
      }
      client.create(doc)
        .then(() => {
          navigate('/')
        })
    } else {
      setFields(true)
      setTimeout(() => {
        setFields(false)
      },2000)
    }
  }


  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>양식의 항목을 다 작성해주세요!</p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner message='이미지를 업로드 하는 중입니다...' />}
            {wrongImageType && <p>잘못된 이미지 타입입니다</p> }
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className='font-bold text-2xl'>
                      <AiOutlineCloudUpload />
                    </p>
                    <p className='text-lg pt-5'>업로드를 위해 클릭하세요!</p>
                  </div>
                  <p className='mt-32 text-gray-400'>
                    업로드 가능한 이미지 타입: JPG, SVG, PNG, GIF, TIFF 20MB 이하
                  </p>
                </div>
                <input
                  type="file"
                  name='upload-image'
                  onChange={uploadImage}
                  className='w-0 h-0 '
                />
              </label>
            ) : (
                <div className="relative h-full">
                  <img src={imageAsset?.url} alt="uploaded-pic!" className='h-full w-full' />
                  <button
                    type='button'
                    className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                    onClick={() => setImageAsset(null)}
                  >
                    <MdDelete />
                  </button> 
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력하세요'
            className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
          />
          {user && (
            <div className="flex gap-2 items-center my-2 bg-white rounded-lg">
              <img src={user.image} alt="user-image" className='w-10 h-10 rounded-full' />
              <p className='font-bold'>{user.userName}</p>
            </div>
          )}
          <textarea
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder='제품의 설명을 넣어주세요'
            className='sm:text-lg border-b-2 border-gray-200 p-2 h-40'
          />
          <div className="felx flex-col">
            <div className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'
              >
                게시물 올리기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePin