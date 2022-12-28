import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Employees from './Employe'


export default function Home(props) {
    const navigate = useNavigate()

    const handleedit = (id, nnname, aaage) => {
        localStorage.setItem('name', nnname)
        localStorage.setItem('age', aaage)
        localStorage.setItem('id', id)
    }

    const handledelete = (id) => {
        var index = Employees.map((e) => e.id).indexOf(id)//at hee indexof thi upder (id)= ave te niindex no number malase
        Employees.splice(index, 1)
        navigate('/')
    }

    return (
        <div className='col-6 m-auto' style={{margin:"auto"}}>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {Employees && Employees.map((item) => {

                        return <tr>
                            <th>{item.id}</th>
                            <th>{item.Name}</th>
                            <th>{item.Age}</th>
                            <th>
                                <Link to="edit">
                                    <Button onClick={() => { handleedit(item.id, item.Name, item.Age) }}>Edit</Button>
                                </Link>
                                &nbsp;
                                <Button onClick={() => { handledelete(item.id) }}>Delete</Button>
                            </th>

                        </tr>
                    })}
                </tbody>
            </table>
            <Link to="/add">
                <Button className='w-100'>Create</Button>
            </Link>

        </div>
    )
}
