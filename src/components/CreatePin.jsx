import React, {useState} from 'react'
import { AiOutlineCloudUpload} from 'react-icons/ai'
import { MdDelete} from 'react-icons/md'
import { useNavigate} from 'react-router-dom'

import {client} from '../client'
import Spinner from './Spinner'
import {categoreis} from '../utils/data'



const CreatePin = ({user}) => {
  const [title, setTitle] = useState('')
  const [about, setAbout] = useState('')
  const [destination, setDestination] = useState('')
  const [loading, setLoading] = useState(false)
  const [fields, setFields] = useState(null)
  const [category, setCategory] = useState(null)
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


  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      {fields && (
        <p className='text-red-500 mb-5 text-xl transition-all duration-150 ease-in'>양식의 항목을 다 작성해주세요 ^.^</p>
      )}
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner/>}
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
        <div className="flex">

        </div>
      </div>
    </div>
  )
}

export default CreatePin