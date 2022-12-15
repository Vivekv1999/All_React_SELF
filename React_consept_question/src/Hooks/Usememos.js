import React, { memo, useState } from 'react'
import { useEffect } from 'react'
import { useMemo } from 'react'

export default function Usememos() {
    const [count, setcount] = useState(0)
    const [item, setitem] = useState(10)

    // const memo=useMemo(function multi(){
    //     console.log('function running')
    //     return count*5
    // },[count])

    useEffect(() => {
        memo()
    }, [count])
    const memo=()=>{
        console.log('uesffct in func');
        
        return count*5
    }
    return (
        <div>
            <h2>count:{count}</h2>
            <h2>item:{item}</h2>
            <h2>{memo}</h2>

            <button onClick={() => setcount(count + 1)}>count</button>&nbsp;&nbsp;&nbsp;
            <button onClick={() => setitem(item + 1)}>item</button>
            {/* have jayre item update thase tayre aa function run nahi thay kemke te function ma te ni  */}



            {/* <button onClick={()=>setcount(count+1)}>count</button>&nbsp;&nbsp;&nbsp;
    <button onClick={()=>setitem(item+1)}>item</button> */}
        </div>
    )
}
