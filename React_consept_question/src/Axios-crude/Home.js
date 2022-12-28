import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    const [val, setval] = useState("")

    useEffect(() => {
        geturl()
        return ()=>{
        }
    }, [val])

    const geturl = async () => {
        const res = await axios.get("http://localhost:3008/user")
        const dd = await res.data
        setval(dd)
    }
    
    const handleedit = (id) => {

    }
    
    const handledelete = async (id) => {
        const res = await axios.delete(`http://localhost:3008/user/${id}`)
    }
    
    return (
        <>
            <h1>oone</h1>
            <div className='col-6 m-auto' style={{ margin: "auto" }}>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Eamil</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {val && val.map((item) => {
                            return <tr>
                                <th>{item.id}</th>
                                <th>{item.Username}</th>
                                <th>{item.Email}</th>
                                <th>
                                    {/* <Link to="/edit"> */}
                                        <btn className="btn btn-sm btn-primary" onClick={() => { handleedit(item.id, item.Username, item.Email) }}>Edit</btn>
                                    {/* </Link> */}
                                    &nbsp;
                                    <btn className="btn btn-sm btn-danger" onClick={() => { handledelete(item.id) }}>Delet</btn>
                                </th>

                            </tr>
                        })}
                    </tbody>
                </table>
                {/* <Link to="/add"> */}
                    <btn className='w-100'>Create</btn>
                {/* </Link> */}
            </div>
        </>
    )
}
