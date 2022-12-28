////window size measure==>window
// -////console--na element-->event listenr -->ma jota have aa  ma scren jem nani moti karvi tem siz ebadlata te ama dekhat 6 ane te memory ma space roke 6 jethi server par p vadhre space joyi and project carsh thay shaje memory leake thay sahke pratntu have hu jayre resize karu taye autometic biji badhi delete thay javi joyimemory mathi mate ***useeffect ma clean up function hoy //////


import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Useeffect22() {
    const [width, setwidth] = useState(window.screen.width)

    useEffect(() => {
        console.log("add event");
        window.addEventListener("resize",actulwidth)
         
        return ()=>{
            console.log("remove event");
            window.removeEventListener("resize",actulwidth)
        }
    })

    const actulwidth=()=>{
        console.log('resize is running')
        setwidth(window.innerWidth)
    }
    return (
        <div style={{margin:"auto",width:"50%",border:"2px solid grey",textAlign:"center"}}>
            <p>Actual size of window is : </p>
            <h1>{width}</h1>
        </div>
    )
}
