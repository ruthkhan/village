import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
import CommsForm from '../components/CommsForm'
import CommsTable from '../components/CommsTable'

const EditComms = (props) => {

    const { thisUser, setThisUser, thisContact, thisComm, setThisComm } = props
    const [errors, setErrors] = useState([])
    const [homepage, setHomepage] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setHomepage(false)
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
            <Header 
                thisUser = { thisUser }
                setThisUser = { setThisUser }
                thisContact = { thisContact }
                homepage = { homepage }
            />
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
            <CommsTable 
                thisUser = { thisUser }
                thisContact = { thisContact }
                thisComm = { thisComm }
                setThisComm = { setThisComm }
            />
        </div>
    )
}

export default EditComms