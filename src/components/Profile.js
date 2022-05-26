import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import Axios from 'axios'

export default function Profile() {

    const [loading, setLoading] = useState(false)
    const [profileImg, setProfileImg] = useState('')
    const [imageSelected, setImageSelected] = useState('')
    const uploadImg = (event) => {

        setLoading(true);
        const formData = new FormData()
        formData.append('file', imageSelected)
        formData.append("upload_preset", process.env.CLOUD_PRESET)

        Axios.post(`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`, formData).then(
            async (response) => {
                const imgUrl = response.data.secure_url;
                setProfileImg(imgUrl)
                await fetch("https://notekaro.herokuapp.com/api/auth/updatedp", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('token')
                    },

                    body: JSON.stringify({imgUrl})
                })

                setLoading(false);
            }
        )
    }

    const host = "https://notekaro.herokuapp.com/api";
    const [user, setUser] = useState({
        name: '',
        email: '',
        dob: '',
        gender: ''
    })

    
    useEffect(() => {

        fetch("https://notekaro.herokuapp.com/api/auth/getdp", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        }).then(async data => {
            const json = await data.json();
            setProfileImg(json.imgUrl)
        })

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
        <>{user.name !== '' ? (<div className='container justify-content-center row'>
            <div className="card col-lg-4" style={{ 'lineHeight': '1.5' }}>
                {loading?<Spinner/>: <img src={profileImg} className="card-img-top my-2" alt="..." />}
                <input onChange={(event) => {
                    setImageSelected(event.target.files[0])
                }}
                    type="file"/>
                <i onClick={uploadImg}  style={{"fontSize":'2rem'}}className="fa fa-plus-circle my-1" aria-hidden="true"></i>
                <div className="card-body">
                    <h4 className="card-title my-3">Name: {user?.name}</h4>
                    <p className="card-text">Email: {user?.email}</p>
                    <p className="card-text">Date of Birth: {(user?.dob.slice(0, 10).split("-").reverse().join("-"))}</p>
                    <p className="card-text">Gender: {user?.gender}</p>
                    <Link to="/home" className="btn btn-dark my-3">Home</Link>
                </div>
            </div>
        </div>) : <Spinner />}
        </>


    )
}
