import { useState, createContext, useMemo } from 'react'

const UserContext = createContext()

const UserProvider = (props) => {
    const [thisUser, setThisUser] = useState(null)
    const [thisContact, setThisContact] = useState(null)
    const [thisComm, setThisComm] = useState(null)
    const value = useMemo(() => ({thisUser, setThisUser, thisContact, setThisContact, thisComm, setThisComm}),[thisUser, thisContact, thisComm])
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }