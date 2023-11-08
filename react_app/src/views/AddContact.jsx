import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import ContactForm from '../components/ContactForm'

const AddContact = (props) => {

    const { thisUser, setThisUser, thisContact } = props
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
            <Header 
                thisUser = { thisUser }
                setThisUser = { setThisUser }
                thisContact = { thisContact }
                homepage = { homepage }
            />
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