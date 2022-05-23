import React from 'react'
import { Link } from 'react-router-dom'
import profileImg from './profile.jpg'



export default function Profile() {
    // const User
    return (
        <div className='container row'>
            <div className="card my-auto col-lg-4" style={{lineHeight: '1.5'}}>
                <img src={profileImg} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h4 className="card-title my-3">Name: XYZ</h4>
                        <p className="card-text">Email Address: XYZ</p>
                        <p className="card-text">Date of Birth: XYZ</p>
                        <p className="card-text">Gender: XYZ</p>
                        <Link to="/" className="btn btn-primary my-3">Home</Link>
                    </div>
            </div>
        </div>
    )
}
