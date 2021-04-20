import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../redux/auth/actions/auth_actions';
import '../components/css/App.css';
import Button from '@material-ui/core/Button';

const ResetPassword = (props) => {
    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        props.reset_password(email);
        setRequestSent(true);
    };

    if (requestSent)
        return <Redirect to='/' />
    return (
        <div className='container mt-5'>
            <h1>Request Password Reset:</h1>
            <br />
            <form>
                <div className='form-group'>
                    <input 
                        className='form-control'
                        type='email'
                        placeholder='Your Email'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                
            </form>
            <Button color="primary" className='buttonmainclass' variant="contained" onClick={e => onSubmit(e)}>Reset Password</Button>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);