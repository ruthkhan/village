import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ContactForm from '../components/ContactForm'
import { UserContext } from "../components/AppContexts"

const AddContact = (props) => {

    const { thisUser } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const [homepage, setHomepage] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>setHomepage(false), [])

    const createContact = (contactParam) => {
        axios.post('http://localhost:5000/api/contacts/create/' + thisUser.id, contactParam)
            .then((res) => {
                console.log(res)
                navigate("/main")
            })
            .catch((err) => {
                console.log(err.response)
                setErrors(err.response.data)
            })
    }

    return(
        <div>
            <h1>Add New Contact</h1>
            <ContactForm 
                onSubmitProp = { createContact }
                errors = { errors }
                initialFirstName = "" 
                initialLastName = "" 
                initialRole = "Advisor" 
                initialEmail = "" 
                initialPhone = "" 
                initialLinkedin = "" 
                initialPreferred = "Email"
                btnTxt = "Add Contact"
            />
        </div>
    )
}

export default AddContact