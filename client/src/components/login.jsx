import React, { useState } from 'react'
import axios from 'axios';

import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setData({ ...formData, [e.target.name]: e.target.value })
    }
    const login_Submit_handle = (e) => {
        e.preventDefault();

        axios({

            // Endpoint to send files
            url: "http://localhost:5000/api/user/signup",
            method: "POST",
            headers: {},

            // Attaching the form data
            data: formData,
        })

            // Handle the response from backend here
            .then((res) => {
                toast('Login succefull')
                window.location.href = '/'
            })

            // Catch errors if any
            .catch((err) => {
                console.log(err);
                if (err.response.status === 404) {
                    setError('email')
                } else if (err.response.status === 400) {
                    setError('password')
                }
                toast.error(err.response.data.message)
            });
    }
    return (
        <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className="" style={{ width: '500px' }}>
                <h3 className='text-center'>Login</h3>
                <form onSubmit={login_Submit_handle} className='mb-3'>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" name="email" onChange={handleChange} class={`form-control ${error === 'email' && "is-invalid"}`} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" name="password" onChange={handleChange} class={`form-control ${error === 'password' && "is-invalid"}`} id="exampleInputPassword1" />
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form> 
                <Link to={`/signup`}><button className='btn btn-warning'>Signup</button></Link>
            </div>
        </div>
    )
}

export default Login