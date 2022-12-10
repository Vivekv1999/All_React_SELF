import React from 'react'
import { useState } from 'react'

export default function Omrsheet() {
    const student = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]

    const [newomr, setnewomr] = useState(
        new Array(student.length * 2).fill(null)
    )
    const [upadtecheck, setupadtecheck] = useState()
    // console.log(newomr)


    const handlechange = (position, e) => {
        const upadtecheck = newomr.map((item, index) =>
            index === position ? item = e.target.value : null
        )
        setupadtecheck(upadtecheck)
        setnewomr(upadtecheck)
    }
    console.log(newomr, "detail...")

    return (
        <>
            <div className="container d-flex">
                <div className="container">

                    <h3>card1</h3>
                    <div className="card" style={{ width: '18rem' }}>
                        <div className="card-body d-flex">
                            {/* <div className="container col-2">
                                <div>0</div>
                                <div>1</div>
                                <div>2</div>
                            </div> */}
                            <div className="container">
                                <div>
                                    <label style={{ marginRight: "13px", border: "2px solid grey", width: "35px" }}>No</label>
                                    <label style={{ marginLeft: "18px" }}>A</label>
                                    <label style={{ marginLeft: "36px" }}>B</label>
                                    <label style={{ marginLeft: "34px" }}>C</label>
                                    <label style={{ marginLeft: "34px" }}>D</label>
                                </div>
                                {/* <br /> */}
                                {student && student.map((itm, index) => {
                                    // console.log(itm, index, "kkkkkkkkk");

                                    return <>
                                        <label style={{ marginRight: "13px", width: "35px", border: "2px solid grey" }}>{index + 1}</label>
                                        <input type="radio" name={index} className='mx-3' />
                                        <input type="radio" name={index} className='mx-3' />
                                        <input type="radio" name={index} className='mx-3' />
                                        <input type="radio" name={index} className='mx-3' />

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

                                    return <>
                                        <label style={{ marginRight: "13px", width: "35px", border: "2px solid grey" }}>{index + 26}</label>
                                        <span onClick={(e) => handlechange(index, e)} >
                                            <input type="radio" name={index + 26} value={index + 26 + "A"} className='mx-3' />
                                            <input type="radio" name={index + 26} value={index + 26 + "B"} className='mx-3' />
                                            <input type="radio" name={index + 26} value={index + 26 + "C"} className='mx-3' />
                                            <input type="radio" name={index + 26} value={index + 26 + "D"} className='mx-3' />
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

            <div className="container my-4">
                <p className='col-7'>
                    Your Answer
                    {/* {newomr} */}
                </p>
            </div>

        </>
    )
}
