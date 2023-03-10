import React from 'react'
import { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link } from 'react-router-dom'


export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const { signup, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      // Handle the case when email or password is not set
      return;
    } else if(passwordRef.current.value !== passwordConfirmRef.current?.value){
      return setError('Passwords do not match')
    }
    try {
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
  }
  
  return (
    <>
    <Card>
      <Card.Body>
        <img src='vite.svg'/>
        <h2 className='text-center mb-4'>Sign Up</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' ref={emailRef} required />
          </Form.Group>
          <Form.Group id='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' ref={passwordRef} required />
          </Form.Group>
          <Form.Group id='password-confirm'>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type='password' ref={passwordConfirmRef} required />
          </Form.Group>
          <Button disabled={loading} className='w-100 mt-4' type='submit'>Sign Up</Button>
        </Form>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log In</Link>
    </div>
    </>
  )
}
