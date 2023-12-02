import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ContactForm from '../components/ContactForm'
import CommsTable from '../components/CommsTable'
import { UserContext } from "../components/AppContexts"

const EditContact = (props) => {

    const { thisUser, thisContact, setThisContact } = useContext(UserContext)
    const [linkedin, setLinkedin] = useState(null)
    const [errors, setErrors] = useState([])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
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

    const getLinkedin = () => {
        axios.patch('http://localhost:5000/api/contacts/linkedin/' + thisContact.id + '/' + thisContact.linkedin)
            .then(res => {
                console.log(res)
                setLinkedin(res.data)
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
            <div className="row d-flex align-items-center">
                <div className="col p-4 d-flex flex-column position-static">
                    <h1>Contact: { thisContact.firstName } { thisContact.lastName } </h1>
                    { linkedin ? 
                    <p className="card-text mb-auto"> { linkedin.headline }</p>
                    : <p className="card-text mb-auto"> { thisContact.headline }</p>
                    }
                    { thisContact.linkedin ? 
                    <button className="btn btn-outline-light mt-2 btn-sm col-3" onClick={ getLinkedin }>Get/Update Linkedin Description</button>
                    : null
                    }
                </div>
                <div className="col-auto">
                { (thisContact.photo==1 || linkedin) && 
                    <img src={ `/${thisContact.linkedin}.png` } className="img-thumbnail" />
                }
                </div>  
            </div>

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
            <CommsTable />
        </div>
    )
}

export default EditContact