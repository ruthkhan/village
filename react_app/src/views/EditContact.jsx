import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import ContactForm from '../components/ContactForm'
import CommsTable from '../components/CommsTable'

const EditContact = (props) => {

    const { thisUser, setThisUser, thisContact, setThisContact, thisComm, setThisComm } = props
    const [errors, setErrors] = useState([])
    const [homepage, setHomepage] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setHomepage(false)
        axios.get("http://localhost:5000/api/contacts/" + thisContact.id)
        .then((res)=>{
            console.log(res.data)
            setThisContact(res.data)
            setLoaded(true)
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [])

    const updateContact = (contactParam) => {
        axios.patch('http://localhost:5000/api/contacts/update/' + thisUser.id + '/' + thisContact.id, contactParam)
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
            <h1>Contact: { thisContact.firstName } { thisContact.lastName } </h1>
            { loaded && 
                <ContactForm 
                    onSubmitProp = { updateContact }
                    errors = { errors }
                    initialFirstName = { thisContact.firstName }
                    initialLastName = { thisContact.lastName }
                    initialRole = { thisContact.role }
                    initialEmail = { thisContact.email }
                    initialPhone = { thisContact.phone }
                    initialLinkedin = { thisContact.linkedin }
                    initialPreferred = { thisContact.preferred }
                    btnTxt = "Update Contact Info"
                />
            }
            <hr />
            <CommsTable 
                thisUser = { thisUser }
                thisContact = { thisContact }
                thisComm = { thisComm }
                setThisComm = { setThisComm }
            />
        </div>
    )
}

export default EditContact