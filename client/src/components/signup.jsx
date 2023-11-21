import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const Signup = () => {

    const [formData, setData] = useState({
        email: '',
        password: ''
    })

    const handeChange = (e) => {
        setData({ ...formData, [e.target.name]: e.target.value })
    }

    const createUser = (e) => {
        e.preventDefault();

        axios({

            // Endpoint to send files
            url: "http://localhost:5000/api/user/createUser",
            method: "POST",
            headers: {

                // Add any auth token here
                authorization: "your token comes here",
            },

            // Attaching the form data
            data: formData,
        })

            // Handle the response from backend here
            .then((res) => {
                toast('create')
                window.location.href = '/login'
            })

            // Catch errors if any
            .catch((err) => {
                console.log(err);

                toast.error(err.response.data.message)
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form onSubmit={createUser}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handeChange} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label" >Password</label>
                    <input type="password" class="form-control" name='password' id="exampleInputPassword1" onChange={handeChange} />
                </div>

                <button type="submit" class="btn btn-primary">Create account</button>
            </form>
        </div>
    )
}

export default Signup