import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Employees from './Employe'


export default function Edit() {
  const [namee, setnamee] = useState("")
  const [age, setage] = useState("")
  const [id, setid] = useState()
  const navigate = useNavigate()

  const index = Employees.map((item) => item.id).indexOf(id)


  const handlesubmit = (e) => {
    e.preventDefault()
    let a = Employees[index]
    a.Name = namee
    a.Age = age
    navigate('/')
  }

  useEffect(() => {
    setnamee(localStorage.getItem('name'))
    setage(localStorage.getItem('age'))
    setid(localStorage.getItem('id'))
  },[])


  return (
    <div>
      <div className="container">
        <div className="one" style={{ border: "2px solid grey", width: "250px", marginTop: "125px" }}>
          <input type="text" placeholder='enter your name' value={namee} onChange={(e) => { setnamee(e.target.value) }} /><br />
        </div>      
        <div className="one" style={{ border: "2px solid grey", width: "250px" }} >
          <input type="text" placeholder='enter your age' value={age} onChange={(e) => { setage(e.target.value) }} />
        </div>
        <button className='btn btn-success btn-sm mt-3' onClick={(e) => { handlesubmit(e) }}>Edit User</button>
      </div>

    </div>
  )
}
