// 1 conent which can take other component as a prpos and return a component ====it's called Higher Order Component
//--lakhu 6 ana video parhi --codevolution
//--apdi pae koi ek componet 6 tema a]have client key ke maare btn clcik pa kelti cilk avi te jovi--to t mate apne ek component bacisy ane te compnent main ma add kari desu
// --have pa6o clien tvao ane te key ke mare hobvar karta ketli var hvar karu te jou---to have apne pa6o 3 jo compjent hovar no banavi tema e karav desu ane te main compnent ma add karavi desu
//--have ama vau repet thahoy tevi j 6 aa bey code ma to tene mate agal aalga compnent sha mate baanvava ek j compnet ma banavi devay

//*********  ///---hare common functionality between component without repeting code that is higher oreder component
//const Newcomponet = Higherordercomponet (Originalcomponent)
//ex.            IronMan = Withsuit (Tonystark)
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

//////===>//////aa thayo higher order component
const Hocred = (props) => {
  console.log('none');
  
  return <h2 style={{ background: "red" }}>red color<props.cmp /></h2>
}
const Hocblue = (props) => {
  return <h2 style={{ background: "blue" }}>blue color<props.cmp /></h2>
}

function Counter() {
  const [count, setcount] = useState(0)
  return (<>
    <h3>{count}</h3>
    <button onClick={() => setcount(count + 1)}>update Component</button>
  </>
  )
}

