import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Image, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Header } from './Header'

export const JobScreen = ({match}) => {
    
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
         <Container className='my-5'>
            <ListGroup className='border'>
                {jobDetails && 
                <>
                <ListGroup.Item className='border-0'><Image id='image_job' src={jobDetails.company_logo}/></ListGroup.Item>
                <ListGroup.Item className='border-0'>
                    <a target='_blank' rel='noopener noreferrer' href={jobDetails.company_url} style={{ color:'black' }}>
                        Visit site {" "}{jobDetails.company}
                    </a>
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                    <h6>Job Title</h6>
                    {jobDetails.title}
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                    <h6>Job Type</h6>
                    {jobDetails.type}
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                    <h6>Job Location</h6>
                    {jobDetails.location}
                </ListGroup.Item>
                <ListGroup.Item className='border-0'>
                    <h6>Job Description</h6>
                    {jobDetails.description && jobDetails.description.length > 0 && jobDetails.description.split('. ').slice(0,3).join(' ')}
                </ListGroup.Item>
                <ListGroup.Item className='border-0 text-center pb-3'>
                    <Link to={`/apply/${id}`} style={{ textDecoration:'none', color:'white' }}>
                        <Button id='apply' variant='info'>Apply</Button>
                    </Link>
                </ListGroup.Item>
                </>
                }
            </ListGroup>
         </Container>
        </>
    )
}
