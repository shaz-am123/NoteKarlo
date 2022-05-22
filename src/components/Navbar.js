import React from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Navbar(props) {
    let location = useLocation();
    React.useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }

  return (
    <>
      <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{props.title}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className = {`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==='/about'?'active':''}`}  to="/about">{props.about}</Link>
                        </li>
                        
                    </ul>
                    {localStorage.getItem('token') ? 
                        <button type='button' className='btn btn-light mx-2' onClick={handleLogout}>Logout</button> :
                        <form className="d-flex">
                            <Link type="button" to="/login" className="btn btn-light mx-2">Login</Link>
                            <Link type="button" to="/signup" className="btn btn-light mx-2">Sign Up</Link>
                        </form>}
                </div>
            </div>
        </nav>
    </>
  )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    about: PropTypes.string
}

Navbar.defaultProps = {
    about: "About"
}
