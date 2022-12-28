///NET SLOW KARTA KHARR PADE KE 1 NO PA6I 2 NO AVAT PAUP 1,2 AVE TAYR BAD 3 AVTA POELA 1,2,3 AAM RI TE UPDATETHAY JE THVU NO JOYI AGAN ANO NO YHVA JOYI DIECT JAY POGA TEJ NO AVVAVO JOYI???   PROBLEM  ???



import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

export default function Incorectstate() {
    const [num,setnum]=useState(0)

    useEffect(()=>{
        console.log('ahiy ajota khavbar pade ke var  varm run thay 6');
        
        setInterval(() => {
            setnum(pre=>pre+1)
        }, 1000);
    },[])
    // },[num])      //1 aa raku tu
  return (
    <div>
    <h1>{num}</h1>
    </div>
  )
}
