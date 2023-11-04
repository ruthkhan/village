import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = (props) => {

    const { thisUser, setThisUser, thisContact, homepage } = props
    const navigate = useNavigate()

    const logout = () => {
        setThisUser([])
        console.log("Unauthorised Access")
        navigate("/")
    }

    useEffect(()=>{
        if (thisUser.length < 1) { logout() 
        }
        if (thisContact.length > 1) {
            if ('user_id' in thisContact) { 
                if ( thisContact.user_id != thisUser.id ) { logout() }
            }
        }
    }, [thisUser, thisContact])

    return(
        <header className="p-3 mb-3 border-bottom">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
                { homepage ? 
                <div className="col-sm-2"></div> : 
                <Link to="/main">
                    <i className="bi bi-house-fill" id="home"></i>
                </Link>
                }
                <ul className="nav nav-pills">
                    <li className="nav-item px-4">{ thisUser.firstName } { thisUser.lastName }</li>
                    <li className="btn btn-light nav-item" onClick={ logout }>Logout</li>
                </ul>
            </div>
        </header>
    )
}

export default Header