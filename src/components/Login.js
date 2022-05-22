import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const showAlert = props.showAlert
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch("https://notekaro.herokuapp.com/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if(json.success)
        {
            // save auth token and rediret to home
            localStorage.setItem('token', json.authToken)
            navigate("/")
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
    )
}

export default Login