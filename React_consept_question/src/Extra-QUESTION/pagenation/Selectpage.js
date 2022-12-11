import React from 'react'
import { useState } from 'react'
import { arr } from './Pagnation'


export default function Selectpage({ totalpost, postperpage, setcurrentpage }) {

    const page = []

    for (let i = 1; i <= Math.ceil(totalpost / postperpage); i++) {
        page.push(i)
    }

    return (
        <div className='pagination'>
            {page.map((item, index) => {                
                return <button key={index} onClick={()=> {setcurrentpage(item)
                    console.log()}
                }>
                    {item}
                </button>
            })}
        </div>
    )
}
