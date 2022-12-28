import React from 'react'
import { useState } from 'react'

export default function Checkbox() {
    const emp = [
        {
            no: 1,
            employee: "raj",
            salary: 86345
        },
        {
            no: 2,
            employee: "jil",
            salary: 75843
        },
        {
            no: 3,
            employee: "roy",
            salary: 89754
        },
        {
            no: 4,
            employee: "nil",
            salary: 98655
        },
        {
            no: 5,
            employee: "nik",
            salary: 79854
        }
    ]

    const [checkedsts, setcheedsts] = useState(
        new Array(emp.length).fill(false)
    )
    const [total, settotal] = useState(0)
    
    ////--//for flter
    const [inpursearch, setinputsearch] = useState('')
    const [filtrerdata, setfilterdata] = useState()

    const handlsearch = (e) => {
        setinputsearch(e.target.value)
        const filterrr = emp.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(inpursearch.toLowerCase())
        })
        setfilterdata(filterrr)
    }


    const handlechange = (position) => {
        const updatechechstatus = checkedsts.map((item, index) =>
            index === position ? !item : item
        )
        setcheedsts(updatechechstatus)

        const totalprice = updatechechstatus.reduce((sum, currentele, index) => {
            {
                if (currentele === true)
                    return sum + emp[index].salary
            }
            return sum
        }, 0)

        settotal(totalprice)
    }


    return (
        <>
            <div className="col-6 ">
                <div className="container">
                    <input type="search" value={inpursearch} onChange={(e) => handlsearch(e)} />
                </div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Employe</th>
                            <th>Number</th>
                            <th>Tik</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inpursearch.length > 1 ?
                            filtrerdata && filtrerdata.map((item, index) => {
                                return <tr>
                                    <th>{item.no}</th>
                                    <th>{item.employee}</th>
                                    <th>{item.salary} ₹</th>
                                    <th>
                                        <input type="checkbox" name={item.name} value={item.value}
                                            checked={checkedsts[index]} onClick={() => handlechange(index)} />
                                    </th>
                                </tr>
                            })
                            :
                            emp.map((item, index) => {
                                return <tr>
                                    <th>{item.no}</th>
                                    <th>{item.employee}</th>
                                    <th>{item.salary} ₹</th>
                                    <th>
                                        <input type="checkbox" name={item.name} value={item.value}
                                            checked={checkedsts[index]} onClick={() => handlechange(index)} />
                                    </th>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
            <h3>
                total Sum: {total} ₹
            </h3>
        </>
    )
}