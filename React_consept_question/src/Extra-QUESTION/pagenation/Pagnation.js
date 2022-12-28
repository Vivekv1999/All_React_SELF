import React, { useState } from 'react'
import { NavItem } from 'react-bootstrap'
import Selectpage from './Selectpage'


const arr = [{ id: 1, name: "nil", age: 25 }, { id: 2, name: "raj", age: 23 }, { id: 3, name: "anil", age: 20 }, { id: 4, name: "test", age: 27 }, { id: 5, name: "test2", age: 28 }, { id: 6, name: "test3", age: 30 }, { id: 7, name: "test4", age: 32 }, { id: 8, name: "test5", age: 37 }, { id: 9, name: "test6", age: 35 }, { id: 10, name: "test3", age: 30 }, { id: 11, name: "test4", age: 32 }, { id: 12, name: "test5", age: 37 }, { id: 13, name: "test6", age: 35 }]


export default function Pagnation() {
    // const [page,setpages]=useState()   //(),[]             //##$$$$##/// if use api then dat store here
    const [currentpage, setcurrentpage] = useState(1)      ///at her usestate(1)
    const totalpost = arr.length                                 ///##$$$$##/// api mati avto hoy to chnage
    const postperpage = 5

    const lastpostindex = currentpage * postperpage
    const firpostindex = lastpostindex - postperpage

    const currentpost = arr.slice(firpostindex, lastpostindex)


    
    return (
        <div className='col-3'>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {currentpost && currentpost.map((item, index) => {
                        return <tr>
                            <th>{item.id} </th>
                            <th>{item.name} </th>
                            <th>{item.age} </th>
                        </tr>
                    })
                    }
                </tbody>
            </table>
            <Selectpage postperpage={postperpage} totalpost={totalpost} setcurrentpage={setcurrentpage} />


            

        </div>
    )
}


export { arr }