import React from 'react'
import { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { login, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      // Handle the case when email or password is not set
      return setError('Email or password Empty')
    } 
    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history('/')
    } catch {
      setError('Failed to sign in')
    }
    setLoading(false)
  }
  
  console.log(currentUser)
  
  return (
    <>
    <Card>
      <Card.Body>
        <h2 className='text-center mb-4'>Log In</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        {currentUser && <Navigate to='/' replace={true}/>}

        <Form onSubmit={handleSubmit}>
          <Form.Group id='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' ref={emailRef} required />
          </Form.Group>
          <Form.Group id='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' ref={passwordRef} required />
          </Form.Group>
          <Button disabled={loading} className='w-100 mt-4' type='submit'>Login</Button>
        </Form>
        <div className='w-100 text-center mt-2'>
           <Link to='/forgot-password'>Fogot Password?</Link>
        </div>
      </Card.Body>
    </Card>
    
    <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
    </div>
    </>
  )
}
