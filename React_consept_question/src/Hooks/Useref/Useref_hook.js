import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Useref_hook() {
    const [name, setname] = useState()
    const [chnage, setchage] = useState(0)
    const changerender = useRef(0)

    useEffect(() => {
        // setchage(prev => prev + 1);             //have jo ahiy aa rite state update karavu to te infineti vay jay
        changerender.current = changerender.current + 1   ///have  aa render ny thay--sate(name vali) ma changethse toy---j chnage thase
    })

    const handleclick = () => {
        console.log('click');
    }
    return (
        <div>
            <input type="text" onChange={e => setname(e.target.value)} />
            {/* ahiya chnge thay tyaej chngerander ---ref valu --useeffect render thse ----olani jem infinite var render nahithay */}
            <h2>my name is {name}</h2>
            <p>randirng no is {changerender.current}</p>

        </div>
    )
}
