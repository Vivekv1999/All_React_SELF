import React, { memo } from 'react'

function Othercompet() {

    console.log('other componrnt is rendring');
    
  return (
    <div>
      <h3>other compnet</h3>
    </div>
  )
}

export default memo(Othercompet)
