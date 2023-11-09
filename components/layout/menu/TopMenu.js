import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './TopMenu.module.css'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { isLoggedIn } from '../../../redux/features/accounts/users/UserSlice';
import { useMemo } from 'react';


const TopMenu = () => {

  return (
    <Navbar expand="lg" data-bs-theme="dark" className={`bg-dark`} >
    <Container>
        <div className={`${styles.menuContainer}`}>
      <Navbar.Collapse className={`${styles.menuCollapse}`} id="basic-navbar-nav">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto right">
          <Nav.Link className='text-light' href="#home">خانه</Nav.Link>
          <Nav.Link className='text-light' href="#link">لینک</Nav.Link>
          <NavDropdown active={true} className={styles.menuDropDown} title="منو" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">مقالات 1</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              مقالات 2
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">مقالات 3</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              مقالات جدا
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
      </div>
      <Navbar.Brand className={`text-light ${styles.menuBrand}`} href="#home">وبسایت من</Navbar.Brand>
    </Container>
  </Navbar>
  )
}

export default TopMenu