import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const RegistrationForm = (props) => {

    const { onSubmitProp, errors } = props
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cfmPassword, setCfmPassword] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({ firstName, lastName, email, password, cfmPassword })
    }

    return(
        <form onSubmit={ onSubmitHandler }>
            <div className="row my-3">
                <ul>
                { errors ? 
                    errors.map(err => 
                        <li key={err} className="text-danger mx-3">{ err }</li>)
                    : null
                }
                </ul>
                <label htmlFor='firstName' className="form-label col-sm-2">First Name</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="firstName" onChange={(e)=>setFirstName(e.target.value)}></input>
                </div>
                <label htmlFor='lastName' className="form-label col-sm-2">Last Name</label>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="lastName" value={ lastName } onChange={(e)=>setLastName(e.target.value)}></input>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor='email' className="form-label col-sm-2">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="email" value={ email } onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor='password' className="form-label col-sm-2">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="password" value={ password } onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor='cfmPassword' className="form-label col-sm-2">Re-Enter Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="cfmPassword" value={ cfmPassword } onChange={(e)=>setCfmPassword(e.target.value)}></input>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-auto">
                    <button className="btn btn-outline-light btn-lg px-4 me-4" type="submit">Register</button>
                    <Link to={'/'}>Login Page</Link>
                </div>
            </div>
        </form>
    )
}

export default RegistrationForm