import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ButtonToolbar } from 'react-bootstrap'

const student = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
export default function Omrsheet() {
    // const [newomr, setnewomr] = useState(
    //     new Array(student.length * 2).fill({ name: null, val: null })
    // )
    const [answer, setanswer] = useState([])


    // console.log(answer, "onchnage")
    const handlechange = (e) => {
        const name = e.target.name
        const val = e.target.value
        setanswer({ ...answer, [name]: val })
    }


    const [allanswer, setallanswer] = useState([])
    const handlesubmit = () => {
        const bb = []
        bb.push(answer)
        setallanswer(bb)
    }
    console.log(allanswer, "uhlk");

    return (
        <>
            <div className="container d-flex">
                <div className="container">

                    <h3>card1</h3>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body d-flex">
                            <div className="container">
                                <div>
                                    <label style={{ marginRight: "13px", border: "2px solid grey", width: "35px" }}>No</label>
                                    <label style={{ marginLeft: "18px" }}>A</label>
                                    <label style={{ marginLeft: "36px" }}>B</label>
                                    <label style={{ marginLeft: "34px" }}>C</label>
                                    <label style={{ marginLeft: "34px" }}>D</label>
                                </div>

                                {student && student.map((itm, index) => {
                                    return <>
                                        <label style={{ marginRight: "13px", width: "35px", border: "2px solid grey" }}>{index + 1}</label>
                                        <input type="radio" name={index} value={index + 1 + "A ,"} className='mx-3' onChange={(e) => handlechange(e)} />
                                        <input type="radio" name={index} value={index + 1 + "B ,"} className='mx-3' onChange={(e) => handlechange(e)} />
                                        <input type="radio" name={index} value={index + 1 + "C ,"} className='mx-3' onChange={(e) => handlechange(e)} />
                                        <input type="radio" name={index} value={index + 1 + "D ,"} className='mx-3' onChange={(e) => handlechange(e)} />

                                        <br />
                                    </>
                                })}
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary'>Omr1</button>
                </div>

                <div className="container">
                    <h3>Section-2</h3>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body d-flex">
                            <div className="container">
                                <div>
                                    <label style={{ marginRight: "13px", border: "2px solid grey", width: "35px" }}>No</label>
                                    <label style={{ marginLeft: "18px" }}>A</label>
                                    <label style={{ marginLeft: "36px" }}>B</label>
                                    <label style={{ marginLeft: "34px" }}>C</label>
                                    <label style={{ marginLeft: "34px" }}>D</label>
                                </div>
                                {student && student.map((itm, index) => {
                                    console.log(itm, "ppppppp");


                                    return <>
                                        <label style={{ marginRight: "13px", width: "35px", border: "2px solid grey" }}>{index + 26}</label>
                                        <span onClick={(e) => handlechange(e)} >
                                            <input type="radio" name={"name" + index + 26} value={index + 26 + "A ,"} className='mx-3' />
                                            <input type="radio" name={"name" + index + 26} value={index + 26 + "B ,"} className='mx-3' />
                                            <input type="radio" name={"name" + index + 26} value={index + 26 + "C ,"} className='mx-3' />
                                            <input type="radio" name={"name" + index + 26} value={index + 26 + "D ,"} className='mx-3' />
                                        </span>

                                        <br />
                                    </>
                                })}
                            </div>
                        </div>
                    </div>
                    <button className='btn btn-primary'>Omr1</button>
                </div>
            </div>
            <button onClick={handlesubmit}>submit</button>
            <div className="container my-4">
                <p className='col-7'>
                    Your Answer :
                    {allanswer && allanswer.map((ii, index) => {
                        // console.log(ii, "allllanaswer below");
                        return <>
                            <div className='mx-2' style={{ marginRight: "20px" }}>
                                <span>{Object.values(ii)}</span></div>
                        </>
                    })}
                </p>
            </div>
        </>
    )
}
