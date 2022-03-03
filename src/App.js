import React from 'react'
import { Routes, Route} from "react-router-dom";

import Home from './container/Home'
import Signin from './components/Signin'
import Signup from './components/Signup'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Routes>
      <Route exact path='signin' element={ <Signin />} />
      <Route exact path='signup' element={ <Signup />} />
      <Route exact path='/*' element={ <Home />} />
      <Route element={ <NotFound />} />
    </Routes>
  )
}

export default App