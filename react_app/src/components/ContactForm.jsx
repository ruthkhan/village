import React, { useState } from 'react'

const ContactForm = (props) => {

    const { onSubmitProp, errors, initialFirstName, initialLastName, initialRole, initialEmail, initialPhone, initialLinkedin, initialPreferred, btnTxt } = props
    const [firstName, setFirstName] = useState(initialFirstName)
    const [lastName, setLastName] = useState(initialLastName)
    const [role, setRole] = useState(initialRole)
    const [email, setEmail] = useState(initialEmail)
    const [phone, setPhone] = useState(initialPhone)
    const [linkedin, setLinkedin] = useState(initialLinkedin)
    const [preferred, setPreferred] = useState(initialPreferred)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({ firstName, lastName, role, email, phone, linkedin, preferred })
    }

    return(
        <form onSubmit={ onSubmitHandler }>
            <ul>
            { errors ? 
                errors.map(err => 
                <li key={err} className="text-danger mx-3">{ err }</li>)
                : null
            }
            </ul>
            <div className="row">
                <div className="col-sm-6 px-3">
                    <h3 className="mb-3">Profile</h3>
                    <div className="row mb-3">
                        <label htmlFor='firstName' className="form-label col-sm-4">First Name</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="firstName" id="firstName" value={ firstName } onChange={(e)=>setFirstName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='lastName' className="form-label col-sm-4">Last Name</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="lastName" id="lastName" value={ lastName } onChange={(e)=>setLastName(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="role" className="form-label col-sm-4">Role</label>
                        <div className="col-sm-8">
                            <select className="form-select" name="role" id="role" value={ role } onChange={(e)=>setRole(e.target.value)}>
                                <option value="Advisor">Advisor</option>
                                <option value="External recruiter">External recruiter</option>
                                <option value="Works at company">Works at company</option>
                                <option value="Knows somebody who knows somebody">Knows somebody who knows somebody</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 px-3">
                    <h3 className="mb-3">Contact Details</h3>
                    <div className="row mb-3">
                        <label htmlFor='email' className="form-label col-sm-4">Email</label>
                        <div className="col-sm-8">
                            <input type="email" className="form-control" name="email" id="email" value={ email } onChange={(e)=>setEmail(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="phone" className="form-label col-sm-4">Contact No</label>
                        <div className="col-sm-8">
                            <input type="tel" className="form-control" name="phone" id="phone" value={ phone } onChange={(e)=>setPhone(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor='linkedin' className="form-label col-sm-4">Linkedin</label>
                        <div className="col-sm-8">
                            <div className="input-group">
                                <span className="input-group-text">https://www.linkedin.com/in/</span>
                                <input type="text" className="form-control" id="linkedin" value={ linkedin } onChange={(e)=>setLinkedin(e.target.value)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="preferred" className="form-label col-sm-4">Preferred Contact</label>
                        <div className="col-sm-8">
                            <select className="form-select" name="preferred" id="preferred" value={ preferred } onChange={(e)=>setPreferred(e.target.value)}>
                                <option value="Email">Email</option>
                                <option value="Text Message">Text Message</option>
                                <option value="iMessage">iMessage</option>
                                <option value="Whatsapp">WhatsApp</option>
                                <option value="Signal">Signal</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-light px-4" type="submit">{ btnTxt }</button>
                </div>
            </div>
        </form>
    )
}

export default ContactForm