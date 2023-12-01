import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import CommsForm from '../components/CommsForm'
import CommsTable from '../components/CommsTable'
import { UserContext } from "../components/AppContexts"

const EditComms = (props) => {

    const { thisContact, thisComm, setThisComm } = useContext(UserContext)
    const [errors, setErrors] = useState([])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoaded(false)
        axios.get("http://localhost:5000/api/comms/" + thisComm.id)
        .then((res)=>{
            console.log(res.data)
            setThisComm(res.data)
            setLoaded(true)
        })
        .catch((err)=>{
            console.log(err);
        })    
    }, [])

    const updateComm = (commParam) => {
        axios.patch('http://localhost:5000/api/comms/update/' + thisContact.id + '/' + thisComm.id, commParam)
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
            { loaded && 
                <CommsForm 
                    onSubmitProp = { updateComm }
                    errors = { errors }
                    initialCommsDate = { thisComm.commsDate }
                    initialChannel = { thisComm.channel }
                    initialCompany = { thisComm.company }
                    initialStatus = { thisComm.status }
                    initialSummary = { thisComm.summary }
                    btnTxt = "Update Communication"
                />
            }
            <hr />
            <CommsTable />
        </div>
    )
}

export default EditComms