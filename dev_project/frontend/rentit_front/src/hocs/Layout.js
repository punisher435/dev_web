import React, { useEffect } from 'react';
import NavBar from '../components/Navbar.js'
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../redux/auth/actions/auth_actions';

const Layout = (props) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                await props.checkAuthenticated();
                await props.load_user();
            } catch (err) {

            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <NavBar />
            {props.children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);