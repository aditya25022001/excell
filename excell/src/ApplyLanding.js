import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Header } from './Header'

export const ApplyLanding = ({history,match}) => {

    const id = match.params.id
    
    const [jobDetails, setJobDetails] = useState({})

    const getData = async () => {
        const data = await axios.get(`https://jobs.github.com/positions/${id}.json?markdown=true`)
        setJobDetails(data.data)
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <>
         <Header/>
         <ListGroup className='border mx-auto' id='apply_success'>
         <ListGroup.Item className='border-0 h1 mx-auto'>
                Excell Easy Applied
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
                Applied for {jobDetails.title}
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
                Applied at {jobDetails.company}
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
                Application Details
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
                <ListGroup className='mt-0'>
                    <ListGroup.Item className='border-0'><span>Name : </span>{JSON.parse(sessionStorage.getItem('applied')).name}</ListGroup.Item>
                    <ListGroup.Item className='border-0'><span>Email : </span>{JSON.parse(sessionStorage.getItem('applied')).email}</ListGroup.Item>
                    <ListGroup.Item className='border-0'><span>Cover Note : </span>{JSON.parse(sessionStorage.getItem('applied')).note}</ListGroup.Item>
                </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item className='border-0'>
                <Link to='/' style={{ textDecoration:'none', color:'white' }}>
                    <Button style={{ width:'100%' }} variant='info'>Back to Search</Button>
                </Link>
            </ListGroup.Item>
         </ListGroup>   
        </>
    )
}
