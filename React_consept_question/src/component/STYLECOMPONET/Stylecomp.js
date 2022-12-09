///sindle single chale aa ek nej import krvu app.js ma

import React from 'react'
import styled from 'styled-components';

export default function Stylecomp() {
    // const Button = styled.button`
    // align-item:center;
    // background-color:red;
    // `
    // const Pera=styled.p`
    // color:red;
    // `

    const Wrapper = styled.section` 
.btnn{
    background-color:blue;
}
p{
    color:yellow;
}
`

    return (
        <div>

            {/* <Button>Click_1</Button>
            <Pera>Lorem ipsum dolor sit amet consectetur adipisicing eliop </Pera> */}
            <Wrapper>
                <button className='btnn'>Click_1</button>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing eliop </p>
            </Wrapper>
        </div>
    )
}
