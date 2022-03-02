import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { client } from '../client'

import logo from '../assets/logo.png'

//만들어야 할 함수들
// 1. 비밀번호와 재비밀번호 입력이 같을 때 pass(변수 만들어서 Boolean의 값으로 통과시켜 회원가입하기 버튼 누를 수 있게), 다를 때에는 회원가입 h1 밑에 빨간색으로 경고 알려주기 
// 2. 필수로 입력해야
// 3. MUI보면서 전반적으로 함수와 구성을 어떻게 했는지 보기


const Signup = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // e-mail과 비밀번호의 데이터를 이런 형식으로 보내준다
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };
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
          <div className="flex mb-2">
            <img src={logo} alt="logo" width='150px' />
          </div>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="이름"
                  required
                  fullWidth
                  id="Name"
                  label="이름을 입력해주세요"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="비밀번호"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="비밀번호를 재입력해주세요"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
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
      </Container>
  )
}

export default Signup