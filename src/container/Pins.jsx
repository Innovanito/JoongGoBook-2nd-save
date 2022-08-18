import React, {useState} from 'react'
import { Routes, Route} from 'react-router-dom'

import { Navbar, Feed, PinDetail, CreatePin, Search, NotFound} from '../components'

const Pins = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div >
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />
      </div>
      <div className="h-full">
        <Routes>
          <Route exact path='/category/:categoryId' element={<Feed />} />
          <Route exact path='/pin-detail/:pinId' element={<PinDetail user={user && user} />} />
          <Route exact path='/create-pin' element={<CreatePin user={user && user} />} />
          <Route exact path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
          <Route exact path='/' element={<Feed />} />
          <Route path={"*"} element ={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

export default Pins