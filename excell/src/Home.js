import React, {useState} from 'react'
import { Button, Form, ListGroup, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login, selectUser } from './features/userSlice'
import { Header } from './Header'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'

export const Home = ({history}) => {
   
    const dispatch = useDispatch()
    const user = useSelector(selectUser)

    const [language,setLanguage] = useState('')
    const [jobs,setJobs] = useState({})
    const [display,setDisplay] = useState('hidden')

    const session = sessionStorage.getItem('excelluser')
    const local = localStorage.getItem('excelluser')
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
    if(!user && !session && local){
        history.push('/signin')
    }

    const getData = async () => {
        const data = await axios.get(`https://jobs.github.com/positions.json?description=${language}`)
        setJobs(data)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        getData()
        setDisplay('visible')
    }

    return (
        <>
        <Header/>
        <ListGroup.Item className='p-1 mx-auto border-0'>
            <Form className='rounded p-3' onSubmit={submitHandler} inline id='search_form'>
                <Form.Control placeholder='Enter language' type='text' id='input_form' required value={language} onChange={e => setLanguage(e.target.value)}></Form.Control>
                <Button type='submit' id='form_submit' variant='info'>Find Jobs</Button>
            </Form>
        </ListGroup.Item>
        <Table style={{ width:'98%' }} className='mx-auto my-3' size='sm' responsive hover bordered>
            <thead style={{visibility:display}}>
                <tr>
                    <th className='text-center'>SNo.</th>
                    <th id='company'>Company</th>
                    <th>Job Title</th>
                    <th id='type'>Job Type</th>
                    <th className='text-center'>Details</th>
                </tr>
            </thead>
            <tbody>
                {jobs && Object.keys(jobs).length!==0 && jobs.data.map((d,index)=>(
                    <tr key={index}>
                        <td className='text-center py-3'>{index+1}</td>
                        <td id='company' className='py-3'>{d.company}</td>
                        <td className='py-3'>{d.title}</td>
                        <td id='type' className='py-3'>{d.type}</td>
                        <td className='text-center py-3'>
                            <Link to={`/job/${d.id}`}>
                                <Button variant='info' size='sm'>Get Details</Button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )
}
