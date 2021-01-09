import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/auth/actions/auth_actions';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import styles from './css/navbar.module.css';

const NavBar = ({ isAuthenticated, logout }) => {
    const authLinks = (
        <li>
            <a className={`nav-link ${styles.textclass}`} onClick={logout} href='#!'>Logout</a>
        </li>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <NavLink className={`nav-link ${styles.textclass}`} exact to='/login'>Login</NavLink>
            </li>
            <li>
                <NavLink className={`nav-link ${styles.textclass}`} exact to='/signup'>Sign Up</NavLink>
            </li>
        </Fragment>
    );

    const mystyle = {
        color:'#3f51b5',
    }

    return (
        <Navbar expand="lg" fixed='top' className={styles.myclass}>
  <Navbar.Brand className={styles.textclass1}>Rentit</Navbar.Brand>
  <Navbar.Toggle id={styles.toggle} aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
    <NavLink className={`nav-link ${styles.textclass}`} exact to='/'>Home</NavLink>
    <NavLink className={`nav-link ${styles.textclass}`} exact to='/about'>About</NavLink>
   
            { <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment> }
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.authreducers.isAuthenticated
});

export default connect(mapStateToProps, { logout })(NavBar);



