import React from 'react'
import { useState } from 'react';
import { useLayoutEffect } from 'react';
import { useEffect } from 'react'

export default function Effect_vs_layout() {
    const [num, setnum] = useState(40)


    useEffect(() => {
        console.log('renfdring useeffect');
        if (num === 0) {                                //JARE useeeffect hti chlase thaye screen slow karta kabar padse
                                                        //-->useeffct thi pela aacode mujb setnum -- 0 thase pa6i useeffct ma state chnage thay atle te rend thase ans pa6i tema setnum ===>Math.round mujab thase and te scrren par dekhase
                                                ///--->parntu aa process thse te speed ma hse athi direcet scrren par Mth.Rndom vali j --num dekhase ---0 oela ny dekahy
                                                ///--real ma thay 6 avu
                                                ///---original num --- 0 --- Math.Random valu
                setnum((num + 2) * Math.random());
        }
    }, [num])
    
                                                    //--> parntu jayre ueLayout effct ma j aa code chalaviu tayre code direct tate am change the
                                                    //-->original num --- math.random 
                                                    //--->ahiy  print nahithava de creen par uelayout and te pahela j te teni andar lakhelo code excute kari dese
                                                     
    useLayoutEffect(() => {
        console.log('renfdring Uselayout 33')
        if (num === 0) {
            setTimeout(() => {
                setnum((num + 2) * Math.random());
            }, 3000);
        }
    }, [num])
    
    // useEffect(() => {                      //aa lkhali jova purturakhu--kevalue pela 0 thay and pa6i update thay 6
    //     console.log('renfdring useeffect');
    //     if (num === 0) {
    //         setTimeout(() => {
    //             setnum((num + 2) * Math.random());
    //         }, 3000);
    //     }
    // }, [num])

    return (
        <div>
            <h3>num below</h3>
            <button onClick={() => { setnum(0) }}>Click</button>
            {num}
        </div>
    )
}


// useeffct                                           ///uselayout-effect
// it work Asyccronsly--je saru                         //--it works in scyncronuly--that not good
//-it render after uselayout                            //--it render first