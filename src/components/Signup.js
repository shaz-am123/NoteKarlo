import React, { useRef, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Spinner from './Spinner'
import authContext from "../context/auth/authContext"
import axios from 'axios'

export default function Signup(props) {
    const showAlert = props.showAlert
    const context = useContext(authContext);

    const { eligible_age_check } = context;
    const [credentials, setCredentials] = useState(
        {
            name: "",
            email: "",
            password: "",
            cnf_password: "",
            dob: "",
            gender: ""
        })

    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const ref = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        if (credentials.password !== credentials.cnf_password) {
            showAlert("Password and confirm password fields do not match", "warning")
            setCredentials({
                name: credentials.name,
                email: credentials.email,
                password: "",
                cnf_password: "",
                dob: credentials.dob,
                gender: credentials.gender
            });
            setLoading(false);
        }
        else if (credentials.gender === "default") {
            showAlert("Gender field was not filled", "warning")
            setCredentials({
                name: credentials.name,
                email: credentials.email,
                password: "",
                cnf_password: "",
                dob: credentials.dob,
                gender: ""
            });
            setLoading(false);
        }
        else if (!eligible_age_check(credentials.dob)) {
            showAlert("Users have to be atleast 3 yrs old", "warning")
            setCredentials({
                name: credentials.name,
                email: credentials.email,
                password: "",
                cnf_password: "",
                dob: "",
                gender: credentials.gender
            });
            setLoading(false);
        }
        else {
            e.preventDefault();
            const response = await fetch("https://notekaro.herokuapp.com/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        name: credentials.name,
                        email: credentials.email,
                        password: credentials.password,
                        dob: credentials.dob,
                        gender: credentials.gender
                    })
            });

            const json = await response.json()

            setLoading(false);

            if (json.success) {
                // save auth token and rediret to home
                localStorage.setItem('token', json.authToken)
                const imgUrl = null

                await fetch("https://notekaro.herokuapp.com/api/dp/addDp", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },
                });
                
                navigate("/home")
                showAlert("Account Created Successfully", "success")
                ref.current.click();
            }
            else {
                showAlert("Account couldn't be created due to server issues", "danger")
            }
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">₦oteKarlo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Welcome to ₦oteKarlo! We are really glad to have you with us.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Spinner />}
            <div className='container my-2'>
                <h3>Already have an account?</h3>
                <Link className='btn btn btn-primary my-1' to='/login'>Login</Link>
            </div>
            <div className='container my-5' style={{ "height": "80%" }}>
                <form>
                    <h1 style={{ 'margin': '2% 0' }}>SignUp to Begin Using ₦oteKarlo</h1>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className='row'>
                        <div className="mb-3 col-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required />
                        </div>
                        <div className="mb-3 col-6">
                            <label htmlFor="cnf_password" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" value={credentials.cnf_password} onChange={onChange} name="cnf_password" id="cnf_password" minLength={5} required />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="mb-3 col-6 col-lg-3">
                            <label htmlFor="dob" className="form-label">Date of Birth</label>
                            <input type="date" onKeyDown={(e) => e.preventDefault()} className="form-control" value={credentials.dob} onChange={onChange} name="dob" id="dob" required />
                        </div>
                        <div className="mb-3 col-6 col-lg-3">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <select className="form-control" value={credentials.gender} onChange={onChange} name="gender" id="gender" required>
                                <option value="default">--Please choose an option--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Na">Don't want to specify</option>
                            </select>

                        </div>
                    </div>
                    <br></br>
                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}
