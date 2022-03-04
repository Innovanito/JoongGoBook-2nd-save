import React from 'react'
import { Routes, Route} from "react-router-dom";

import Home from './container/Home'
import { Signin, Signup } from './components';
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Routes>
      <Route exact path='/*' element={ <Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signup' element={<Signup />} />
      <Route element={ <NotFound />} />
    </Routes>
  )
}

export default App