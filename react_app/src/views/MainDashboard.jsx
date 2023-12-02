import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import ContactTable from '../components/ContactTable'
import { UserContext } from "../components/AppContexts"

const MainDashboard = (props) => {

    const { thisUser, thisContact, setThisContact } = useContext(UserContext)
    const [contactsList, setContactsList] = useState([])
    const [count, setCount] = useState(0)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        setLoaded(false)
        axios.get("http://localhost:5000/api/contacts/all/" + thisUser.id)
            .then((res)=>{
                console.log(res.data)
                setContactsList(res.data)
                setLoaded(true)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [count])
    
    const setContact = (contactId) => {
        setThisContact({'id': contactId})
        navigate('/contacts/' + contactId) 
    }

    const deleteContact = (contactId) => {
        setLoaded(false)
        if (confirm('Click ok to permanently remove this contact and all communication history with them')) {
            axios.delete('http://localhost:5000/api/contacts/delete/' + contactId)
                .then((res)=> {
                    console.log(res.data)
                    setContactsList(contactsList.filter(contact => contact.id != contactId))
                    setCount(count-1)
                    setLoaded(true)
                })
                .catch(err => console.log(err))
        }
    }

    return(
        <div>
            <h1 className="mb-4">Village Overview</h1>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Last Contact Date</th>
                        <th>Last Contact Channel</th>
                        <th>Company</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                { loaded && (contactsList ? 
                    contactsList.map((one_contact) => 
                    <tr key={ one_contact.contactId }>
                        <td>{ one_contact.firstName } { one_contact.lastName }</td>
                        <td>{ one_contact.commsStatus }</td>
                        <td>{ one_contact.commsDate }</td>
                        <td>{ one_contact.commsChannel }</td>
                        <td>{ one_contact.commsCompany }</td>
                        <td>
                            <button className="btn btn-secondary btn-sm" onClick={(e)=>{setContact(one_contact.contactId)}}> Details </button> 
                            <i className="bi bi-trash3-fill delete" onClick={(e)=>{deleteContact(one_contact.contactId)}} />
                        </td>
                    </tr>
                    )
                    : <tr><td>No contacts found</td></tr>)
                }
                </tbody>
            </table>
            <Link to="/contacts/new">
                <button type="button" className="btn btn-outline-light mt-2">Add new contact</button>
            </Link>
        </div>
    )
}

export default MainDashboard