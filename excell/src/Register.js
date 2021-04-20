import React, {useState} from 'react'
import { Button, Form, ListGroup, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from './features/userSlice'
import bcrypt from 'bcryptjs'

export const Register = ({history}) => {
   
    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [display,setDisplay] = useState('none')

    const local = localStorage.getItem('excelluser')
    const session = sessionStorage.getItem('excelluser')

    
    if(!session && local){
        history.push('/signin')
    }
    
    if(!user && session && local){
        dispatch(login({
            name:session.name, 
            email:session.email
        }))
        history.push('/')
    }
    
    if(user && session && local){
        history.push('/')
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        const hash = bcrypt.hashSync(password, 10);
        if(password!==confirmPassword){
            setDisplay('inline')
        }
        else{
            if(!session && !local){
                setDisplay('none')
                localStorage.setItem('excelluser',JSON.stringify({name,email,hash}))
                dispatch(login({
                    email:email,
                    name:name
                }))
                sessionStorage.setItem('excelluser',JSON.stringify({name,email,hash}))
                history.push('/')
            }
        }
    }

    return (
        <ListGroup id='register_form' className='mx-auto rounded border'>
            <ListGroup.Item className='border-0 h1 mx-auto'>
                Excell SignUp
            </ListGroup.Item>
            <Form className='rounded' onSubmit={submitHandler}>
                <ListGroup.Item className='border-0 mb-0 pb-0'>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' required value={name} onChange={e => setName(e.target.value)}></Form.Control>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 mb-0 pb-0'>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' required value={email} onChange={e => setEmail(e.target.value)}></Form.Control>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 mb-0 pb-0'>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' required value={password} onChange={e => setPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 mb-0 pb-0'>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 mb-0 pb-4'>
                    <Button style={{ width:'100%' }} type='submit' variant='info'>Sign Up</Button>
                </ListGroup.Item>
            </Form>
            <ListGroup.Item className='border-0 text-center' style={{display: `${display}`}} >
                <Alert variant='danger'>Passwords do not match</Alert>
            </ListGroup.Item>
        </ListGroup>
    )
}
