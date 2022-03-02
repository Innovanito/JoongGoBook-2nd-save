import React from 'react'
import { Routes, Route} from "react-router-dom";

import SignUp from './components/SignUp'
import Home from './container/Home'
import Signin from './components/Signin'
import SignupDemo from './components/SignupDemo'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path='signin' element={ <Signin />} />
      <Route path='sign-up' element={ <SignUp />} />
      <Route path='sign-up-demo' element={ <SignupDemo />} />
      <Route path='/' element={ <Home />} />
      <Route path='*' element={ <NotFound />} />
    </Routes>
  )
}

export default App