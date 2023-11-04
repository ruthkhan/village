import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import LoginForm from '../components/LoginForm'

const Login = (props) => {

    const { thisUser, setThisUser } = props
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const checkUser = (userParam) => {
        axios.post('http://localhost:5000/api/users/login', userParam)
            .then((res) => {
                console.log(res)
                setThisUser(res.data)
                navigate("/main")
            })
            .catch((err) => {
                console.log(err.response.data)
                setErrors(err.response.data)
            })
    }

    return(
        <div className="p-3 container">
            <h1>Welcome to the Village</h1>
            <LoginForm 
                onSubmitProp = { checkUser }
                errors = { errors }
            />
        </div>
    )
}

export default Login