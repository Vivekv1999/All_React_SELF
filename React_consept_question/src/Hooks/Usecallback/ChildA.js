import React,{memo} from 'react'
import { useState } from 'react';

 function ChildA(props) {
  const [child,setchild]=useState(35)
    console.log('child componrnt is runing');
    
  return (
    <div>
        <h1>child cpomponent </h1>
      <button onClick={()=>setchild(child+1)}>child runing</button>
      <h3>from child: {child}</h3>
    </div>
  )
}

export default memo(ChildA)

