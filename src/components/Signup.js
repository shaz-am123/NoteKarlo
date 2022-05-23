import React, { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Spinner from './Spinner'

export default function Signup(props) {
    const showAlert = props.showAlert
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cnf_password: "" })
    let navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const ref = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (credentials.password !== credentials.cnf_password) {
            showAlert("Password and confirm password fields do not match", "warning")
            setCredentials({ name: "", email: "", password: "", cnf_password: "" });
            setLoading(false);
        }
        else {
            e.preventDefault();
            const response = await fetch("https://notekaro.herokuapp.com/api/auth/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });

            const json = await response.json()

            setLoading(false);

            if (json.success) {
                // save auth token and rediret to home
                localStorage.setItem('token', json.authToken)
                navigate("/")
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
            <button ref={ref}  type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Welcome to iNotebook! We are really glad to have you with us.
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" aria-label="Close">Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Spinner />}
            <div className='container my-5'>
                <h3>Already have an account?</h3>
                <Link className='btn btn btn-primary my-1' to='/login'>Login</Link>
            </div>
            <div className='container my-3'>
                <form>
                    <h1 style={{ 'margin': '2% 0' }}>SignUp to Begin Using iNotebook</h1>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cnf_password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" value={credentials.cnf_password} onChange={onChange} name="cnf_password" id="cnf_password" minLength={5} required />
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}
