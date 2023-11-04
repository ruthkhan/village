import React, { useState } from 'react'

const ContactForm = (props) => {

    const { onSubmitProp, errors, initialCommsDate, initialChannel, initialCompany, initialStatus, initialSummary, btnTxt } = props
    const [commsDate, setCommsDate] = useState(initialCommsDate)
    const [channel, setChannel] = useState(initialChannel)
    const [company, setCompany] = useState(initialCompany)
    const [status, setStatus] = useState(initialStatus)
    const [summary, setSummary] = useState(initialSummary)

    const onSubmitHandler = (e) => {
        e.preventDefault()
        onSubmitProp({ commsDate, channel, company, status, summary })
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
                    <h3 className="mb-3">Subject</h3>
                    <div className="row mb-3">
                        <label htmlFor='commsDate' className="form-label col-sm-4">Date</label>
                        <div className="col-sm-8">
                            <input type="date" className="form-control" name="commsDate" id="commsDate" value={ commsDate } onChange={(e)=>setCommsDate(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="channel" className="form-label col-sm-4">Channel</label>
                        <div className="col-sm-8">
                            <select className="form-select" name="channel" id="channel" value={ channel } onChange={(e)=>setChannel(e.target.value)}>
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
                    <div className="row mb-3">
                        <label htmlFor='company' className="form-label col-sm-4">Company</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" name="company" id="company" value={ company } onChange={(e)=>setCompany(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="status" className="form-label col-sm-4">Status</label>
                        <div className="col-sm-8">
                            <select className="form-select" name="status" id="status" value={ status } onChange={(e)=>setStatus(e.target.value)}>
                                <option value="I need to followup">I need to followup</option>
                                <option value="Waiting for their reply">Waiting for their reply</option>
                                <option value="No further action">No further action</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 px-3">
                    <h3 className="mb-3">Content</h3>
                    <div className="row mb-3">
                        <label htmlFor='summary' className="form-label col-sm-4">Summary</label>
                        <div className="col-sm-8">
                            <textarea id="summary" className="form-control" name="summary" rows="7" value={ summary } onChange={(e)=>setSummary(e.target.value)} />
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