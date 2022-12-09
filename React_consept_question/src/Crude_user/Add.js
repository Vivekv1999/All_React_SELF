import { Button } from 'bootstrap'
import React from 'react'
import { useState } from 'react'
import { Form, useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import Employees from './Employe'

export default function Add() {
    const [namee, setnamee] = useState()
    const [age, setage] = useState()
    const navigate = useNavigate()

    const handleadd = (e) => {
        e.preventDefault()

        const ids = uuid().slice(0,5)
        // const uniqueid = ids.slice(0,5)
console.log(ids);


        Employees.push({ id: ids, Name: namee, Age: age })
        navigate('/')


    }

    return (
        <>
            <div className="container">
                <div className="one" style={{ border: "2px solid grey", width: "250px", marginTop: "125px" }}>
                    <input type="text" name="namee" placeholder='enter your name' onChange={(e) => { setnamee(e.target.value) }} /><br />
                </div>
                <div className="one" style={{ border: "2px solid grey", width: "250px" }} >
                    <input type="text" name="age" placeholder='enter your age' onChange={(e) => { setage(e.target.value) }} />
                </div>
                <button className='btn btn-success btn-sm mt-3' onClick= {(e) => { handleadd(e) }}>Add User</button>
            </div>


        </>
    )
}
