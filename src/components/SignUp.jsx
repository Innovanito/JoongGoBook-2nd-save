import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { v4 as uuidv4 } from 'uuid'

import { client } from '../client'
import { useNavigate} from 'react-router-dom'

import logo from '../assets/logo.png'
import Spinner from './Spinner';

import { bringDefaultImage } from '../utils/data'



const Signup = () => {
  // 계정 생성하는 동안 Spinner를 보여주냐 아니면 보여주지 말냐 결정하는 Boolean 변수
  const [addingAccountInfo, setAddingAccountInfo] = useState(false)
  //계정의 항목을 다 작성했는지 안 했는지 알려주는 Boolean 변수
  const [fields, setFields] = useState(false)
  const [defaultImage, setDefaultImage] = useState('')


  const navigate = useNavigate()

    useEffect(() => {
    //sanity client에 있는 user-icon의 url을 가져오는 함수
    const queryBringImage = bringDefaultImage()

    if (queryBringImage) {
      client
        .fetch(queryBringImage)
        .then((data) => {
          setDefaultImage(data[0])
          console.log('imageData', defaultImage );
        })
    }
  }, [])


  const handleSubmit = (event) => {
    setAddingAccountInfo(true)

    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const doc = {
      _type: 'accountInfo',
      userId : data.get('userId'),
      password : data.get('password'),
      userNickname  : data.get('userNickname'),
      userEmail: data.get('userEmail'),
      image: defaultImage
    }

    if (doc.userId && doc.password && doc.userNickname && doc.userEmail) {
      client.create(doc)
        .then(() => {
          setAddingAccountInfo(false)
          navigate('/signin')
        })
    } else {
      setFields(true)
      setTimeout(() => {
        setFields(false)
      },2000)
    }
  };
  return (
    (addingAccountInfo ?
      (<Spinner message='계정 정보를 등록중입니다...' /> ): 
      (<Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="flex mb-2">
            <img src={logo} alt="logo" width='150px' />
          </div>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          {fields && (
            <p className='text-red-500 mb-5 text-xl text-center transition-all duration-150 ease-in'>양식의 항목을 다 작성해주세요!</p>
          )}
          <Box component="form" noValidate sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="username"
                  name="userId"
                  required
                  fullWidth
                  id="userId"
                  type='userId'
                  label="아이디"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  label="이름"
                  name="userName"
                  autoComplete="userName"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userEmail"
                  label="이메일 주소(분실 때 사용)"
                  name="userEmail"
                  autoComplete="userEmail"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userNickname"
                  label="이 사이트 별명"
                  name="userNickname"
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입하기
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  계정이 있나요? 로그인하기
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>)
    )
  )
}

export default Signup