///nestinggg  

import React from 'react'
import styled from 'styled-components'

export default function Style22() {

    const Buttton = styled.button`
    color:orange;
    
     span{
        color:red;

        b{
            color:yellow
        }
    }

    
    `
    const Pera = styled.p`
    color:red;
    `

    return (
        <>
            <Buttton className="btnn">one style22  <span>this is span<b>bold tag</b></span></Buttton>
            <Pera>Lorem ipsum dolor sit amet tur voluptates quisquam, laborum nisi?</Pera>


        </>
    )
}
