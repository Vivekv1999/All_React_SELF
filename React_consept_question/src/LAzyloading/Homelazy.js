// aa compennt i jarur nathi partu direct app ma batabvana confu thasu mate je 
// je jam app ma krisu te ahiy akrisu 
// ataake aa compoent bar kai kam no nathi ahiya aa example purto kam no 6
///////  INTERNET speed o6i karva lazyloading jova mate
//////////// app navi jgaye statr kari jovi yo kay avse
///===credit--code step by step

import React, { lazy, Suspense } from 'react'
// import Lazyloadinggg from './Lazyloadinggg'  ///nichini rit thiimport karvanu
const Lazyloadinggg = lazy(() => import('./Lazyloadinggg'))

export default function Homelazy() {
    return (
        <div>
            aa=show lazyloading first shoe this after below all componet show...
            <Suspense fallback={<div>plaese wait...</div>}>
                <Lazyloadinggg />
            </Suspense>
        </div>
    )
}
