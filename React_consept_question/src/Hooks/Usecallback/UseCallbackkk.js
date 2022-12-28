import React, { useMemo, useState } from 'react'
import { useCallback } from 'react'
import ChildA from './ChildA'

export default function UseCallbackkk() {
    const [count, setcount] = useState(0)
    const learning = useCallback(() => {

    }, [])


return (
    <>
        <div className="container">
            <ChildA learning={learning} />    {/*/refrential equality ne lidhe re-create thase lering functiona and te ne lidhe childA cmponent rerefdr thase */}
            <h1>count: {count} </h1>
            <button onClick={() => setcount(count + 1)} >Click</button>
        </div>
    </>
)
}
