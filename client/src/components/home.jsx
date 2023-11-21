import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {

    const [data, setData] = useState({
        age: 0,
        gender: '',
        dob: '',
        mobile: ''
    })

    useEffect(() => {
        axios({

            // Endpoint to send files
            url: "http://localhost:5000/api/user/getProfile",
            method: "GET",
            // headers: {},
            withCredentials: true,

            // Attaching the form data
            // data: data,
        })

            // Handle the response from backend here
            .then((res) => {
                setData({
                    age: res.data.age,
                    dob: res.data.dob,
                    mobile: res.data.mobile
                })
                // console.log(res);
            })

            // Catch errors if any
            .catch((err) => {
                // toast.error(err.response.data.message)
            });
    }, [])

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const Submit_handle = (e) => {
        e.preventDefault();

        if (data.age < 18 || data.gender == '' || data.dob == '' || data.mobile == '') {
            toast.error('fill a all filed')
        } else {
            axios({

                // Endpoint to send files
                url: "http://localhost:5000/api/user/profileUpdate",
                method: "POST",
                headers: {},
                withCredentials: true,

                // Attaching the form data
                data: data,
            })

                // Handle the response from backend here
                .then((res) => {
                    toast('Update succefull')
                })

                // Catch errors if any
                .catch((err) => {
                    toast.error(err.response.data.message)
                });
        }
    }

    const logout = () => {
        axios({

            // Endpoint to send files
            url: "http://localhost:5000/api/user/logout",
            method: "POST",
            headers: {},
            withCredentials: true,

            // Attaching the form data
            data: data,
        })

            // Handle the response from backend here
            .then((res) => {
                toast('logout succefull')
            })

            // Catch errors if any
            .catch((err) => {
                // toast.error(err.response.data.message)
            });
    }

    return (
        <div className="container d-flex justify-content-center align-items-center flex-column" style={{ height: '600px' }}>
            <h4>Profile</h4>
            <form onSubmit={Submit_handle}>
                <div>
                    <label >Age</label>
                    <input value={data.age} onChange={handleChange} className='form-control' type="number" name="age" id="" />
                </div>
                <div>
                    <label >Gender</label><br />
                    <input onChange={handleChange} className='me-2' type="radio" name="gender" value='male' />
                    <label>Male</label><br />
                    <input onChange={handleChange} className='me-2' type="radio" name="gender" value='female' />
                    <label>Female</label>
                </div>
                <div>
                    <label >DOB</label>
                    <input value={data.dob} onChange={handleChange} className='form-control' type="date" name="dob" />
                </div>
                <div>
                    <label>Mobile</label>
                    <input value={data.mobile} onChange={handleChange} type="number" name="mobile" className="form-control" />
                </div>
                <div className='mt-3'>
                    <button type="submit" class="btn btn-primary">Update</button>
                    <button onClick={logout} class="btn btn-danger mx-2">Logout</button>
                    <Link to={`/login`} class="btn btn-warning">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Home