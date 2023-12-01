import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import RegistrationForm from "../components/RegistrationForm"
import { UserContext } from "../components/AppContexts"

const Settings = (props) => {

    const { thisUser, setThisUser } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

    const updateUser = (userParam) => {
        axios.patch('http://localhost:5000/api/users/' + thisUser.id, userParam)
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

    return (
        <div className="container py-3">
            <h3 className="d-flex justify-self-start mb-3">My Profile</h3>
            <RegistrationForm 
                onSubmitProp = { updateUser }
                errors = { errors }
                initialFirstName = { thisUser.firstName }
                initialLastName = { thisUser.lastName }
                initialEmail = { thisUser.email }
                btnTxt = "Update my details"
                disablePwd = {true}
            />
        </div>
    )
}

export default Settings