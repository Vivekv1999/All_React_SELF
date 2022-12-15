import React,{memo} from 'react'

 function ChildA(props) {
    console.log('child componrnt is runing');
    
  return (
    <div>
        <h1>child cpomponent </h1>
      
    </div>
  )
}

export default memo(ChildA)
