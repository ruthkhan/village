import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'
import { UserContext } from "./AppContexts"

const Header = (props) => {

    const { thisUser, setThisUser, thisContact } = useContext(UserContext)
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    const logout = () => {
        setThisUser({})
        console.log("Unauthorised Access")
        navigate("/login")
    }

    useEffect(()=>{
        setLoaded(false)
        if (thisUser==null) { logout() }
            else if (thisContact!=null) {
                if ('user_id' in thisContact) { 
                    if ( thisContact.user_id != thisUser.id ) { logout() }
                } 
            } else { 
                console.log(thisUser)
                setLoaded(true)
                navigate("/main") 
            }
        setLoaded(true)
    }, [thisUser, thisContact])

    return(
        <header className="p-3 mb-3 border-bottom">
            { loaded && 
                <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <Link to="/main">
                        <i className="bi bi-house-fill" id="home"></i>
                    </Link>
                    <ul className="nav nav-pills align-items-center">
                        <li className="nav-item px-4">
                        { loaded && 
                            <Link to="/settings">{ thisUser.firstName } { thisUser.lastName }</Link>
                        }
                        </li>
                        <li className="btn btn-light nav-item" onClick={ logout }>Logout</li>
                    </ul>
                </div>
            }
            <hr />
            <Outlet />
        </header>
    )
}

export default Header