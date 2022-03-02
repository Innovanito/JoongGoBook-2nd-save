import React from 'react'
import '../index.css'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import { FormControlLabel } from '@mui/material'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import {FcGoogle} from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

import GoogleLogin from 'react-google-login'


import { client } from '../client'


import logo from '../assets/logo.png'

const Signin = () => {
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
    <Container component="main" maxWidth="xs">
      <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
      >
        <Avatar sx={{bgcolor: 'white'}}>
          <div className="flex justify-center items-center m-2">
            <img src={logo} alt="web-logo" />
          </div>
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입하기
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        /> 
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          name="password"
          autoComplete="current-passsword"
          autoFocus
        /> 
        <FormControlLabel control={
          <Checkbox value="remember" color="primary" />
        } label="계정기억하기" />
        
        <Button type="submit" fullWidth variant='contained' sx={{mt: 3, mb:2}}>로그인</Button>
        <Grid container>
          <Grid item xs>
            <Link>
              비밀번호 찾기
            </Link>
          </Grid>
          <Grid item>
            <Link>
              회원가입하기
            </Link> 
          </Grid>
        </Grid>
        <div className="shadow-2xl mt-3">
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            render={(renderProps) => (
              <button
                type='button'
                className=' bg-green-200 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
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
      </Box>
    </Container>
  )
}

export default Signin