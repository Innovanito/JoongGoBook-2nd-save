import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import logo from '../assets/logo.png'

import { client } from '../client'

import { Form, Button} from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-gray-50">
      <div className="p-5 w-40 bg-white opacity-60 rounded-full">
        <img src={logo} alt="logo" width='150px' />
      </div>
      <div className="flex flex-col justify-start items-center w-8/12 h-4/6  bg-white opacity-60 rounded-md" >
        <h1 className='pt-3 text-4xl'>회원가입</h1>
        <h1 className='pt-2 text-xl pb-4'>중고북에 오신 것을 환영합니다! </h1>
        <Form>
          <Form.Group className="mb-3 " controlId="formBasicEmail">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="id" placeholder="아이디" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="6자리 이상으로!" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>비밀번호 재입력</Form.Label>
            <Form.Control type="password" placeholder="비밀번호 재입력" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="비밀번호 분실시 사용" />
          </Form.Group>
          <Button variant="primary" type="submit" className=' text-black w-full'>
            회원 생성하기
          </Button>
        </Form>
        <div className="flex text-sm mt-3">
          <Link to={'/'} className='mr-3'>아이디 찾기</Link>
          <Link to={'/'}>비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  )
}

export default Login

//