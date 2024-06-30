import { useState } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Login from './views/auths/Login'
import Register from './views/auths/Register'
import Logout from './views/auths/Dashboard'
import Forgotpassword from './views/auths/Forgotpassword'
import CreatePassword from './views/auths/CreatePassword'
import StoreFooter from './views/base/StoreFooter'
import StoreHeader from './views/base/StoreHeader'
import MainWrapper from './layout/MainWrapper'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <StoreHeader />
      <MainWrapper>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<Logout />} />
          <Route path='/password-reset' element={<Forgotpassword />} />
          <Route path='/create-new-password' element={<CreatePassword />} />
        </Routes>
      </MainWrapper>
      <StoreFooter />
    </BrowserRouter>
  )
}

export default App
