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
import Products from './views/store/Products'
import './App.css'
import Dashboard from './views/auths/Dashboard'
import ProductDetail from './views/store/ProductDetail'

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
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/password-reset' element={<Forgotpassword />} />
          <Route path='/create-new-password' element={<CreatePassword />} />


          <Route path='/' element={<Products />} />
          <Route path='/detail/:slug' element={<ProductDetail />} />
        </Routes>
      </MainWrapper>
      <StoreFooter />
    </BrowserRouter>
  )
}

export default App
