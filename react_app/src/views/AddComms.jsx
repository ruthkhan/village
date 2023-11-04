import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import CommsForm from '../components/CommsForm'
import CommsTable from '../components/CommsTable'

const EditContact = (props) => {

    const { thisUser, setThisUser, thisContact, thisComm, setThisComm } = props
    const [errors, setErrors] = useState([])
    const [homepage, setHomepage] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {setHomepage(false)}, [])

    const createComm = (contactParam) => {
        console.log(contactParam)
        axios.post('http://localhost:5000/api/comms/create/' + thisContact.id, contactParam)
            .then((res) => {
                console.log(res)
                navigate("/contacts/" + thisContact.id)
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
            <CommsForm 
                onSubmitProp = { createComm }
                errors = { errors }
                initialCommsDate = ""
                initialChannel = "Email"
                initialCompany = ""
                initialStatus = "I need to followup"
                initialSummary = ""
                btnTxt = "Add Communication"
            />
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