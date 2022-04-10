import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { client } from '../client'
import { useNavigate} from 'react-router-dom'

import logo from '../assets/logo.png'
import Spinner from './Spinner';

import { allUserId } from '../utils/data';



const Signup = () => {
  // 계정 생성하는 동안 Spinner를 보여주냐 아니면 보여주지 말냐 결정하는 Boolean 변수
  const [addingAccountInfo, setAddingAccountInfo] = useState(false)
  //계정의 항목을 다 작성했는지 안 했는지 알려주는 Boolean 변수
  const [fields, setFields] = useState(false)
  //userId가 중복되는 지 검사하기 위해 이미 존재하는 모든 Id를 담아둔 변수
  const [userIds, setUserIds] = useState(null)
  // signup.jsx에 입력하는 모든 정보들이 있는 변수
  const [values, setValues] = useState({
    username: '',
    userEmail: '',
    userId:'',
    password: '',
    password2: '',
    userNickname: ''
    // 나중에 여기에 userId 변수를 추가해야 한다.
  })
  //validationInfo에서 에러가 떳을 때 에러들을 담아두는 변수 - 객채임
  const [errors, setErrors] = useState({
    username: '',
    userEmail: '',
    userId:'',
    password: '',
    password2: '',
    userNickname: ''
  })


  const navigate = useNavigate()

  useEffect(() => {
    const query = allUserId()

    client
      .fetch(query)
      .then((data) => {
        setUserIds(data)
      })
  }, [])

  const handleChange = e => {
    const { name, value} = e.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const validationInfo = values => {
    let errors = {}

    if (!values.userId) {
      errors.userId = '유저 아이디를 입력하세요'
    } else if (
      userIds.map((item) => {
        if (item.userId === values.userId) errors.userId = '유저 아이디가 존재합니다'
      })
    )

    if (!values.username.trim()) {
      errors.username = "유저 이름을 입력하세요"
    }

    if (!values.userEmail) {
      errors.userEmail = "Email을 입력하세요"
    }
    // else if (!/\W+@\W+\.\W+/.test(values.userEmail)) {
    //   errors.userEmail = "Email의 형식이 아닙니다"
    // }


    if (!values.password) {
      errors.password = '암호를 입력하세요'
    }
    else if (values.password.length < 4) {
      errors.password = '암호를 4자 이상 입력하세요'
    }
    else if (values.password.length > 16) {
      errors.password = '암호를 16자 이하 입력하세요'
    }

    if (!values.password2) {
      errors.password2 = '암호를 입력하세요'
    } else if (values.password2 !== values.password) {
      errors.password2 = '암호가 일치하지 않습니다 '
    }

    if (!values.userNickname) {
      errors.userNickname = '유저의 별명을 입력하세요'
    }
    return errors
  }



  const handleSubmit = (event) => {
    event.preventDefault();

    setErrors(validationInfo(values))

    if (Object.keys(errors).length) {
      console.log('infos about form' ,values);
      console.log('erros', errors);
      console.log('infos about errors exist');
      setFields(true)
      setTimeout(() => {
        setFields(false)
      },2000)
    } else {
      console.log('infos about form' ,values);
      console.log('infos about errors do not exist');
      // setAddingAccountInfo(true)
    //   client.create(values)
    //     .then(() => {
    //       setAddingAccountInfo(false)
    //       navigate('/signin')
    //     })
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
            <p className='text-red-500 mb-5 text-center transition-all duration-150 ease-in text-2xl'>양식의 항목을 바르게 작성하세요</p>
          )}
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="userId"
                  name="userId"
                  required
                  fullWidth
                  id="userId"
                  type='userId'
                  label="아이디"
                  autoFocus
                  value={values.userId}
                  onChange={handleChange}
                />
              </Grid>
              {errors?.userId && 
                <p className=' text-red-500'>{errors?.userId}</p>
              }
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="비밀번호(4자 이상 16자 이하 입력해주세요)"
                  type="password"
                  id="password"
                  autoComplete="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </Grid>
              {errors?.password && 
                <p className=' text-red-500'>{errors?.password}</p>
              }
              <Grid item xs={12}>
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password2"
                  label="비밀번호"
                  type="password"
                  id="password2"
                  autoComplete="password2"
                  value={values.password2}
                  onChange={handleChange}
                />
              </Grid>
              {errors?.password2 && 
                <p className=' text-red-500'>{errors?.password2}</p>
              }
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="이름"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={values.username}
                  onChange={handleChange}
                />
              </Grid>
              {errors?.username && 
                <p className=' text-red-500'>{errors?.username}</p>
              }
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
                  value={values.userEmail}
                  onChange={handleChange}
                />
              </Grid>
              {errors?.userEmail && 
                <p className=' text-red-500'>{errors?.userEmail}</p>
              }
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userNickname"
                  label="이 사이트 별명"
                  name="userNickname"
                  autoFocus
                  value={values.userNickname}
                  onChange={handleChange}
                />
              </Grid>
              {errors?.userNickname && 
                <p className=' text-red-500'>{errors?.userNickname}</p>
              }
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              회원가입하기
            </Button>
          </Box>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/signin" variant="body2">
                  계정이 있나요? 로그인하기
                </Link>
              </Grid>
            </Grid>
        </Box>
      </Container>)
    )
  )
}

export default Signup