import React from 'react'
import { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null)
  const { resetPassword, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if (!emailRef.current?.value ) {
      // Handle the case when email or password is not set
      return setError('Email field is Empty')
    } 
    try {
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError('Failed to reset password')
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
        {message && <Alert variant='success'>{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' ref={emailRef} required />
          </Form.Group>
          <Button disabled={loading} className='w-100 mt-4' type='submit'>Reset Password</Button>
        </Form>
        <div className='w-100 text-center mt-2'>
           <Link to='/login'>Login</Link>
        </div>
      </Card.Body>
    </Card>
    
    <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/signup'>Sign Up</Link>
    </div>
    </>
  )
}
