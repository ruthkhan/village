import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import ContactTable from '../components/ContactTable'

const MainDashboard = (props) => {

    const { thisUser, setThisUser, thisContact, setThisContact } = props
    const [homepage, setHomepage] = useState(true)

    return(
        <div>
            <Header 
                thisUser = { thisUser }
                setThisUser = { setThisUser }
                thisContact = { thisContact }
                homepage = { homepage }
            />
            <h1 className="mb-4">Village Overview</h1>
            <ContactTable 
                thisUser = { thisUser } 
                thisContact = { thisContact }
                setThisContact = { setThisContact }
            />
        </div>
    )
}

export default MainDashboard