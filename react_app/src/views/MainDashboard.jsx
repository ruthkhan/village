import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import ContactTable from '../components/ContactTable'
import { UserContext } from "../components/AppContexts"

const MainDashboard = (props) => {

    const { thisUser, thisContact, setThisContact } = useContext(UserContext)
    const [contactsList, setContactsList] = useState([])
    const [loaded, setLoaded] = useState(false)

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
    }, [])
    
    return(
        <div>
            <h1 className="mb-4">Village Overview</h1>
            { loaded && 
                <ContactTable 
                    thisContact = {thisContact}
                    setThisContact = {setThisContact}
                    contactsList = {contactsList}
                    setContactsList = {setContactsList}
                    loaded = {loaded}
                    setLoaded = {setLoaded}
                />
            }
        </div>
    )
}

export default MainDashboard