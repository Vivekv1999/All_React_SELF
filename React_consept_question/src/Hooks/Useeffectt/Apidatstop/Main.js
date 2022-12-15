//////// ////slow net require
//// post page par clcik kari tat bak btn bacavavu jetho api data load nahi thay
///pela back btn bavaya sivay try karcy pa6i bak btn bavavavu

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Apidatafetchuse from './Apidatafetchuse'
import Homeapi from './Homeapi'


export default function Main() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homeapi />} />
                    <Route path="/api" element={<Apidatafetchuse />} />
                </Routes>
            </BrowserRouter>

        </>
    )
}
