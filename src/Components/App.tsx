import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../Contexts/AuthContext'
import Signup from './Signup'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import DashBoard from './DashBoard'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'

function App() {
  
  return (
      <Container className='d-flex align-items-center justify-content-center'
        style={{minHeight: '100vh'}}
      >
        <div className='w-100' style={{maxWidth: '400px'}}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route path='/' element={<DashBoard />} />
                <Route path='/update-profile' element={<UpdateProfile />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </Container>
  )
}

export default App
