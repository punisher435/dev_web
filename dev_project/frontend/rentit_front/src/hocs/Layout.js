import React, { useEffect,useState } from 'react';
import NavBar from '../components/Navbar.js'
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../redux/auth/actions/auth_actions';

const Layout = (props) => {
    const [num,setnum] = useState(0);
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
    useEffect(() => {
        console.log = console.warn = console.error = () => {};
      },[])

     

     

    return (
        <div>
            <NavBar />
            {props.children}
        </div>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);