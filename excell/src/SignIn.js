import React, {useState} from 'react'
import { Button, Form, ListGroup, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from './features/userSlice'
import bcrypt from 'bcryptjs'

export const SignIn = ({history}) => {
   
    const dispatch = useDispatch()

    const user = useSelector(selectUser)

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [display,setDisplay] = useState('none')

    const session = sessionStorage.getItem('excelluser')
    const local = JSON.parse(localStorage.getItem('excelluser'))

    if(!session && !local){
        history.push('/register')
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
        if(!user && !session && local){
            if(email===local.email && bcrypt.compareSync(password,local.hash)){
                dispatch(login({
                    email:email,
                    name:local.name
                }))
                sessionStorage.setItem('excelluser',JSON.stringify({email}))
                setDisplay('none')
            }
            else{
                setDisplay('inline')
            }
        }
    }

    return (
        <ListGroup id='register_form' className='mx-auto rounded border'>
            <ListGroup.Item className='border-0 h1 mx-auto'>
                Excell SignIn
            </ListGroup.Item>
            <Form className='rounded' onSubmit={submitHandler}>
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
                <ListGroup.Item className='border-0 mb-0 pb-4'>
                    <Button style={{ width:'100%' }} type='submit' variant='info'>Sign In</Button>
                </ListGroup.Item>
            </Form>
            <ListGroup.Item className='border-0 text-center' style={{display: `${display}`}} >
                <Alert variant='danger'>Invalid email or password</Alert>
            </ListGroup.Item>
        </ListGroup>
    )
}
