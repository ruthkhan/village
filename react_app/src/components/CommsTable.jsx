import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CommsTable = (props) => {

    const { thisUser, thisContact, thisComm, setThisComm } = props
    const [commsList, setCommsList] = useState([])
    const [loaded, setLoaded] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get("http://localhost:5000/api/comms/all/" + thisContact.id)
            .then((res)=>{
                console.log(res.data)
                setCommsList(res.data)
                setLoaded(true)
            })
            .catch((err)=>{
                console.log(err);
            })
    }, [loaded])

    const deleteComm = (commsId) => {
        if (confirm('Click ok to permanently remove this communication record')) {
            axios.delete('http://localhost:5000/api/comms/delete/' + commsId)
                .then((res)=> {
                    console.log(res.data)
                    setCommsList(commsList => {
                        commsList.filter(comms=> comms.id != commsId)
                    })
                    setLoaded(false)
                })
                .catch(err => console.log(err))
        }
    }

    const setComms = (commsId) => {
        console.log(commsId)
        setThisComm({'id': commsId})
        navigate('/contacts/' + thisContact.id + '/comms/' + commsId) 
    }

    return(
        <div>
            <div className="d-flex align-items-center">
                <h3>Communication History</h3>
                <div className="mx-5 mb-3">
                    <Link to={`/contacts/${ thisContact.id }/comms/new`}>
                        <button type="button" className="btn btn-outline-light mt-2">Add new communication</button>
                    </Link>
                </div>
            </div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Channel</th>
                        <th>Company</th>
                        <th>Summary</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                { commsList ? 
                    loaded && commsList.map((one_comm) => 
                    <tr key={ one_comm.id }>
                        <td>{ one_comm.commsDate }</td>
                        <td>{ one_comm.channel }</td>
                        <td>{ one_comm.company }</td>
                        <td>{ one_comm.summary }</td>
                        <td>{ one_comm.status }</td>
                        <td>
                            <button className="btn btn-secondary btn-sm" onClick={(e)=>{setComms(one_comm.id)}}> Edit </button> 
                            <i className="bi bi-trash3-fill delete" onClick={(e)=>{deleteComm(one_comm.id)}} />
                        </td>
                    </tr>
                    )
                    : <tr><td>No comms found</td></tr>
                }
                </tbody>
            </table>
        </div>
    )
}

export default CommsTable