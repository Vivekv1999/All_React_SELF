//return thi memeory achi rokay o aa no karvi to te previous data ne memory ma store rakhe jenatho memroy leak thvana chnage rey je saru nahi mate return vaparavu

import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Returnuseee() {
    const [num, setnum] = useState(0)

    useEffect(() => {
        console.log('ahiy ajota khavbar pade ke var  varm run thay 6');

        const interval = setInterval(() => {
            console.log('update state')
            setnum(pre => pre + 1)
        }, 1000);

        return () => {
            console.log('return i s clening previous data')
            clearInterval(interval)
        }
    }, [])

    ////not done by lama but doen by me -----this stric also stop ememroy leak//second method ==pre=>pre+1 sivay ni
    // useEffect(() => {
    //     console.log('ahiy ajota khavbar pade ke var  varm run thay 6');

    //     const interval = setInterval(() => {
    //         console.log('update state')
    //         setnum(num + 1)
    //     }, 1000);

    //     return () => {
    //         console.log('return i s clening previous data')
    //         clearInterval(interval)
    //     }
    // }, [num])
    return (
        <div>
            <h1>{num}</h1>
        </div>
    )
}

