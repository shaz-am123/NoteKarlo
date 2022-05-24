import React, {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import Spinner from './Spinner'

const Login = (props) => {
    const showAlert = props.showAlert
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await fetch("https://notekaro.herokuapp.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        const success = json.success;
        setLoading(false)
        if(success)
        {
            // save auth token and rediret to home
            localStorage.setItem('token', json.authToken)
            navigate("/home")
            showAlert("Logged in Successfully", "success")
        }
        else
        {
            setCredentials({email: "", password: ""}) 
            showAlert("Invalid Credentials", "danger")            
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <>
            {loading && <Spinner />}
            <div className='container my-5'>
                <h3>New to ₦oteKarlo?</h3>    
                <Link className='btn btn btn-primary my-1' to='/signup'>Sign Up</Link>
            </div>
            <div className='container my-3'>
                <form>
                    <h1>Login to Your Account</h1>
                    <br/>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login