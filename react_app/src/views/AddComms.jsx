import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CommsForm from '../components/CommsForm'
import CommsTable from '../components/CommsTable'
import { UserContext } from "../components/AppContexts"

const EditContact = (props) => {

    const { thisContact } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const navigate = useNavigate()

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
            <CommsTable />
        </div>
    )
}

export default EditContact