import React from 'react'

const LoginDemo = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex justify-center items-center  bg-slate-200">
        <form class="row g-3 justify-center">
          <div class="col-10">
            <label for="inputAddress" class="form-label">아이디</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="아이디" />
          </div>
          <div class="col-10">
            <label for="inputAddress2" class="form-label">비밀번호</label>
            <input type="text" class="form-control" id="inputAddress2" placeholder="비밀번호" />
          </div>
          <div class="col-12">
            <div class="form-check" className='flex justify-center'>
              <input class="form-check-input" type="checkbox" id="gridCheck"/>
              <label class="form-check-label" for="gridCheck">
                로그인 상태 기억하기
              </label>
            </div>
          </div>
          <div class="col-12" className='flex justify-center'>
            <button type="submit" class="btn btn-primary col-10">로그인</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginDemo