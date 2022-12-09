// 1 conent which can take other component as a prpos and return a component ====it's called Higher Order Component


import React from 'react'
import { useState } from 'react'

export default function Higer_order_component() {
  return (
    <>
      <Hocred cmp={Counter} />
      <Hocblue cmp={Counter} />
    </>
  )
}

/////////////aa thayo higher order component
const Hocred = (props) => {
  return <h2 style={{ background: "red" }}>red color<props.cmp /></h2>
}
const Hocblue = (props) => {
  return <h2 style={{ background: "blue"  }}>blue color<props.cmp /></h2>
}

function Counter() {
  const [count, setcount] = useState(0)
  return (<>
    <h3>{count}</h3>
    <button onClick={()=>setcount(count+1)}>update Component</button>
  </>
  )
}

