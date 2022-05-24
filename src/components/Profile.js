import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import profileImg from './profile.jpg'
import Spinner from './Spinner';

export default function Profile() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        dob: '',
        gender: ''
    })
    const host = "https://notekaro.herokuapp.com/api";

    useEffect(() => {
        fetch(`${host}/auth/getuser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

        })
            .then(async data => {
                const json = await data.json();
                setUser({
                    name: json.name,
                    email: json.email,
                    dob: json.dob,
                    gender: json.gender
                })
            })
    }, [])
    return (
        <>{user.name !== '' ? (<div className='container justify-content-center col'>
            <div className="card col-lg-4" style={{ 'lineHeight': '1.5' }}>
                <img src={profileImg} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h4 className="card-title my-3">Name: {user?.name}</h4>
                    <p className="card-text">Email: {user?.email}</p>
                    <p className="card-text">Date of Birth: {(user?.dob.slice(0, 10).split("-").reverse().join("-"))}</p>
                    <p className="card-text">Gender: {user?.gender}</p>
                    <Link to="/home" className="btn btn-primary my-3">Home</Link>
                </div>
            </div>
        </div>) : <Spinner />}
        </>


    )
}
