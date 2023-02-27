import React, {useState} from 'react'
import { Button, Card, Alert } from 'react-bootstrap'
// import { auth } from '../firebase'
import { useAuth } from '../Contexts/AuthContext'
import {Link, useNavigate, Navigate} from 'react-router-dom'

export default function DashBoard() {
    
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const history = useNavigate()
    async function handleLogout(){
        setError('')
        
        try {
            await logout()
            history('/login')
        } catch {
            setError('Failed to log out')
        }
    }
    
    if(!currentUser){
        return <Navigate to='/login' replace />
    }
    
    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Profile</h2>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <strong>Email: </strong> {currentUser.email}
                    <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
               <Button variant='link' onClick={handleLogout}>Log Out</Button>
            </div>
        </>
    )
}
