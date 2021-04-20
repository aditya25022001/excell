import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Form, ListGroup } from 'react-bootstrap'
import { Header } from './Header'

export const Apply = ({history, match}) => {
    
    const id = match.params.id

    const [jobDetails, setJobDetails] = useState({})

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [note, setNote] = useState('')
    const [display, setDisplay] = useState('none')
    
    const getData = async () => {
        const data = await axios.get(`https://jobs.github.com/positions/${id}.json?markdown=true`)
        setJobDetails(data.data)
    }

    useEffect(()=>{
        getData()
    },[])

    const submitHandler = (e) => {
        e.preventDefault()
        sessionStorage.setItem('applied',JSON.stringify({name,email,note}))
        setDisplay('inline')
        setTimeout(()=>{
            history.push(`/applied/${id}`)
        },3000)
    }

    return (
        <>
        <Header/>
        <ListGroup id='apply_form' className='border mx-auto'>
            <ListGroup.Item className='border-0 h1 mx-auto'>
                Excell Easy Apply
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
                Applying for{" "}{jobDetails.title}{" "}at{jobDetails.company}
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
                        <Form.Label>Cover letter note</Form.Label>
                        <Form.Control type='text' as='textarea' rows={3} required value={note} onChange={e => setNote(e.target.value)}></Form.Control>
                    </Form.Group>
                </ListGroup.Item>
                <ListGroup.Item className='border-0 mb-0 pb-4'>
                    <Button style={{ width:'100%' }} type='submit' variant='info'>Apply</Button>
                </ListGroup.Item>
            </Form>
            <ListGroup.Item className='border-0 text-center' style={{display: `${display}`}} >
                <Alert variant='success'>Applied successfully</Alert>
            </ListGroup.Item>
        </ListGroup>
        </>
    )
}
