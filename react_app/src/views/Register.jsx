import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import RegistrationForm from '../components/RegistrationForm'
import peopleBanner from '../assets/peopleBanner.jpg'

const Register = (props) => {

    const { thisUser, setThisUser } = props
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const createUser = (userParam) => {
        axios.post('http://localhost:5000/api/users/create', userParam)
            .then((res) => {
                console.log(res)
                setThisUser(res.data)
                navigate("/main")
            })
            .catch((err) => {
                console.log(err.response)
                setErrors(err.response.data)
            })
    }

    return(
        <div className="p-3 container" id="regForm">
            <h1 className="mb-4">Manage Your Village</h1>
            <img src={ peopleBanner } alt="People Banner" className="img-fluid" />
            <RegistrationForm 
                onSubmitProp = { createUser }
                errors = { errors }
            />
        </div>
    )
}

export default Register