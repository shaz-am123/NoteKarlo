import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(props) {
    const showAlert = props.showAlert
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cnf_password: ""}) 
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(credentials.password!==credentials.cnf_password)
        {
          showAlert("Password and confirm password fields do not match", "warning")
          setCredentials({name:"", email: "", password: "", cnf_password: ""});
        }
        else{
          e.preventDefault();
          const response = await fetch("https://notekaro.herokuapp.com/api/auth/signup", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password})
          });

          const json = await response.json()
          console.log(json);

          if(json.success)
          {
              // save auth token and rediret to home
              localStorage.setItem('token', json.authToken)
              navigate("/")
              showAlert("Account Created Successfully", "success")
          }
          else
          {
            showAlert("Account couldn't be created due to server issues", "danger")
          }
       }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

  return (
      <div className='container my-3'>
            <form>
                <h1 style={{'margin':'2% 0'}}>SignUp to Begin Using iNotebook</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cnf_password" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cnf_password} onChange={onChange} name="cnf_password" id="cnf_password" minLength={5} required/>
                </div>

                <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}
