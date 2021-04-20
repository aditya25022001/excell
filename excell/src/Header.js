import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from './features/userSlice'

export const Header = () => {

    const dispatch = useDispatch()

    const logoutHandler = () => { 
        dispatch(logout())
        sessionStorage.removeItem('excelluser')
    }

    const deleteAccountHandler = () => { 
        dispatch(logout())
        sessionStorage.removeItem('excelluser')
        localStorage.removeItem('excelluser')
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">Excell Task</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"></Nav>
                <Nav>
                    <Nav.Link href="/" onClick={logoutHandler}>Logout</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/" onClick={deleteAccountHandler}>Delete Account</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
