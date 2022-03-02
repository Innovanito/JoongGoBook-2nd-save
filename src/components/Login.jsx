import React from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate, Link } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import logo from '../assets/logo.png'

import { client } from '../client'

import { Form, Button} from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate()
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj))

    const {name, googleId, imageUrl} = response.profileObj

    const doc = {
      _id: googleId,
      _type: 'user',
      userName: name,
      image: imageUrl
    }

    client.createIfNotExists(doc)
      .then(() => {
        navigate('/', { replace: true })
      })
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-yellow-50 ">
      <div className="flex flex-col justify-center items-center w-8/12 h-4/6  bg-white opacity-60" >
        <div className="p-5">
          <img src={logo} alt="logo" width='180px' />
        </div>
        <Form>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="email" placeholder="아이디" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="이 계정 기억하기" />
          </Form.Group>
          <Button variant="primary" type="submit" className=' text-black w-full'>
            로그인
          </Button>
        </Form>
        <div className="flex text-sm mt-3">
          <Link to={'/'} className='mr-3'>아이디 찾기</Link>
          <Link to={'/'}>비밀번호 찾기</Link>
        </div>
        <div className="flex mt-3">
          <Link to={'/sign-up'}>회원가입</Link>
        </div>
        <div className="shadow-2xl mt-3">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <button
                type='button'
                className=' bg-green-300 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FcGoogle className='mr-4' /> 구글로 가입하기
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy='single_host_origin'
          />
        </div>
      </div>
    </div>
  )
}

export default Login

//