///Other compet nana function na ne bija compoent am 6 6ta ate aa componrt reder thata render th 6 je thavo joyi nahi tene memo ni maddti roki shkay 6
// parntu memo bow vadhr epadu no vaparvu jay jarur hoy tay j vaparvu 

///aa bgcolorrr aa function ne provide rjevu banai tema childer n nkhata pan have aa other componet render nahi thay

import React from 'react'
import { useState } from 'react'
import Othercompet from './Othercompet'

export default function Usememoo() {
    // const [backgroundolor, setbackgroundolor] = useState("")   ////bgcolorrr aviya pahekla aa hatu
    return (
        // <div className='container' style={{backgroundColor:backgroundolor}}>
        //     <input type="text" onChange={(e)=>setbackgroundolor(e.target.value)} />
        //     <Othercompet/>
        // </div>
        <Bgcolorrr>
            <Othercompet />
        </Bgcolorrr>
    )
}

function Bgcolorrr({ children }) {
    const [backgroundolor, setbackgroundolor] = useState("")
    return (
        <div className='container' style={{ backgroundColor: backgroundolor }}>
            <input type="text" onChange={(e) => setbackgroundolor(e.target.value)} />
            {children}
        </div>
    )
}
