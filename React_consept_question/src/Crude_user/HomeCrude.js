import React from 'react'
import Home from './Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Employees from './Employe'
import Add from './Add'
import Edit from './Edit'

export default function HomeCrude() {
    

    return (
        <div style={{margin:"auto"}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/add" element={<Add/>} />
                    <Route path="/edit" element={<Edit/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
