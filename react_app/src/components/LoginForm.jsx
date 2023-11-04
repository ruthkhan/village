import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const LoginForm = (props) => {

    const { onSubmitProp, errors } = props
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({ email, password })
    }

    return(
        <div>
            <form onSubmit={ onSubmitHandler }>
                <div className="row mb-3">
                    <ul>
                    { errors.length!=0 ? 
                        <li className="text-danger mx-3">Invalid email/password</li>
                        : null 
                    }
                    </ul>
                    <label htmlFor='email' className="form-label col-sm-2">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="email" onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor='password' className="form-label col-sm-2">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                </div>
                <div className="row">
                <div className="col-sm-2"></div>
                <div className="col-auto">
                    <button className="btn btn-outline-light btn-lg px-4 me-4" type="submit">Sign In</button>
                    <Link to={'/register'}>Registration Page</Link>
                </div>
            </div>             
            </form>
        </div>
    )
}

export default LoginForm