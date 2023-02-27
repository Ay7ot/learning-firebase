import React from 'react'
import { useRef, useState } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../Contexts/AuthContext'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

export default function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const passwordConfirmRef = useRef<HTMLInputElement>(null)
  const {  currentUser, updateemail, updatepassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useNavigate()
  
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(passwordRef.current?.value !== passwordConfirmRef.current?.value){
        return setError('Passwords do not match')
        }
        
        const promises = []
        setLoading(true)
        setError('')
        if(emailRef.current?.value !== undefined && currentUser !== null && emailRef.current?.value !== currentUser.email){
            promises.push(updateemail(emailRef.current?.value))
        }
        if(passwordRef.current?.value){
            promises.push(updatepassword(passwordRef.current.value))
        }
        
        Promise.all(promises).then(()=>{
            history('/')
        }).catch(()=>{
            setError('Failed to update Account')
        }).finally(()=>{
            setLoading(false)
        })
        
   
    }
  
  if(!currentUser){
    return <Navigate to="/login" />
  }
  
  return (
    <>
    <Card>
      <Card.Body>
        <h2 className='text-center mb-4'>Update Profile</h2>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          {currentUser.email!==null && (
            <Form.Group id='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' ref={emailRef} defaultValue={currentUser.email}/>
          </Form.Group>
          )}
          <Form.Group id='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' ref={passwordRef} placeholder='Leave blank to keep same'/>
          </Form.Group>
          <Form.Group id='password-confirm'>
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type='password' ref={passwordConfirmRef}  placeholder='Leave blank to keep same'/>
          </Form.Group>
          <Button disabled={loading} className='w-100 mt-4' type='submit'>Update</Button>
        </Form>
      </Card.Body>
    </Card>
    <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/'>Cancel</Link>
    </div>
    </>
  )
}
