import React from 'react'
import { useState } from 'react'
import { NavItem } from 'react-bootstrap'

export default function Checkbox() {
    const [checkkk, setcheckkk] = useState(false)
    const [neww, setneww] = useState([])
    const emp = [
        {
            no: 1,
            employee: "aoi",
            salary: 86
        },
        {
            no: 2,
            employee: "fio",
            salary: 84
        },
        {
            no: 1,
            employee: "kgu",
            salary: 88
        }
    ]

    const handlechange = (e) => {
        console.log(e.target.value,"ppppppp");
        
        if (e.target.checked === true) {
            setneww(e.target.value)
        }
    }



    return (
        <>
            <div className="col-6 d-flex justify-content-center">

                <table className='table'>
                    <thead>
                        <tr>
                            <th>no</th>
                            <th>employe</th>
                            <th>number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emp.map((item) => {
                            return <tr>
                                <th>{item.no}</th>
                                <th>{item.employee}</th>
                                <th>{item.salary}</th>
                                <th>
                                    {/* <input type="checkbox" value={item.salary} onClick={(e)=>{handlechange(e) }}/> */}
                                    <div onClick={(e) => { handlechange(e) }}>
                                        <input type="checkbox" value={item.salary} />
                                    </div>
                                </th>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <h3>
                total Sum: {neww}
            </h3>
        </>
    )
}